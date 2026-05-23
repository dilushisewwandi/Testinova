import spacy

nlp = spacy.load("en_core_web_sm")

def parse_requirement(requirement: str) -> dict:
    """
    Uses spaCy NLP pipeline to extract meaningful linguistic
    information from a natural language requirement string.
    This parsed data is used to enrich the prompt sent to the LLM.
    """
    
    doc = nlp(requirement)

    #Tokens
    tokens = [token.text for token in doc if not token.is_space]

    #Named Entities
    entities = [
        {
            "text": ent.text,
            "label": ent.label_,
            "description": spacy.explain(ent.label_) or ent.label_
        }
        for ent in doc.ents
    ]

    #Conditions
    condition_keywords = {
        "if", "when", "unless", "until", "while",
        "whenever", "once", "after", "before", "in case"
    }
    conditions = []
    for token in doc:
        if token.text.lower() in condition_keywords:
            subtree_text = " ".join([t.text for t in token.subtree])
            if subtree_text not in conditions:
                conditions.append(subtree_text)

    #Actions 
    action_keywords = {
        "fail", "succeed", "return", "display", "pass",
        "submit", "click", "enter", "validate", "check",
        "verify", "login", "logout", "create", "delete",
        "update", "save", "load", "navigate", "redirect",
        "register", "search", "filter", "sort", "upload",
        "download", "send", "receive", "approve", "reject"
    }
    actions = []
    for token in doc:
        if token.pos_ == "VERB" and not token.is_stop:
            lemma = token.lemma_.lower()
            if lemma not in actions:
                actions.append(lemma)
        elif token.text.lower() in action_keywords:
            if token.text.lower() not in actions:
                actions.append(token.text.lower())

    #Subjects
    subjects = []
    for token in doc:
        if token.dep_ in ("nsubj", "nsubjpass"):
            if token.text.lower() not in subjects:
                subjects.append(token.text)

    #Objects
    objects = []
    for token in doc:
        if token.dep_ in ("dobj", "pobj", "attr", "iobj"):
            if token.text.lower() not in objects:
                objects.append(token.text)

    #Negations
    negations = []
    for token in doc:
        if token.dep_ == "neg":
            negations.append(token.head.text)

    #Test Type Hints
    req_lower = requirement.lower()
    test_type_hints = []

    if any(w in req_lower for w in ["unit", "function", "method", "class", "module"]):
        test_type_hints.append("unit")

    if any(w in req_lower for w in ["integration", "service", "api", "endpoint", "database", "connect", "microservice"]):
        test_type_hints.append("integration")

    if any(w in req_lower for w in ["ui", "button", "form", "page", "screen", "click", "interface", "input", "dropdown", "modal", "popup", "menu", "link"]):
        test_type_hints.append("ui")

    if any(w in req_lower for w in ["workflow", "flow", "process", "journey", "scenario", "step", "sequence", "pipeline"]):
        test_type_hints.append("workflow")

    #Complexity Estimation 
    sentences = [sent.text.strip() for sent in doc.sents]
    token_count = len(tokens)

    if len(sentences) <= 1 and token_count <= 20:
        complexity = "simple"
    elif len(sentences) <= 3 and token_count <= 50:
        complexity = "moderate"
    else:
        complexity = "complex"

    #keywords
    keywords = [
        token.text for token in doc
        if not token.is_stop
        and not token.is_punct
        and token.pos_ in ("NOUN", "VERB", "PROPN")
    ]

    return {
        "tokens": tokens,
        "entities": entities,
        "conditions": conditions,
        "actions": actions,
        "subjects": subjects,
        "objects": objects,
        "negations": negations,
        "test_type_hints": test_type_hints,
        "keywords": keywords,
        "complexity": complexity,
        "sentence_count": len(sentences),
        "token_count": token_count,
    }

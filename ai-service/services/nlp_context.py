def build_nlp_context(parsed: dict) -> str:
    """
    Converts parsed NLP data into a readable context string
    that gets injected into prompts to help the LLM
    generate better, more targeted test cases.
    """

    context_lines = []

    if parsed.get("subjects"):
        subjects_str = ", ".join(parsed["subjects"][:4])
        context_lines.append(f"- Subjects: {subjects_str}")

    if parsed.get("actions"):
        actions_str = ", ".join(parsed["actions"][:6])
        context_lines.append(f"- Actions: {actions_str}")

    if parsed.get("objects"):
        objects_str = ", ".join(parsed["objects"][:4])
        context_lines.append(f"- Objects: {objects_str}")

    if parsed.get("conditions"):
        for cond in parsed["conditions"][:2]:
            context_lines.append(f"- Condition: {cond}")

    if parsed.get("negations"):
        neg_str = ", ".join(parsed["negations"][:3])
        context_lines.append(f"- Negative scenarios: {neg_str}")

    if parsed.get("entities"):
        ent_str = ", ".join([e["text"] for e in parsed["entities"][:4]])
        context_lines.append(f"- Entities: {ent_str}")

    if parsed.get("test_type_hints"):
        hints_str = ", ".join(parsed["test_type_hints"])
        context_lines.append(f"- Suggested test types: {hints_str}")

    if parsed.get("complexity"):
        context_lines.append(f"- Complexity: {parsed['complexity']}")

    if not context_lines:
        return ""

    return "NLP Analysis:\n" + "\n".join(context_lines)

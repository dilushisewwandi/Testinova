# def student_prompt(req):
#     prompt = f"""
# You are a highly experienced software teacher specializing in teaching software testing to beginners.

# Analyze the following requirement and provide a comprehensive learning experience for students.

# Requirement:
# {req.requirementText}

# Structure your response as follows:

# 1. **Requirement Understanding**:
#    - Break down what the requirement means in simple terms
#    - Identify the key components (inputs, outputs, actions, constraints)
#    - Explain why this functionality matters in software development

# 2. **Testing Concepts Introduction**:
#    - Explain what type of testing would be appropriate (unit, integration, UI, etc.)
#    - Define key testing terms used in this context
#    - Discuss testing principles like equivalence partitioning, boundary value analysis

# 3. **Step-by-Step Testing Approach**:
#    - Guide through a systematic testing strategy
#    - Explain how to identify test cases (positive, negative, edge cases)
#    - Show how to prioritize test scenarios

# 4. **Practical Examples**:
#    - Provide runnable code examples with detailed comments
#    - Explain each line of code and why it's written that way
#    - Show common mistakes beginners make and how to avoid them

# 5. **Best Practices & Learning Tips**:
#    - Share testing best practices for maintainability and effectiveness
#    - Explain debugging techniques for when tests fail
#    - Suggest ways to improve testing skills progressively

# 6. **Practice Exercise**:
#    - Provide a related but simpler requirement for the student to practice
#    - Include hints on how to approach it

# Rules:
# - Use encouraging, patient teacher language
# - Explain technical concepts with analogies when helpful
# - Include real-world examples and scenarios
# - Make explanations progressive (start simple, build complexity)
# - Focus on building confidence and understanding, not just providing answers
# - Output should be educational and engaging, not just informational
# """
#     system_msg = "You are a patient, encouraging software teacher who builds students' confidence through clear explanations and practical guidance."
    
#     return prompt, system_msg, 1500








from services.nlp_context import build_nlp_context


def student_prompt(req, parsed=None):
    """
    Builds an educational prompt for student role.
    Uses NLP parsed data to provide targeted learning guidance.
    """

    # Build NLP context from parsed requirement
    nlp_context = build_nlp_context(parsed) if parsed else ""

    # Determine suggested test type from NLP hints
    test_type_suggestion = "unit testing"
    if parsed and parsed.get("test_type_hints"):
        hints = parsed["test_type_hints"]
        if "ui" in hints:
            test_type_suggestion = "UI testing"
        elif "workflow" in hints:
            test_type_suggestion = "workflow testing"
        elif "integration" in hints:
            test_type_suggestion = "integration testing"

    # Determine complexity level for tailored explanation
    complexity = "simple"
    if parsed and parsed.get("complexity"):
        complexity = parsed["complexity"]

    complexity_guidance = {
        "simple": "This is a straightforward requirement. Focus on the basics.",
        "moderate": "This requirement has multiple parts. Break it down step by step.",
        "complex": (
            "This is a complex requirement. Take it one piece at a time "
            "and don't worry if it takes a few reads to understand."
        )
    }.get(complexity, "")

    prompt = f"""
You are a highly experienced software teacher specializing
in teaching software testing to beginners.

Analyze the following requirement and provide a comprehensive
learning experience for the student.

Requirement:
{req.requirementText}
{nlp_context}

Complexity Note: {complexity_guidance}
Suggested Testing Approach: {test_type_suggestion}

Structure your response EXACTLY as follows:

1. **Requirement Understanding**:
   - Explain what this requirement means in simple, plain English
   - Identify the key components: inputs, outputs, actions, constraints
   - Explain why testing this functionality matters

2. **Testing Concepts Introduction**:
   - Explain what type of testing is most appropriate here
   - Define any key testing terms used in this context
   - Introduce relevant testing principles (e.g. boundary value analysis)

3. **Step-by-Step Testing Approach**:
   - Walk through a systematic testing strategy step by step
   - Explain how to identify positive, negative and edge test cases
   - Show how to prioritize the most important test scenarios

4. **Practical Examples**:
   - Provide simple runnable code examples
   - Add a comment on every line explaining what it does and why
   - Show at least one passing test and one failing scenario

5. **Best Practices and Learning Tips**:
   - Share 3 to 5 testing best practices relevant to this requirement
   - Explain what to do when a test fails
   - Suggest next steps for improving testing skills

6. **Practice Exercise**:
   - Give a simpler but related requirement for the student to practice
   - Provide 2 to 3 hints to help them get started
   - Encourage them with positive language

Rules:
- Use encouraging, patient and friendly language throughout
- Always explain technical terms when first used
- Use analogies and real-world comparisons to explain concepts
- Build from simple to complex gradually
- Never make the student feel bad for not knowing something
- Output should be educational, structured and easy to follow
"""

    system_msg = (
        "You are a patient, encouraging software testing teacher "
        "who builds students confidence through clear explanations, "
        "practical examples and positive reinforcement."
    )

    return prompt, system_msg, 1500
from services.studentPrompt import student_prompt
from services.qaPrompt import qa_prompt
from services.developerPrompt import developer_prompt
from models.nlp_parser import parse_requirement


def build_prompt(req, parsed=None):
    """
    Builds a role-specific prompt for the LLM.
    Uses NLP parsed data to enrich the prompt context.
    """

    if parsed is None:
        parsed = parse_requirement(req.requirement)

    if req.role == "student":
        return student_prompt(req, parsed)

    elif req.role == "qa":
        return qa_prompt(req, parsed)

    elif req.role == "developer":
        return developer_prompt(req, parsed)

    else:
        raise ValueError("Invalid role")

# from fastapi import APIRouter, HTTPException
# from services.llama_client import call_llama
# from models.request import TestRequest
# from models.nlp_parser import parse_requirement
# from services.promptBuilder import build_prompt

# router = APIRouter()

# @router.post("/generate-test")
# def generate_test(req: TestRequest):
#     try:
#         prompt, system_msg, max_tokens = build_prompt(req)
#         llm_output = call_llama(system_msg, prompt, max_tokens)

#         parsedData = parse_requirement(req.requirementText)
    
#         return {
#             "role": req.role,
#             "requirementText": req.requirementText,
#             "parsed": parsedData,
#             "testCode": llm_output
#         }
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))














from fastapi import APIRouter, HTTPException
from services.llama_client import call_llama
from models.request import TestRequest
from models.nlp_parser import parse_requirement
from services.promptBuilder import build_prompt

router = APIRouter()


@router.post("/generate-test")
def generate_test(req: TestRequest):
    try:
        # ── Stage 1: NLP Parsing ──────────────────────────────
        # Parse the requirement FIRST using spaCy
        # This gives us structured linguistic data before
        # we build the prompt
        parsedData = parse_requirement(req.requirementText)

        # ── Stage 2: Prompt Building ──────────────────────────
        # Build the role-specific prompt using parsed NLP data
        # The parsed data enriches the prompt with context
        # about conditions, actions, subjects and complexity
        prompt, system_msg, max_tokens = build_prompt(
            req, parsed=parsedData
        )

        # ── Stage 3: LLM Generation ───────────────────────────
        # Send the enriched prompt to the local Llama model
        llm_output = call_llama(system_msg, prompt, max_tokens)

        # ── Stage 4: Return Response ──────────────────────────
        return {
            "role": req.role,
            "requirementText": req.requirementText,
            "parsed": {
                "tokens": parsedData["tokens"][:10],
                "entities": parsedData["entities"],
                "conditions": parsedData["conditions"],
                "actions": parsedData["actions"],
                "subjects": parsedData["subjects"],
                "objects": parsedData["objects"],
                "negations": parsedData["negations"],
                "test_type_hints": parsedData["test_type_hints"],
                "keywords": parsedData["keywords"][:10],
                "complexity": parsedData["complexity"],
                "sentence_count": parsedData["sentence_count"],
                "token_count": parsedData["token_count"],
            },
            "testCode": llm_output
        }

    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
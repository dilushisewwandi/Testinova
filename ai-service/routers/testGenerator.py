from fastapi import APIRouter, HTTPException
from services.openai_client import call_openai
from models.request import TestRequest
from models.nlp_parser import parse_requirement
from services.promptBuilder import build_prompt

router = APIRouter()

@router.post("/generate-test")
def generate_test(req: TestRequest):
    try:
        #NLP Parsing
        parsedData = parse_requirement(req.requirement)

        #Prompt Building
        prompt, system_msg, max_tokens = build_prompt(
            req, parsed=parsedData
        )

        # LLM Generation
        llm_output = call_openai(system_msg, prompt, max_tokens)

        # Return Response
        return {
            "role": req.role,
            "requirementText": req.requirement,
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

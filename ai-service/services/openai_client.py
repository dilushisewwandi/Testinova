import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def call_openai(system_msg: str, prompt: str, max_tokens: int):
    """
    Call OpenAI's GPT-4o-mini model for test generation.
    
    Args:
        system_msg: System message defining the role/behavior
        prompt: User prompt with the requirement
        max_tokens: Maximum tokens for the response
    
    Returns:
        str: The generated response content
    
    Raises:
        RuntimeError: If API call fails
    """
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_msg},
                {"role": "user", "content": prompt}
            ],
            max_tokens=max_tokens,
            temperature=0.2
        )

        return response.choices[0].message.content
    
    except Exception as e:
        raise RuntimeError(f"OpenAI API call failed: {str(e)}")

    except Exception as e:
        raise RuntimeError(f"OpenAI request failed: {str(e)}")

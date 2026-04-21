import requests

LLAMA_URL = "http://localhost:8080/v1/chat/completions"

def call_llama(system_msg: str, prompt:str, max_tokens: int):
    try:
        response = requests.post(
            LLAMA_URL,
            json={
                "messages":[
                    {"role": "system", "content": system_msg},
                    {"role": "user", "content": prompt}
                ],
                "max_tokens": max_tokens,
                "temperature": 0.3
            },
        )
        response.raise_for_status()
        result = response.json()

        return result["choices"][0]["message"]["content"]

    except requests.RequestException as e:
        raise RuntimeError(f"LLM connection failed: {str(e)}")

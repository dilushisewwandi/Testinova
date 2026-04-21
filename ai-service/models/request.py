from pydantic import BaseModel # type: ignore
# from typing import Optional

class TestRequest(BaseModel):
    role:str
    framework:str|None=None
    requirementText:str
    testType:str|None=None
    testSubType:str |None=None

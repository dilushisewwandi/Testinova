from pydantic import BaseModel

class TestRequest(BaseModel):
    role: str
    framework: str | None = None
    requirement: str
    testType: str | None = None
    testSubType: str | None = None

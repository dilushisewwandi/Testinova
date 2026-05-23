from services.nlp_context import build_nlp_context
def developer_prompt(req, parsed=None):

    # Safe NLP context
    try:
        nlp_context = build_nlp_context(parsed) if parsed else ""
    except Exception:
        nlp_context = ""

    system_msg = (
        "You are a senior software test engineer. "
        "Generate ONLY runnable test code. No explanations, no comments, no markdown."
    )

    test_type = (req.testType or "unit").lower()

    framework = (req.framework or "jest").lower()

    # FRAMEWORK EXAMPLES
    jest_example = """
const request = require('supertest');
const app = require('../app');

describe('example', () => {
  test('sample', async () => {
    const res = await request(app).get('/ping');
    expect(res.status).toBe(200);
  });
});
"""

    mocha_example = """
const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('example', () => {
  it('sample', async () => {
    const res = await request(app).get('/ping');
    expect(res.status).to.equal(200);
  });
});
"""

    pytest_example = """
import pytest
from app import app

def test_example(client):
    res = client.get('/ping')
    assert res.status_code == 200
"""

    junit_example = """
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ExampleTest {
    @Test
    void sample() {
        assertEquals(2, 1 + 1);
    }
}
"""

    if framework == "jest":
        example = jest_example
    elif framework == "mocha":
        example = mocha_example
    elif framework == "pytest":
        example = pytest_example
    elif framework == "junit":
        example = junit_example
    else:
        example = ""

    # CORE RULES 
    core_rules = f"""
You are generating {framework} {test_type} tests.

STRICT RULES:
- Output ONLY runnable {framework} test code
- No explanations, no comments, no markdown
- Generate 6–10 test cases
- Each test must validate ONE behavior
- Tests must be independent
- Use realistic input values
- Ensure high assertion coverage

MANDATORY COVERAGE:
- Valid inputs
- Invalid inputs
- Empty/null/undefined inputs
- Incorrect data types
- Boundary values (min/max)
- Error handling and thrown exceptions
- Security inputs (special chars, injection attempts)
- Dependency behavior (mocking or real calls depending on test type)
"""

# UNIT TEST RULES
    unit_rules = """
UNIT TEST RULES:
- Mock ALL external dependencies:
  - database
  - services
  - APIs
  - libraries
- Validate:
  - return values
  - thrown errors
  - side effects
  - function calls (spy/assert)
- Use proper mocking utilities for the framework
"""

# INTEGRATION TEST RULES
    integration_rules = """
INTEGRATION TEST RULES:
- Use real HTTP calls or framework-specific integration tools
- Do NOT mock the database unless required
- Validate:
  - request/response flow
  - status codes
  - JSON bodies
  - headers
  - real interactions between modules
"""
    # SELECT RULESET
    if test_type == "integration":
        rules = core_rules + integration_rules
    else:
        rules = core_rules + unit_rules

    # FINAL PROMPT
    prompt = f"""
{rules}

EXAMPLE:
{example}

CODE UNDER TEST:
{req.requirement}

Generate ONLY the test code.
"""

    return system_msg, prompt, 1500






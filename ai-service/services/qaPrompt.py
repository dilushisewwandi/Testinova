from services.nlp_context import build_nlp_context
def qa_prompt(req, parsed=None):

    # Safe NLP context
    try:
        nlp_context = build_nlp_context(parsed) if parsed else ""
    except Exception:
        nlp_context = ""

    framework = req.framework.lower()
    test_type = (req.testSubType or "ui").lower()

    #frameworks exampples
    if framework == "selenium":
        example = """
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestApp:
    def setup_method(self):
        self.driver = webdriver.Chrome()
        self.wait = WebDriverWait(self.driver, 10)

    def teardown_method(self):
        self.driver.quit()

    def test_example(self):
        self.driver.get("http://localhost:3000")
        self.wait.until(EC.visibility_of_element_located((By.TAG_NAME, "body")))
"""
    elif framework == "playwright":
        example = """
const { test, expect } = require('@playwright/test');

test('example', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('body')).toBeVisible();
});
"""
    elif framework == "cypress":
        example = """
describe('example', () => {
  it('visits page', () => {
    cy.visit('http://localhost:3000');
    cy.get('body').should('be.visible');
  });
});
"""
    else:
        example = ""


    core_rules = f"""
You are a senior QA automation engineer generating {framework} automated tests.

STRICT RULES:
- Output ONLY runnable {framework} test code
- NO explanations, NO comments, NO markdown
- Generate 6–10 test cases
- Each test must validate ONE UI behavior
- Tests must be independent and stable
- Use realistic user interactions
- Use explicit waits before all assertions

MANDATORY UI TEST COVERAGE:
- Valid input scenarios
- Invalid input scenarios
- Empty and whitespace-only inputs
- Special characters
- Very long inputs
- Disabled buttons / loading states
- Alerts, error messages, success messages
- Navigation between pages
- Visibility, attributes, and state changes

MANDATORY WAIT RULES:
- ALWAYS wait before interacting with elements
- Selenium → WebDriverWait
- Playwright → await expect()
- Cypress → built-in retry (cy.get().should())
- Wait for:
  - inputs
  - buttons
  - alerts/messages
  - navigation
  - dynamic UI updates
"""

# TEST TYPE RULES
    if test_type == "workflow":
        type_rules = """
WORKFLOW TEST RULES:
- Cover multi-step user flows
- Include navigation between pages
- Validate transitions, state changes, and final outcomes
- Include both success and failure paths
"""
    elif test_type == "e2e":
        type_rules = """
E2E TEST RULES:
- Cover full end-to-end scenarios
- Include frontend + backend interaction
- Validate server responses, alerts, and UI updates
- Include retry/recovery behavior
"""
    else:
        type_rules = """
UI TEST RULES:
- Focus on UI behavior and interactions
- Validate forms, buttons, alerts, navigation, and visibility
"""


# SELENIUM STRUCTURE RULES
    selenium_rules = """
SELENIUM STRUCTURE RULES:
- Use class-based pytest structure
- Use setup_method() to initialize driver
- Use teardown_method() to quit driver
- Reuse self.driver and self.wait
"""

    # FINAL PROMPT
    prompt = f"""
{core_rules}

{selenium_rules if framework == "selenium" else ""}

{type_rules}

NLP CONTEXT:
{nlp_context}

EXAMPLE:
{example}

REQUIREMENT:
{req.requirement}

Generate high-quality UI/workflow/E2E test cases that maximize:
- coverage
- reliability
- correctness

Output ONLY test code.
"""

    system_msg = (
        "You are a senior QA automation engineer. "
        "You generate clean, stable, production-ready UI and workflow tests."
    )

    return system_msg, prompt, 1200

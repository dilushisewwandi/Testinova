# def qa_prompt(req):
#         if req.framework == "selenium":
#             language = "Python/Java"
#             syntax = "WebDriver with unittest/pytest"
#         elif req.framework == "cypress":
#             language = "JavaScript"
#             syntax = "Cypress command chains with cy.get()"
#         elif req.framework == "playwright":
#             language = "JavaScript/Python"
#             syntax = "Playwright with page.locator()"
#         else:
#             return {"error": "Framework not selected"}

#         if req.testSubType == "workflow":
#             prompt = f"""
# You are a senior QA engineer specializing in workflow automation testing.
# Generate ONLY runnable {req.framework} workflow test code.

# Requirement:{req.requirementText}
# Use {language} with {syntax}

# Rules:
# - Focus on complete user workflows and journeys
# - Include all dependent steps in sequence
# - Test different user scenarios and data variations
# - Consider timing and dependencies between steps
# - Avoid testing single isolated components
# - Prioritize real-world workflow patterns
# - Do NOT explain anything
# - Do NOT generate documentation
# - Output only pure code using best practices for maintainability and readability
# """
#         elif req.testSubType == "e2e":
#             prompt = f"""
# You are a senior QA engineer specializing in e2e testing.
# Generate ONLY runnable {req.framework} e2e test code. 

# Requirement:{req.requirementText}
# Use {language} with {syntax}

# Rules:
# - Test complete user flows from start to finish
# - Include cross-browser/platform testing if applicable
# - Verify database state changes after actions
# - Test against real backend APIs (not mocked)
# - Include pre-conditions and post-conditions
# - Test user data persistence across sessions
# - Do NOT explain anything
# - Do NOT generate documentation
# - Output only pure code using best practices for maintainability and readability

# """
            
#         else:  # ui tests
#             prompt = f"""
# You are a senior QA engineer specializing in UI testing.
# Generate ONLY runnable {req.framework} UI test code.

# Requirement:{req.requirementText}
# Use {language} with {syntax}

# Rules:
# - Be comprehensive and practical
# - Focus on individual UI element behavior and interactions
# - Include assertions for visibility, state, text, attributes
# - Consider responsive design and different screen sizes
# - Test element interactions independently
# - Include validation of UI feedback (tooltips, messages, etc.)
# - Do NOT explain anything
# - Do NOT generate documentation
# - Output only pure code using best practices for maintainability and readability
# """
#         system_msg = "You are a senior QA engineer specializing in UI, workflow and e2e automation testing."

#         return prompt, system_msg, 900






from services.nlp_context import build_nlp_context


def qa_prompt(req, parsed=None):
    """
    Builds a prompt for QA engineer role test generation.
    Uses NLP parsed data to identify UI elements and workflows.
    """

#     # Framework-specific language and syntax
#     if req.framework == "selenium":
#         language = "Python"
#         syntax = "Selenium WebDriver with unittest"
#     elif req.framework == "cypress":
#         language = "JavaScript"
#         syntax = "Cypress command chains with cy.get()"
#     elif req.framework == "playwright":
#         language = "JavaScript"
#         syntax = "Playwright with page.locator()"
#     else:
#         raise ValueError("Framework not selected")

#     # Build NLP context from parsed requirement
#     nlp_context = build_nlp_context(parsed) if parsed else ""

#     if req.testSubType == "workflow":
#         prompt = f"""
# You are a senior QA engineer specializing in workflow automation testing.

# Generate ONLY runnable {req.framework} workflow test code.

# Requirement:
# {req.requirementText}
# {nlp_context}

# Rules:
# - Focus on complete user workflows and journeys
# - Include all dependent steps in the correct sequence
# - Test different user scenarios and data variations
# - Consider timing and dependencies between steps
# - Test the full flow from start to finish
# - Use {language} with {syntax}
# - Do NOT explain anything
# - Do NOT generate documentation or comments
# - Output only pure runnable code
# """

#     elif req.testSubType == "e2e":
#         prompt = f"""
# You are a senior QA engineer specializing in end-to-end testing.

# Generate ONLY runnable {req.framework} e2e test code.

# Requirement:
# {req.requirementText}
# {nlp_context}

# Rules:
# - Test complete user flows from start to finish
# - Verify state changes after each action
# - Test against realistic scenarios
# - Include pre-conditions and post-conditions
# - Use {language} with {syntax}
# - Do NOT explain anything
# - Do NOT generate documentation or comments
# - Output only pure runnable code
# """

#     else:
#         # Default: UI tests
#         prompt = f"""
# You are a senior QA engineer specializing in UI testing.

# Generate ONLY runnable {req.framework} UI test code.

# Requirement:
# {req.requirementText}
# {nlp_context}

# Rules:
# - Focus on individual UI element behavior and interactions
# - Include assertions for visibility, state, text and attributes
# - Test element interactions independently
# - Include validation of UI feedback messages
# - Cover both happy path and error scenarios
# - Use {language} with {syntax}
# - Do NOT explain anything
# - Do NOT generate documentation or comments
# - Output only pure runnable code
# """

#     system_msg = (
#         "You are a senior QA engineer specializing in "
#         "UI, workflow and end-to-end automation testing."
#     )

#     return prompt, system_msg, 900











# 2026/4/20 updated this and added the below code
# from services.nlp_context import build_nlp_context


# def qa_prompt(req, parsed=None):

#     if req.framework == "selenium":
#         language = "Python"
#         syntax = "Selenium WebDriver with unittest"
#         example = """
# Example of correct Selenium test structure:
# ```python
# import unittest
# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC

# class TestPageName(unittest.TestCase):

#     def setUp(self):
#         self.driver = webdriver.Chrome()
#         self.driver.get("http://localhost:3000")
#         self.wait = WebDriverWait(self.driver, 10)

#     def test_valid_action_succeeds(self):
#         element = self.wait.until(
#             EC.presence_of_element_located((By.ID, "element-id"))
#         )
#         element.send_keys("valid input")
#         self.driver.find_element(By.ID, "submit-btn").click()
#         result = self.wait.until(
#             EC.presence_of_element_located((By.ID, "result"))
#         )
#         self.assertIn("expected text", result.text)

#     def test_invalid_action_shows_error(self):
#         self.driver.find_element(By.ID, "submit-btn").click()
#         error = self.wait.until(
#             EC.presence_of_element_located((By.CLASS_NAME, "error"))
#         )
#         self.assertTrue(error.is_displayed())

#     def tearDown(self):
#         self.driver.quit()

# if __name__ == "__main__":
#     unittest.main()
# ```
# """

#     elif req.framework == "cypress":
#         language = "JavaScript"
#         syntax = "Cypress command chains"
#         example = """
# Example of correct Cypress test structure:
# ```javascript
# describe('Feature Name', () => {
#   beforeEach(() => {
#     cy.visit('/page-url');
#   });

#   it('should succeed with valid input', () => {
#     cy.get('[data-testid="input"]').type('valid input');
#     cy.get('[data-testid="submit"]').click();
#     cy.get('[data-testid="success"]').should('be.visible');
#     cy.url().should('include', '/expected-page');
#   });

#   it('should show error with invalid input', () => {
#     cy.get('[data-testid="submit"]').click();
#     cy.get('[data-testid="error"]')
#       .should('be.visible')
#       .and('contain', 'error message');
#   });

#   it('should handle boundary conditions', () => {
#     cy.get('[data-testid="input"]').type('a'.repeat(255));
#     cy.get('[data-testid="submit"]').click();
#     cy.get('[data-testid="result"]').should('exist');
#   });
# });
# ```
# """

#     elif req.framework == "playwright":
#         language = "JavaScript"
#         syntax = "Playwright with page.locator()"
#         example = """
# Example of correct Playwright test structure:
# ```javascript
# const { test, expect } = require('@playwright/test');

# test.describe('Feature Name', () => {
#   test.beforeEach(async ({ page }) => {
#     await page.goto('http://localhost:3000/page-url');
#   });

#   test('should succeed with valid input', async ({ page }) => {
#     await page.locator('[data-testid="input"]').fill('valid input');
#     await page.locator('[data-testid="submit"]').click();
#     await expect(page.locator('[data-testid="success"]'))
#       .toBeVisible();
#   });

#   test('should show error with invalid input', async ({ page }) => {
#     await page.locator('[data-testid="submit"]').click();
#     await expect(page.locator('[data-testid="error"]'))
#       .toBeVisible();
#     await expect(page.locator('[data-testid="error"]'))
#       .toContainText('required');
#   });

#   test('should complete full workflow', async ({ page }) => {
#     await page.locator('[data-testid="step1"]').fill('value');
#     await page.locator('[data-testid="next"]').click();
#     await page.locator('[data-testid="step2"]').fill('value');
#     await page.locator('[data-testid="submit"]').click();
#     await expect(page).toHaveURL(/.*success/);
#   });
# });
# ```
# """
#     else:
#         raise ValueError("Framework not selected")

#     nlp_context = build_nlp_context(parsed) if parsed else ""

#     if req.testSubType == "workflow":
#         prompt = f"""
# You are a senior QA engineer writing workflow automation tests.

# IMPORTANT RULES - Follow these EXACTLY:
# 1. Output ONLY pure runnable {req.framework} code
# 2. Do NOT include any explanation outside the code
# 3. Use proper {req.framework} patterns exactly as shown
# 4. Include setup and teardown
# 5. Each test must cover a complete user workflow step

# {example}

# Now generate workflow tests for this requirement:
# Requirement: {req.requirementText}
# {nlp_context}

# Workflow test rules:
# - Test the complete journey from start to finish
# - Include each step in the correct sequence
# - Test the happy path workflow
# - Test the workflow when a step fails
# - Use {language} with {syntax}

# Output ONLY the test code, nothing else:
# """

#     else:
#         prompt = f"""
# You are a senior QA engineer writing UI automation tests.

# IMPORTANT RULES - Follow these EXACTLY:
# 1. Output ONLY pure runnable {req.framework} code
# 2. Do NOT include any explanation outside the code
# 3. Use proper {req.framework} patterns exactly as shown
# 4. Include setup and teardown
# 5. Each test must have clear assertions

# {example}

# Now generate UI tests for this requirement:
# Requirement: {req.requirementText}
# {nlp_context}

# UI test rules:
# - Test 1: valid input succeeds and shows correct result
# - Test 2: invalid or empty input shows error message
# - Test 3: UI elements are visible and interactable
# - Test 4: correct page or state after action
# - Use {language} with {syntax}

# Output ONLY the test code, nothing else:
# """

#     system_msg = (
#         f"You are a senior QA automation engineer. "
#         f"You write clean, runnable {req.framework} test code. "
#         f"You always use the correct {req.framework} patterns. "
#         f"You never explain your code. You only output pure code."
#     )

#     return prompt, system_msg, 1000
def qa_prompt(req, parsed=None):

    nlp_context = build_nlp_context(parsed) if parsed else ""

    if req.framework == "playwright":
        example = """
EXAMPLE PLAYWRIGHT TESTS:
```javascript
const { test, expect } = require('@playwright/test');

test.describe('User Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.fill('input[type="email"]', 'user@example.com');
    await page.fill('input[type="password"]', 'Password123!');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Welcome back')).toBeVisible();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('should show error for invalid email', async ({ page }) => {
    await page.fill('input[type="email"]', 'invalid-email');
    await page.fill('input[type="password"]', 'Password123!');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Invalid email format')).toBeVisible();
  });

  test('should show error for wrong password', async ({ page }) => {
    await page.fill('input[type="email"]', 'user@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });

  test('should show error for empty fields', async ({ page }) => {
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Password is required')).toBeVisible();
  });

  test('should navigate to signup page', async ({ page }) => {
    await page.click('text=Create account');

    await expect(page).toHaveURL(/.*signup/);
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });
});
```
"""
    elif req.framework == "cypress":
        example = """
EXAMPLE CYPRESS TESTS:
```javascript
describe('User Authentication', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should login with valid credentials', () => {
    cy.get('input[type="email"]').type('user@example.com');
    cy.get('input[type="password"]').type('Password123!');
    cy.get('button[type="submit"]').click();

    cy.contains('Welcome back').should('be.visible');
    cy.url().should('include', 'dashboard');
  });

  it('should show error for invalid email', () => {
    cy.get('input[type="email"]').type('invalid-email');
    cy.get('input[type="password"]').type('Password123!');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid email format').should('be.visible');
  });

  it('should show error for wrong password', () => {
    cy.get('input[type="email"]').type('user@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid credentials').should('be.visible');
  });

  it('should show error for empty fields', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
  });
});
```
"""
    elif req.framework == "selenium":
        example = """
EXAMPLE SELENIUM TESTS:
```python
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestAuthentication(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get('http://localhost:3000/login')
        self.wait = WebDriverWait(self.driver, 10)

    def test_login_valid_credentials(self):
        email_input = self.wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'input[type="email"]'))
        )
        email_input.send_keys('user@example.com')

        password_input = self.driver.find_element(By.CSS_SELECTOR, 'input[type="password"]')
        password_input.send_keys('Password123!')

        submit_button = self.driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]')
        submit_button.click()

        success_message = self.wait.until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Welcome back')]"))
        )
        self.assertTrue(success_message.is_displayed())

    def test_login_invalid_email(self):
        self.driver.find_element(By.CSS_SELECTOR, 'input[type="email"]').send_keys('invalid-email')
        self.driver.find_element(By.CSS_SELECTOR, 'input[type="password"]').send_keys('Password123!')
        self.driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]').click()

        error_message = self.wait.until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Invalid email')]"))
        )
        self.assertTrue(error_message.is_displayed())

    def tearDown(self):
        self.driver.quit()
```
"""
    else:
        example = "Generate realistic UI tests following standard automation patterns."

    if req.testSubType == "workflow":
        prompt = f"""
You are a senior QA engineer writing {req.framework} workflow automation tests for Gemma-2B-IT model.

CRITICAL REQUIREMENTS:
1. Output ONLY pure runnable {req.framework} code
2. NO explanations, NO comments, NO markdown
3. Generate at least 5 comprehensive workflow test cases
4. Test complete user journeys from start to finish
5. Include realistic user interactions and data
6. Test both happy path and failure scenarios
7. Use proper waiting and assertion patterns

{nlp_context}

{example}

Now generate workflow tests for this requirement:
{req.requirementText}

Workflow test focus:
- Test complete user registration flow (form fill → submit → success)
- Test complete login flow (credentials → submit → dashboard)
- Test navigation between pages
- Test form validation and error handling
- Test user session management
- Test responsive behavior if mentioned

Output ONLY the test code:
"""
    elif req.testSubType == "e2e":
        prompt = f"""
You are a senior QA engineer writing {req.framework} end-to-end tests for Gemma-2B-IT model.

CRITICAL REQUIREMENTS:
1. Output ONLY pure runnable {req.framework} code
2. NO explanations, NO comments, NO markdown
3. Generate at least 6 comprehensive e2e test cases
4. Test complete application flows across multiple pages
5. Include database/API verification where relevant
6. Test real user scenarios from start to finish
7. Use proper setup, execution, and cleanup

{nlp_context}

{example}

Now generate e2e tests for this requirement:
{req.requirementText}

E2E test focus:
- Test full user registration and login cycle
- Test data persistence across page reloads
- Test integration with backend APIs
- Test complete business workflows
- Test error recovery and edge cases
- Test performance and loading states

Output ONLY the test code:
"""
    else:  # UI tests
        prompt = f"""
You are a senior QA engineer writing {req.framework} UI automation tests for Gemma-2B-IT model.

CRITICAL REQUIREMENTS:
1. Output ONLY pure runnable {req.framework} code
2. NO explanations, NO comments, NO markdown
3. Generate at least 6 comprehensive UI test cases
4. Use realistic form data and user interactions
5. Test all UI elements mentioned in the requirement
6. Include visibility, interaction, and validation tests
7. Test both positive and negative scenarios

{nlp_context}

{example}

Now generate UI tests for this requirement:
{req.requirementText}

UI test requirements:
- Test form inputs: valid data, invalid data, empty fields, boundary values
- Test buttons: click actions, disabled states, loading states
- Test navigation: links, redirects, page changes
- Test feedback: success messages, error messages, validation messages
- Test UI elements: visibility, text content, attributes
- Test responsive design if mentioned
- Test accessibility features if mentioned

Output ONLY the test code:
"""

    system_msg = (
        "You are a senior QA automation engineer who writes realistic, comprehensive test code. "
        "You use proper selectors, realistic data, and thorough test coverage. "
        "You never explain your code. You only output pure, executable test code."
    )

    return prompt, system_msg, 1500
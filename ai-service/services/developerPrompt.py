# def developer_prompt(req):

#     if req.framework == "jest":
#                 language = "JavaScript"
#                 structure = "describe() and test() with expect()"
#     elif req.framework == "pytest":
#         language = "Python"
#         structure = "pytest functions using assert"
#     elif req.framework == "junit":
#         language = "Java"
#         structure = "@Test annotation with assertEquals"
#     else: 
#         return {"error": "Framework not selected"}
            
#     if req.testType == "integration":
#         prompt = f"""
#     You are a senior {language} developer.

#     Generate ONLY runnable {req.framework} integration test code.

#     Requirement:
#     {req.requirementText}

#     Rules:
#     - Test interactions between multiple modules/components
#     - Include setup and teardown if needed
#     - Test end-to-end workflows
#     - Use {structure}
#     - Include tests for different data scenarios
#     - Test error handling between integrated components
#     - Do NOT explain anything
#     - Do NOT generate documentation
#     - Output only pure code
#     """
#     else:  # unit tests
#         prompt = f"""
#     You are a senior {language} developer.

#     Generate ONLY runnable {req.framework} unit test code.

#     Requirement:
#     {req.requirementText}

#     Rules:
#     - Include positive test cases
#     - Include negative test cases
#     - Include boundary test cases
#     - Use {structure}
#     - Mock any external dependencies
#     - Test one function/method at a time
#     - Do NOT explain anything
#     - Do NOT generate documentation
#     - Output only pure code
#     """
#     system_message = f"You are a senior {language} software developer."

#     return prompt,system_message,800









#     # Framework-specific language and structure
#     if req.framework == "jest":
#         language = "JavaScript"
#         structure = "describe() and test() blocks with expect()"
#     elif req.framework == "pytest":
#         language = "Python"
#         structure = "pytest functions using assert statements"
#     elif req.framework == "junit":
#         language = "Java"
#         structure = "@Test annotation with assertEquals and assertTrue"
#     else:
#         raise ValueError("Framework not selected")

#     # Build NLP context from parsed requirement
#     nlp_context = build_nlp_context(parsed) if parsed else ""

#     if req.testType == "integration":
#         prompt = f"""
# You are a senior {language} developer specializing in integration testing.

# Generate ONLY runnable {req.framework} integration test code.

# Requirement:
# {req.requirementText}
# {nlp_context}

# Rules:
# - Test interactions between multiple modules or components
# - Include setup and teardown if needed
# - Test end-to-end workflows between integrated parts
# - Use {structure}
# - Include tests for different data scenarios
# - Test error handling between integrated components
# - Cover both success and failure integration paths
# - Do NOT explain anything
# - Do NOT generate documentation or comments
# - Output only pure runnable code
# """

#     else:
#         # Default: unit tests
#         prompt = f"""
# You are a senior {language} developer specializing in unit testing.

# Generate ONLY runnable {req.framework} unit test code.

# Requirement:
# {req.requirementText}
# {nlp_context}

# Rules:
# - Include positive test cases (valid inputs)
# - Include negative test cases (invalid inputs)
# - Include boundary value test cases
# - Use {structure}
# - Mock any external dependencies
# - Test one function or method at a time
# - Cover edge cases identified in the requirement
# - Do NOT explain anything
# - Do NOT generate documentation or comments
# - Output only pure runnable code
# """

#     system_message = (
#         f"You are a senior {language} software developer "
#         f"who writes clean, well-structured test code."
#     )

#     return prompt, system_message, 800







# 4/20/2026 5.43pm commented this code and add the below code
# from services.nlp_context import build_nlp_context


# def developer_prompt(req, parsed=None):

#     if req.framework == "jest":
#         language = "JavaScript"
#         structure = "describe() and test() blocks with expect()"
#         example = """
# Example of correct Jest test structure:
# ```javascript
# describe('functionName', () => {
#   test('should return correct value for valid input', () => {
#     expect(functionName(validInput)).toBe(expectedOutput);
#   });

#   test('should throw error for invalid input', () => {
#     expect(() => functionName(invalidInput)).toThrow(Error);
#   });

#   test('should handle boundary value', () => {
#     expect(functionName(0)).toBe(boundaryResult);
#   });
# });
# ```
# """

#     elif req.framework == "pytest":
#         language = "Python"
#         structure = "pytest functions using assert and pytest.raises"
#         example = """
# Example of correct pytest test structure:
# ```python
# import pytest

# def test_valid_input():
#     result = function_name(valid_input)
#     assert result == expected_output

# def test_invalid_input_raises_error():
#     with pytest.raises(ValueError):
#         function_name(invalid_input)

# def test_boundary_value():
#     result = function_name(boundary_value)
#     assert result == boundary_result

# def test_negative_input_raises_error():
#     with pytest.raises(ValueError):
#         function_name(negative_input)
# ```
# """

#     elif req.framework == "junit":
#         language = "Java"
#         structure = "@Test annotation with assertEquals and assertThrows"
#         example = """
# Example of correct JUnit test structure:
# ```java
# import org.junit.jupiter.api.Test;
# import static org.junit.jupiter.api.Assertions.*;

# class FunctionNameTest {

#     @Test
#     void testValidInput() {
#         assertEquals(expectedOutput, functionName(validInput));
#     }

#     @Test
#     void testInvalidInputThrowsException() {
#         assertThrows(IllegalArgumentException.class, () -> {
#             functionName(invalidInput);
#         });
#     }

#     @Test
#     void testBoundaryValue() {
#         assertEquals(boundaryResult, functionName(boundaryValue));
#     }
# }
# ```
# """
#     else:
#         raise ValueError("Framework not selected")

#     nlp_context = build_nlp_context(parsed) if parsed else ""

#     if req.testType == "integration":
#         prompt = f"""
# You are a senior {language} developer writing integration tests.

# IMPORTANT RULES - Follow these EXACTLY:
# 1. Output ONLY pure runnable {req.framework} code
# 2. Do NOT include any explanation or comments outside the code
# 3. Do NOT write markdown headers or descriptions
# 4. Every test function must have assertions
# 5. Use proper {req.framework} patterns exactly as shown in the example
# 6. Test both success and failure scenarios

# {example}

# Now generate integration tests for this requirement:
# Requirement: {req.requirementText}
# {nlp_context}

# Integration test rules:
# - Test how components work together
# - Include database or API interactions if relevant
# - Test the complete flow from input to output
# - Include setup and teardown where needed
# - Use {structure}
# - Test both successful integration and failure scenarios

# Output ONLY the test code, nothing else:
# """

#     else:
#         prompt = f"""
# You are a senior {language} developer writing unit tests.

# IMPORTANT RULES - Follow these EXACTLY:
# 1. Output ONLY pure runnable {req.framework} code
# 2. Do NOT include any explanation or comments outside the code
# 3. Do NOT write markdown headers or descriptions
# 4. Every test function must test ONE specific scenario
# 5. Use proper {req.framework} patterns exactly as shown in the example
# 6. For exception testing use the EXACT pattern shown in the example

# {example}

# Now generate unit tests for this requirement:
# Requirement: {req.requirementText}
# {nlp_context}

# Unit test rules:
# - Write a SEPARATE test function for each scenario
# - Test 1: valid input returns correct output
# - Test 2: invalid input raises correct exception
# - Test 3: boundary value at minimum
# - Test 4: boundary value at maximum
# - Test 5: boundary value just outside range
# - Use {structure}
# - Mock any external dependencies

# Output ONLY the test code, nothing else:
# """

#     system_message = (
#         f"You are a senior {language} developer. "
#         f"You write clean, correct, runnable test code. "
#         f"You always use the correct testing patterns for {req.framework}. "
#         f"You never explain your code. You only output pure code."
#     )

#     return prompt, system_message, 1000



# from services.nlp_context import build_nlp_context

# def developer_prompt(req, parsed=None):
#     """
#     High-quality developer prompt for generating exam-ready unit tests.
#     Optimized for scoring: assertions, diversity, structure, and correctness.
#     """

#     nlp_context = build_nlp_context(parsed) if parsed else ""

#     example = """
# describe('functionName', () => {

#   test('should return correct result for valid input', () => {
#     expect(functionName(10)).toBe(20);
#   });

#   test('should throw error for invalid input', () => {
#     expect(() => functionName(null)).toThrow(Error);
#   });

#   test('should handle boundary minimum', () => {
#     expect(functionName(0)).toBe(0);
#   });

#   test('should handle boundary maximum', () => {
#     expect(functionName(100)).toBe(200);
#   });

# });
# """

#     prompt = f"""
# You are a senior {req.framework} developer writing HIGH-QUALITY, production-ready unit tests.

# ════════════════════════════
# STRICT OUTPUT RULES (MANDATORY)
# ════════════════════════════
# - Output ONLY runnable {req.framework} code
# - DO NOT include explanations or markdown
# - DO NOT include comments outside the code
# - Each test must verify ONE behavior
# - Use clean, readable structure

# ════════════════════════════
# CONTEXT AWARENESS (CRITICAL)
# ════════════════════════════
# Determine function type BEFORE writing tests:

# IF function uses (req, res):
# → It is an Express controller

# YOU MUST:
# - Mock req and res objects
# - Use:
#   res = {{
#     status: jest.fn().mockReturnThis(),
#     json: jest.fn()
#   }}

# - Validate using:
#   expect(res.status).toHaveBeenCalledWith(...)
#   expect(res.json).toHaveBeenCalledWith(...)

# - DO NOT use:
#   expect(function()).toBe(...)

# IF function is pure:
# → Test return values normally

# ════════════════════════════
# ASYNC RULES (MANDATORY)
# ════════════════════════════
# - If function is async → use async/await
# - ALWAYS await function calls

# ════════════════════════════
# MOCKING RULES (MANDATORY)
# ════════════════════════════
# Mock ALL external dependencies:

# - Database:
#   jest.spyOn(Model, 'findOne')
#   jest.spyOn(Model, 'create')

# - Libraries:
#   bcrypt.compareSync
#   bcrypt.hashSync
#   jwt.sign

# - Use mockResolvedValue / mockReturnValue

# ════════════════════════════
# TEST COVERAGE RULES (MANDATORY)
# ════════════════════════════
# Generate AT LEAST 5 test cases:

# 1. ✅ Valid input (success case)
# 2. ❌ Invalid input (missing/incorrect data)
# 3. ❌ Negative case (e.g., user not found / wrong password)
# 4. ⚠️ Boundary minimum (empty, null, "", 0)
# 5. ⚠️ Boundary edge (very long input, invalid format)

# ════════════════════════════
# ASSERTION RULES (MANDATORY)
# ════════════════════════════
# - Use correct Jest assertions:
#   expect().toBe()
#   expect().toEqual()
#   expect().toHaveBeenCalledWith()
#   expect().toThrow()

# - Minimum 5 assertions across tests

# - NEVER use:
#   expect(func()).toBe(Error)

# ════════════════════════════
# STRUCTURE RULES (MANDATORY)
# ════════════════════════════
# - Use describe() block
# - Use multiple test() cases
# - Use meaningful test names:
#   "should return error when password is invalid"

# - Include beforeEach() for setup

# ════════════════════════════
# SCORING OPTIMIZATION (VERY IMPORTANT)
# ════════════════════════════
# Maximize score by ensuring:

# ✔ Assertions ≥ 5  
# ✔ Test diversity (positive, negative, boundary)  
# ✔ Proper Jest structure  
# ✔ Code length ≥ 30 lines  
# ✔ Clear and descriptive test names  

# ════════════════════════════
# NLP CONTEXT (USE THIS)
# ════════════════════════════
# {nlp_context}

# - Use actions → what to test
# - Use conditions → negative cases
# - Use objects → input fields

# ════════════════════════════
# EXAMPLE STRUCTURE
# ════════════════════════════
# {example}

# ════════════════════════════
# REQUIREMENT
# ════════════════════════════
# {req.requirementText}

# ════════════════════════════
# OUTPUT
# ════════════════════════════
# Generate ONLY the test code:
# """

#     system_msg = (
#         "You are a senior backend developer. "
#         "You write precise, structured, and fully correct unit tests. "
#         "You understand Express controllers, async logic, and mocking. "
#         "You always follow best testing practices."
#     )

#     return prompt, system_msg, 1500








# from services.nlp_context import build_nlp_context

# def developer_prompt(req, parsed=None):

#     nlp_context = build_nlp_context(parsed) if parsed else ""

#     if req.framework == "jest":
#         example = """
# EXAMPLE JEST TESTS:
# ```javascript
# const bcrypt = require('bcryptjs');
# const jwt = require('jsonwebtoken');
# const { User } = require('../models/User');

# describe('signup', () => {
#   test('should create user with valid data', async () => {
#     const req = {
#       body: {
#         username: 'testuser',
#         email: 'test@example.com',
#         password: 'Password123!'
#       }
#     };
#     const res = {
#       status: jest.fn().mockReturnThis(),
#       json: jest.fn()
#     };

#     // Mock User.create
#     User.create = jest.fn().mockResolvedValue({
#       userId: 1,
#       username: 'testuser',
#       email: 'test@example.com'
#     });

#     await signup(req, res);

#     expect(res.status).toHaveBeenCalledWith(201);
#     expect(res.json).toHaveBeenCalledWith({
#       message: '🎉 Welcome to the Testinova',
#       user: expect.any(Object)
#     });
#   });

#   test('should reject username too short', async () => {
#     const req = { body: { username: 'ab', email: 'test@example.com', password: 'Password123!' } };
#     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

#     await signup(req, res);

#     expect(res.status).toHaveBeenCalledWith(400);
#     expect(res.json).toHaveBeenCalledWith({ message: 'Username is too short!' });
#   });

#   test('should reject invalid email', async () => {
#     const req = { body: { username: 'testuser', email: 'invalid-email', password: 'Password123!' } };
#     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

#     await signup(req, res);

#     expect(res.status).toHaveBeenCalledWith(400);
#     expect(res.json).toHaveBeenCalledWith({ message: 'This email is not valid' });
#   });

#   test('should reject weak password', async () => {
#     const req = { body: { username: 'testuser', email: 'test@example.com', password: 'weak' } };
#     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

#     await signup(req, res);

#     expect(res.status).toHaveBeenCalledWith(400);
#     expect(res.json).toHaveBeenCalledWith({ message: 'This password is not valid' });
#   });

#   test('should reject existing email', async () => {
#     const req = { body: { username: 'testuser', email: 'existing@example.com', password: 'Password123!' } };
#     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

#     User.findOne = jest.fn().mockResolvedValue({ email: 'existing@example.com' });

#     await signup(req, res);

#     expect(res.status).toHaveBeenCalledWith(400);
#     expect(res.json).toHaveBeenCalledWith({ message: 'Email already exists' });
#   });
# });

# describe('login', () => {
#   test('should login with valid credentials', async () => {
#     const req = { body: { email: 'test@example.com', password: 'Password123!' } };
#     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

#     const mockUser = {
#       userId: 1,
#       username: 'testuser',
#       email: 'test@example.com',
#       password: await bcrypt.hash('Password123!', 10),
#       role: 'user'
#     };

#     User.findOne = jest.fn().mockResolvedValue(mockUser);
#     bcrypt.compareSync = jest.fn().mockReturnValue(true);
#     jwt.sign = jest.fn().mockReturnValue('mock-token');

#     await login(req, res);

#     expect(res.json).toHaveBeenCalledWith({
#       message: '🌟 Welcome back!',
#       token: 'mock-token',
#       user: expect.any(Object)
#     });
#   });

#   test('should reject missing email', async () => {
#     const req = { body: { password: 'Password123!' } };
#     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

#     await login(req, res);

#     expect(res.status).toHaveBeenCalledWith(400);
#     expect(res.json).toHaveBeenCalledWith({ message: 'You need both email and password to login!' });
#   });

#   test('should reject user not found', async () => {
#     const req = { body: { email: 'notfound@example.com', password: 'Password123!' } };
#     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

#     User.findOne = jest.fn().mockResolvedValue(null);

#     await login(req, res);

#     expect(res.status).toHaveBeenCalledWith(404);
#     expect(res.json).toHaveBeenCalledWith({ message: 'No user found!' });
#   });

#   test('should reject wrong password', async () => {
#     const req = { body: { email: 'test@example.com', password: 'wrongpassword' } };
#     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

#     const mockUser = { password: await bcrypt.hash('Password123!', 10) };
#     User.findOne = jest.fn().mockResolvedValue(mockUser);
#     bcrypt.compareSync = jest.fn().mockReturnValue(false);

#     await login(req, res);

#     expect(res.status).toHaveBeenCalledWith(401);
#     expect(res.json).toHaveBeenCalledWith({ message: 'Invalid password!' });
#   });
# });
# ```
# """
#     elif req.framework == "pytest":
#         example = """
# EXAMPLE PYTEST TESTS:
# ```python
# import pytest
# from unittest.mock import patch, MagicMock
# import bcrypt
# import jwt
# from models.user import User

# def test_signup_success():
#     with patch('models.user.User.create') as mock_create, \
#          patch('models.user.User.findOne') as mock_find:

#         mock_find.return_value = None
#         mock_create.return_value = MagicMock(
#             userId=1, username='testuser', email='test@example.com', role='user'
#         )

#         req = MagicMock()
#         req.body = {
#             'username': 'testuser',
#             'email': 'test@example.com',
#             'password': 'Password123!'
#         }
#         res = MagicMock()

#         signup(req, res)

#         res.status.assert_called_with(201)
#         res.json.assert_called_once()

# def test_signup_username_too_short():
#     req = MagicMock()
#     req.body = {'username': 'ab', 'email': 'test@example.com', 'password': 'Password123!'}
#     res = MagicMock()

#     signup(req, res)

#     res.status.assert_called_with(400)
#     res.json.assert_called_with({'message': 'Username is too short!'})

# def test_login_success():
#     with patch('models.user.User.findOne') as mock_find, \
#          patch('bcrypt.compareSync') as mock_compare, \
#          patch('jwt.sign') as mock_jwt:

#         mock_user = MagicMock(
#             userId=1, username='testuser', email='test@example.com', role='user'
#         )
#         mock_find.return_value = mock_user
#         mock_compare.return_value = True
#         mock_jwt.return_value = 'mock-token'

#         req = MagicMock()
#         req.body = {'email': 'test@example.com', 'password': 'Password123!'}
#         res = MagicMock()

#         login(req, res)

#         res.json.assert_called_with({
#             'message': '🌟 Welcome back!',
#             'token': 'mock-token',
#             'user': {
#                 'id': 1,
#                 'name': 'testuser',
#                 'email': 'test@example.com',
#                 'role': 'user'
#             }
#         })

# def test_login_user_not_found():
#     with patch('models.user.User.findOne') as mock_find:
#         mock_find.return_value = None

#         req = MagicMock()
#         req.body = {'email': 'notfound@example.com', 'password': 'Password123!'}
#         res = MagicMock()

#         login(req, res)

#         res.status.assert_called_with(404)
#         res.json.assert_called_with({'message': 'No user found!'})
# ```
# """
#     else:
#         example = f"Generate {req.framework} tests following Jest/pytest patterns."

#     if req.testType == "integration":
#         prompt = f"""
# You are a senior developer writing {req.framework} integration tests for Gemma-2B-IT model.

# CRITICAL REQUIREMENTS:
# 1. Output ONLY pure runnable {req.framework} code
# 2. NO explanations, NO comments, NO markdown
# 3. Generate at least 6 comprehensive test cases
# 4. Test complete workflows from request to response
# 5. Mock all external dependencies (database, bcrypt, jwt)
# 6. Test both success and failure scenarios
# 7. Use proper mocking patterns

# {nlp_context}

# {example}

# Now generate integration tests for this Express.js authentication code:
# {req.requirementText}

# Integration test focus:
# - Test complete signup flow (validation → database → response)
# - Test complete login flow (lookup → password check → token generation)
# - Test database interactions
# - Test error handling across the full stack
# - Test input sanitization and validation
# - Test JWT token generation and validation

# Output ONLY the test code:
# """
#     else:
#         prompt = f"""
# You are a senior developer writing {req.framework} unit tests for Gemma-2B-IT model.

# CRITICAL REQUIREMENTS:
# 1. Output ONLY pure runnable {req.framework} code
# 2. NO explanations, NO comments, NO markdown
# 3. Generate at least 8 comprehensive test cases
# 4. Each test must focus on ONE specific scenario
# 5. Mock all external dependencies (User model, bcrypt, jwt)
# 6. Test positive cases, negative cases, and edge cases
# 7. Use realistic test data

# {nlp_context}

# {example}

# Now generate unit tests for this Express.js authentication code:
# {req.requirementText}

# Unit test requirements:
# - Test signup function: valid data, invalid username, invalid email, weak password, existing user
# - Test login function: valid credentials, missing fields, user not found, wrong password
# - Mock User.findOne, User.create, bcrypt functions, jwt.sign
# - Test all validation logic and error responses
# - Test all success responses with correct data structure

# Output ONLY the test code:
# """

#     system_msg = (
#         "You are a senior developer who writes comprehensive, realistic test code. "
#         "You follow exact patterns and never explain your code. You only output pure, executable code."
#     )

#     return prompt, system_msg, 1500






def developer_prompt(req, parsed=None):

    prompt = f"""
Write {req.framework} unit tests.

IMPORTANT:
- Functions are Express controllers (req, res)
- Mock dependencies (User, bcrypt, jwt)

RULES:
- Use describe + test
- Use async/await
- DO NOT nest tests
- Each test = one case

RESPONSE MOCK:
const res = {{
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
}};

REQUIRED TESTS (min 5):
1. success case
2. missing input
3. invalid input
4. not found / wrong password
5. error case

ASSERTIONS:
- expect(res.status).toHaveBeenCalledWith(...)
- expect(res.json).toHaveBeenCalledWith(...)

EXAMPLE:
describe("login", () => {{
  test("success", async () => {{
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  }});
}});

CODE:
{req.requirementText}

Generate ONLY test code:
"""

    system_msg = "Write correct unit tests. No explanation."

    return prompt, system_msg, 900
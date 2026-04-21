# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import requests
# from models.nlp_parser import parse_requirement
# from fastapi.responses import Response

# app = FastAPI()


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:5173",
#         "http://127.0.0.1:5173",
#         "http://localhost:3000",
#         "http://127.0.0.1:3000",
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class TestRequests(BaseModel):
#     role: str
#     requirementText: str
#     framework: str | None = None
#     testType: str | None = None
#     testSubType: str | None = None

# LLAMA_URL = "http://localhost:8080/v1/chat/completions"

# @app.post("/generate-test")
# def generate_test(req: TestRequests):
#     language = None
#     structure = None
#     tool = None
#     approach = None
    
   
#     if req.role == "student":
#         prompt = f"""
# You are a highly experienced software teacher.

# Explain the following requirement in a detailed, step-by-step manner. 
# Provide example code snippets where possible, and explain why each step is done.

# Requirement:
# {req.requirementText}

# Rules:
# - Provide explanations like a teacher teaching a student
# - Use simple and clear language
# - Include comments in example code
# - Show best practices and reasoning
# - Output explanation followed by runnable example code
# """
#         system_message = "You are a patient software teacher who explains code and testing concepts clearly."

   
#     elif req.role == "developer":
#         if req.framework == "jest":
#             language = "JavaScript"
#             structure = "describe() and test() with expect()"
#         elif req.framework == "pytest":
#             language = "Python"
#             structure = "pytest functions using assert"
#         elif req.framework == "junit":
#             language = "Java"
#             structure = "@Test annotation with assertEquals"
#         else: 
#             return {"error": "Framework not selected"}
        
#         if req.testType == "integration":
#             prompt = f"""
# You are a senior {language} developer.

# Generate ONLY runnable {req.framework} integration test code.

# Requirement:
# {req.requirementText}

# Rules:
# - Test interactions between multiple modules/components
# - Include setup and teardown if needed
# - Test end-to-end workflows
# - Use {structure}
# - Include tests for different data scenarios
# - Test error handling between integrated components
# - Do NOT explain anything
# - Do NOT generate documentation
# - Output only pure code
# """
#         else:  # unit tests
#             prompt = f"""
# You are a senior {language} developer.

# Generate ONLY runnable {req.framework} unit test code.

# Requirement:
# {req.requirementText}

# Rules:
# - Include positive test cases
# - Include negative test cases
# - Include boundary test cases
# - Use {structure}
# - Mock any external dependencies
# - Test one function/method at a time
# - Do NOT explain anything
# - Do NOT generate documentation
# - Output only pure code
# """
#         system_message = f"You are a senior {language} software developer."

#     elif req.role == "qa":
#         if req.framework == "selenium":
#             tool = "Selenium"
#             approach = "XPath/CSS selectors with explicit waits"
#         elif req.framework == "cypress":
#             tool = "Cypress"
#             approach = "cy.get() with built-in waits and assertions"
#         elif req.framework == "playwright":
#             tool = "Playwright"
#             approach = "page.locator() with reliable selectors"
#         else:
#             return {"error": "Framework not selected"}

#         if req.testSubType == "workflow":
#             prompt = f"""
# You are a senior QA engineer specializing in workflow automation testing.

# Generate a comprehensive workflow test strategy and scenarios for {tool}.

# Requirement:
# {req.requirementText}

# Provide:
# 1. **User Journey**: Document the complete user workflow/journey with all steps
# 2. **Test Scenarios**: List 5-7 end-to-end workflow test scenarios with expected results
# 3. **Interaction Points**: Key interactions, form submissions, navigations involved
# 4. **State Management**: How state changes throughout the workflow
# 5. **Error Handling**: Recovery paths if steps fail (e.g., timeout, network error)
# 6. **Data Flow**: How data flows through the workflow
# 7. **Exit Points**: Valid workflow completion and alternative exit paths
# 8. **Sample Test Template**: A code template for one complete workflow test case

# Rules:
# - Focus on complete user workflows and journeys
# - Include all dependent steps in sequence
# - Test different user scenarios and data variations
# - Consider timing and dependencies between steps
# - Avoid testing single isolated components
# - Prioritize real-world workflow patterns
# """
#         else:  # ui tests
#             prompt = f"""
# You are a senior QA engineer specializing in UI testing.

# Generate a comprehensive UI test strategy and test scenarios for {tool}.

# Requirement:
# {req.requirementText}

# Provide:
# 1. **Component Testing**: All UI components that need testing
# 2. **Test Scenarios**: List 5-7 detailed UI test scenarios with expected results
# 3. **Selector Strategy**: Recommended selectors and locators using {approach}
# 4. **Visual Testing**: Elements to verify (visibility, position, styling)
# 5. **Interaction Testing**: Clicks, inputs, hovers, scrolling behaviors
# 6. **Edge Cases**: UI edge cases (empty states, overflow, responsive design)
# 7. **Best Practices**: Best practices specific to {tool}
# 8. **Sample Test Template**: A code template for one complete UI test case

# Rules:
# - Be comprehensive and practical
# - Focus on individual UI element behavior and interactions
# - Include assertions for visibility, state, text, attributes
# - Consider responsive design and different screen sizes
# - Test element interactions independently
# - Include validation of UI feedback (tooltips, messages, etc.)
# """
#         system_message = "You are a senior QA engineer specializing in UI and workflow automation testing."

#     else:
#         return {"error": "Invalid role"}

   
#     response = requests.post(
#         LLAMA_URL,
#         json={
#            "messages":[
#                {"role": "system", "content": system_message},
#                {"role": "user", "content": prompt}
#            ],
#            "max_tokens": 800 if (req.role == "qa" or req.testType == "integration" or req.testSubType == "workflow") else 400,
#            "temperature": 0.3
#         }
#     )
    
#     if response.status_code != 200:
#         return {"error": f"Llama server error: {response.text}"}

#     result = response.json()
#     content = result.get("choices", [{}])[0].get("message", {}).get("content", "")

#     parsedData = parse_requirement(req.requirementText)
    
#     return {
#         "role": req.role,
#         "requirementText": req.requirementText,
#         "parsed": parsedData,
#         "templateHint": "AI Generated",
#         "template": "",
#         "testCode": content
#     }

# @app.options("/generate-test")
# def generate_test_options():
#     return Response(status_code=200)



from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.testGenerator import router as test_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(test_router)



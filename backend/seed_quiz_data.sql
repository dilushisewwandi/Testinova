-- Insert learning modules
INSERT INTO learning_modules (title, description, prerequisiteModuleID, `order`, topics, active, createdAt, updatedAt) VALUES
('Testing Fundamentals', 'Learn the basics of software testing', NULL, 1, '["What is Testing?", "Types of Testing", "Testing Lifecycle"]', true, NOW(), NOW()),
('Unit Testing', 'Master unit testing concepts and practices', 1, 2, '["Unit Test Structure", "Test Cases", "Assertions"]', true, NOW(), NOW()),
('Integration Testing', 'Learn how components work together', 2, 3, '["Component Integration", "API Testing", "Data Flow"]', true, NOW(), NOW()),
('UI/UX Testing', 'Test user interfaces and experiences', 3, 4, '["UI Elements", "User Flows", "Accessibility"]', true, NOW(), NOW()),
('API Testing', 'Master API testing techniques', 2, 5, '["REST APIs", "HTTP Methods", "Response Validation"]', true, NOW(), NOW()),
('Performance Testing', 'Learn performance testing concepts', 4, 6, '["Load Testing", "Stress Testing", "Performance Metrics"]', true, NOW(), NOW()),
('Security Testing', 'Understand security testing fundamentals', 1, 7, '["Vulnerability Assessment", "Penetration Testing", "Security Best Practices"]', true, NOW(), NOW()),
('Database Testing', 'Test database operations and integrity', 3, 8, '["Data Integrity", "SQL Testing", "Database Performance"]', true, NOW(), NOW());

-- Insert quiz questions for Module 1: Testing Fundamentals
INSERT INTO quiz_questions (moduleID, question, options, correctAnswer, explanation, difficulty, active, createdAt, updatedAt) VALUES
(1, 'What is the main goal of software testing?', '["Find bugs", "Write code", "Design UI", "Deploy software"]', 0, 'Software testing primarily aims to identify defects and ensure quality.', 'easy', true, NOW(), NOW()),
(1, 'Which of these is NOT a type of software testing?', '["Unit Testing", "Integration Testing", "System Testing", "Code Writing"]', 3, 'Code writing is development, not testing.', 'easy', true, NOW(), NOW()),
(1, 'When should testing begin in the software development lifecycle?', '["After coding is complete", "During requirements gathering", "Only before deployment", "After deployment"]', 1, 'Testing should start early to catch issues throughout development.', 'medium', true, NOW(), NOW()),
(1, 'What does the term "regression testing" mean?', '["Testing new features", "Re-testing after fixes", "Testing performance", "Testing security"]', 1, 'Regression testing ensures fixes don''t break existing functionality.', 'medium', true, NOW(), NOW()),
(1, 'Which testing approach focuses on user satisfaction?', '["Black-box testing", "White-box testing", "Acceptance testing", "Unit testing"]', 2, 'Acceptance testing validates if the system meets user requirements.', 'medium', true, NOW(), NOW()),
(1, 'What is the difference between error, defect, and failure?', '["They are the same", "Error is mistake, defect is issue found, failure is when it breaks", "All are bugs", "Only developers use these terms"]', 1, 'Error is human mistake, defect is issue in code, failure is when defect causes system to fail.', 'hard', true, NOW(), NOW()),
(1, 'Which testing level tests individual components?', '["Integration testing", "System testing", "Unit testing", "Acceptance testing"]', 2, 'Unit testing focuses on individual functions or methods.', 'easy', true, NOW(), NOW()),
(1, 'What is exploratory testing?', '["Scripted testing", "Unscripted testing based on experience", "Automated testing", "Performance testing"]', 1, 'Exploratory testing involves learning and testing simultaneously.', 'medium', true, NOW(), NOW()),
(1, 'Which is more important: testing or debugging?', '["Testing", "Debugging", "Both equally", "Neither"]', 2, 'Both are crucial - testing prevents bugs, debugging fixes them.', 'medium', true, NOW(), NOW()),
(1, 'What does "test coverage" measure?', '["Code quality", "How much code is tested", "Test execution time", "Bug count"]', 1, 'Test coverage indicates the percentage of code exercised by tests.', 'medium', true, NOW(), NOW());

-- Insert quiz questions for Module 2: Unit Testing
INSERT INTO quiz_questions (moduleID, question, options, correctAnswer, explanation, difficulty, active, createdAt, updatedAt) VALUES
(2, 'What does an assertion check in unit testing?', '["Code execution", "Expected vs actual results", "Code style", "Performance"]', 1, 'Assertions verify that the actual output matches expected results.', 'easy', true, NOW(), NOW()),
(2, 'Which is NOT a characteristic of good unit tests?', '["Fast execution", "Independent", "Test only one thing", "Test entire application"]', 3, 'Unit tests should focus on small, isolated units of code.', 'medium', true, NOW(), NOW()),
(2, 'What is mocking in unit testing?', '["Writing fake code", "Replacing dependencies with test doubles", "Ignoring tests", "Testing manually"]', 1, 'Mocking creates fake objects to isolate the code under test.', 'medium', true, NOW(), NOW()),
(2, 'Which testing framework is commonly used for JavaScript unit testing?', '["Jest", "Selenium", "Postman", "JMeter"]', 0, 'Jest is a popular JavaScript testing framework.', 'easy', true, NOW(), NOW()),
(2, 'What is the AAA pattern in unit testing?', '["Arrange, Act, Assert", "Analyze, Apply, Assess", "Accept, Approve, Assign", "None of the above"]', 0, 'AAA stands for Arrange (setup), Act (execute), Assert (verify).', 'medium', true, NOW(), NOW()),
(2, 'Why should unit tests be isolated?', '["Faster execution", "Easier debugging", "Both A and B", "To test more code"]', 2, 'Isolation makes tests reliable and easier to debug.', 'medium', true, NOW(), NOW()),
(2, 'What is code coverage in unit testing?', '["Lines of code written", "Percentage of code executed by tests", "Test file size", "Number of assertions"]', 1, 'Code coverage measures how much of the code is tested.', 'easy', true, NOW(), NOW()),
(2, 'Which is better for unit testing: integration or isolation?', '["Integration", "Isolation", "Both same", "Depends on project"]', 1, 'Isolation ensures tests focus on specific units without external dependencies.', 'hard', true, NOW(), NOW()),
(2, 'What should happen if a unit test fails?', '["Ignore it", "Fix the code or test", "Delete the test", "Change requirements"]', 1, 'Failing tests indicate issues that need to be addressed.', 'easy', true, NOW(), NOW()),
(2, 'How often should unit tests be run?', '["Once after coding", "After every change", "Weekly", "Monthly"]', 1, 'Frequent running catches issues early in development.', 'medium', true, NOW(), NOW());

-- Insert quiz questions for Module 3: Integration Testing
INSERT INTO quiz_questions (moduleID, question, options, correctAnswer, explanation, difficulty, active, createdAt, updatedAt) VALUES
(3, 'Integration testing focuses on:', '["Single functions", "Component interactions", "User interface", "Performance"]', 1, 'Integration testing verifies how different components work together.', 'easy', true, NOW(), NOW()),
(3, 'Which approach tests components one by one?', '["Big Bang", "Top-down", "Bottom-up", "Sandwich"]', 2, 'Bottom-up starts with lowest level components.', 'medium', true, NOW(), NOW()),
(3, 'What is "Big Bang" integration testing?', '["Testing one component", "Testing all at once", "Testing from top", "Testing interfaces"]', 1, 'Big Bang tests all components simultaneously.', 'medium', true, NOW(), NOW()),
(3, 'Which is tested in integration testing?', '["Individual methods", "Component communication", "UI elements", "Database queries"]', 1, 'Integration testing checks how components interact.', 'easy', true, NOW(), NOW()),
(3, 'What is a stub in integration testing?', '["Real component", "Fake component for testing", "Test data", "Error message"]', 1, 'Stubs simulate components that aren''t ready for testing.', 'medium', true, NOW(), NOW()),
(3, 'Why is integration testing important?', '["Finds unit bugs", "Finds interface bugs", "Tests performance", "Tests security"]', 1, 'Integration testing catches issues in component interactions.', 'easy', true, NOW(), NOW()),
(3, 'Which testing uses real components?', '["Stub testing", "Mock testing", "Top-down testing", "Bottom-up testing"]', 3, 'Bottom-up uses real low-level components.', 'hard', true, NOW(), NOW()),
(3, 'What is incremental integration testing?', '["Test all at once", "Test components gradually", "Test randomly", "Skip testing"]', 1, 'Incremental testing adds components step by step.', 'medium', true, NOW(), NOW()),
(3, 'Which finds more bugs: unit or integration testing?', '["Unit testing", "Integration testing", "Both equal", "Depends on code"]', 3, 'Both find different types of bugs.', 'medium', true, NOW(), NOW()),
(3, 'What is interface testing?', '["Testing UI", "Testing component connections", "Testing APIs", "Testing databases"]', 1, 'Interface testing checks how components communicate.', 'medium', true, NOW(), NOW());

-- Insert quiz questions for Module 4: UI/UX Testing
INSERT INTO quiz_questions (moduleID, question, options, correctAnswer, explanation, difficulty, active, createdAt, updatedAt) VALUES
(4, 'What is usability testing?', '["Code performance", "User experience testing", "Security testing", "Load testing"]', 1, 'Usability testing evaluates how easy the system is to use.', 'easy', true, NOW(), NOW()),
(4, 'Which tool is commonly used for UI testing?', '["Selenium", "Postman", "JMeter", "Wireshark"]', 0, 'Selenium automates web browser interactions.', 'easy', true, NOW(), NOW()),
(4, 'What does accessibility testing check?', '["Code quality", "Usability for disabled users", "Performance", "Security"]', 1, 'Accessibility testing ensures the system works for all users.', 'medium', true, NOW(), NOW()),
(4, 'Which is NOT a UI testing type?', '["Functional testing", "Visual testing", "Unit testing", "Cross-browser testing"]', 2, 'Unit testing tests code units, not UI.', 'medium', true, NOW(), NOW()),
(4, 'What is cross-browser testing?', '["Testing on one browser", "Testing on multiple browsers", "Testing server-side", "Testing mobile only"]', 1, 'Cross-browser testing ensures compatibility across browsers.', 'easy', true, NOW(), NOW()),
(4, 'Why test responsive design?', '["Better performance", "Works on all devices", "Cheaper development", "Easier maintenance"]', 1, 'Responsive design ensures good experience on all screen sizes.', 'medium', true, NOW(), NOW()),
(4, 'What is visual regression testing?', '["Testing colors", "Detecting UI changes", "Testing images", "Testing animations"]', 1, 'Visual regression detects unintended UI changes.', 'hard', true, NOW(), NOW()),
(4, 'Which is important for UX testing?', '["User feedback", "Code coverage", "Server response time", "Database queries"]', 0, 'UX testing focuses on user satisfaction and feedback.', 'easy', true, NOW(), NOW()),
(4, 'What is A/B testing?', '["Testing two versions", "Testing security", "Load testing", "Unit testing"]', 0, 'A/B testing compares two UI versions with users.', 'medium', true, NOW(), NOW()),
(4, 'Why test for accessibility?', '["Legal requirements", "Better user experience", "Both A and B", "Performance improvement"]', 2, 'Accessibility is both legal and improves user experience.', 'medium', true, NOW(), NOW());

-- Insert quiz questions for Module 5: API Testing
INSERT INTO quiz_questions (moduleID, question, options, correctAnswer, explanation, difficulty, active, createdAt, updatedAt) VALUES
(5, 'What does REST stand for?', '["Really Easy Simple Transfer", "Representational State Transfer", "Remote Execution Service Technology", "Rapid Endpoint Service Testing"]', 1, 'REST is an architectural style for web services.', 'easy', true, NOW(), NOW()),
(5, 'Which HTTP method retrieves data?', '["POST", "PUT", "GET", "DELETE"]', 2, 'GET method retrieves data from the server.', 'easy', true, NOW(), NOW()),
(5, 'What is an API endpoint?', '["Database table", "URL for API access", "User interface", "Server hardware"]', 1, 'An endpoint is the URL where API requests are made.', 'easy', true, NOW(), NOW()),
(5, 'Which tool is used for API testing?', '["Selenium", "Postman", "JMeter", "All of the above"]', 3, 'Postman, JMeter, and others are used for API testing.', 'easy', true, NOW(), NOW()),
(5, 'What is status code 200?', '["Server error", "Success", "Client error", "Not found"]', 1, '200 indicates successful request processing.', 'easy', true, NOW(), NOW()),
(5, 'What is JSON in APIs?', '["JavaScript Object Notation", "Java Simple Object Network", "JSON Simple Object Notation", "JavaScript Simple Object Network"]', 0, 'JSON is a data format for API responses.', 'easy', true, NOW(), NOW()),
(5, 'What is API authentication?', '["User login", "Verifying API access", "Database connection", "Server setup"]', 1, 'Authentication ensures only authorized access to APIs.', 'medium', true, NOW(), NOW()),
(5, 'What is rate limiting?', '["API speed", "Request frequency control", "Data size limit", "Response time"]', 1, 'Rate limiting controls how often API can be called.', 'medium', true, NOW(), NOW()),
(5, 'What is API versioning?', '["Code versions", "API evolution management", "User versions", "Server versions"]', 1, 'Versioning manages API changes without breaking clients.', 'medium', true, NOW(), NOW()),
(5, 'Why test API responses?', '["Check data format", "Verify functionality", "Both A and B", "Test UI"]', 2, 'API testing validates both data and functionality.', 'easy', true, NOW(), NOW());

-- Insert quiz questions for Module 6: Performance Testing
INSERT INTO quiz_questions (moduleID, question, options, correctAnswer, explanation, difficulty, active, createdAt, updatedAt) VALUES
(6, 'What is load testing?', '["Test with no users", "Test with normal load", "Test with maximum load", "Test security"]', 2, 'Load testing simulates maximum expected usage.', 'easy', true, NOW(), NOW()),
(6, 'What is stress testing?', '["Normal testing", "Beyond normal capacity", "UI testing", "Security testing"]', 1, 'Stress testing pushes systems beyond normal limits.', 'medium', true, NOW(), NOW()),
(6, 'What is response time?', '["Server uptime", "Time for request response", "Data size", "User count"]', 1, 'Response time measures how quickly the system responds.', 'easy', true, NOW(), NOW()),
(6, 'What is throughput?', '["Response time", "Requests processed per time", "Server memory", "Database size"]', 1, 'Throughput measures system processing capacity.', 'medium', true, NOW(), NOW()),
(6, 'Which tool is used for performance testing?', '["Postman", "JMeter", "Selenium", "Git"]', 1, 'JMeter is a popular performance testing tool.', 'easy', true, NOW(), NOW()),
(6, 'What is bottleneck in performance?', '["Fast component", "Slow component limiting performance", "User interface", "Database"]', 1, 'Bottleneck is the component slowing down the system.', 'medium', true, NOW(), NOW()),
(6, 'What is scalability testing?', '["Test with few users", "Test performance growth", "Test security", "Test UI"]', 1, 'Scalability testing checks performance as load increases.', 'hard', true, NOW(), NOW()),
(6, 'What is concurrent users?', '["Total users", "Users active simultaneously", "Registered users", "Online users"]', 1, 'Concurrent users are those using the system at the same time.', 'medium', true, NOW(), NOW()),
(6, 'Why monitor memory usage?', '["Check storage", "Detect memory leaks", "Count users", "Test security"]', 1, 'Memory monitoring helps identify performance issues.', 'medium', true, NOW(), NOW()),
(6, 'What is baseline in performance testing?', '["Starting point", "Current performance measure", "Target performance", "All of the above"]', 1, 'Baseline is the current performance level for comparison.', 'medium', true, NOW(), NOW());

-- Insert quiz questions for Module 7: Security Testing
INSERT INTO quiz_questions (moduleID, question, options, correctAnswer, explanation, difficulty, active, createdAt, updatedAt) VALUES
(7, 'What is penetration testing?', '["Writing code", "Simulating attacks", "Testing performance", "Testing UI"]', 1, 'Pen testing simulates real-world attacks to find vulnerabilities.', 'easy', true, NOW(), NOW()),
(7, 'What is SQL injection?', '["Database query", "Code injection attack", "Network attack", "Password attack"]', 1, 'SQL injection inserts malicious SQL into queries.', 'medium', true, NOW(), NOW()),
(7, 'What is encryption?', '["Data compression", "Data scrambling for security", "Data deletion", "Data copying"]', 1, 'Encryption protects data by making it unreadable without a key.', 'easy', true, NOW(), NOW()),
(7, 'What is authentication?', '["User identification", "Data encryption", "Network security", "Code testing"]', 0, 'Authentication verifies user identity.', 'easy', true, NOW(), NOW()),
(7, 'What is a vulnerability?', '["Security feature", "Weakness that can be exploited", "Strong protection", "User password"]', 1, 'Vulnerability is a weakness attackers can use.', 'medium', true, NOW(), NOW()),
(7, 'What is OWASP?', '["Security tool", "Security standards organization", "Testing framework", "Database"]', 1, 'OWASP provides web application security guidance.', 'medium', true, NOW(), NOW()),
(7, 'What is XSS attack?', '["Cross-site scripting", "XML security", "Cross-server attack", "Extended security"]', 0, 'XSS injects malicious scripts into web pages.', 'hard', true, NOW(), NOW()),
(7, 'Why test for security?', '["Find bugs", "Protect against attacks", "Both A and B", "Improve performance"]', 2, 'Security testing prevents data breaches and attacks.', 'easy', true, NOW(), NOW()),
(7, 'What is a firewall?', '["Hardware protection", "Network security barrier", "Software tool", "All of the above"]', 1, 'Firewall controls network traffic for security.', 'easy', true, NOW(), NOW()),
(7, 'What is two-factor authentication?', '["Two passwords", "Password + second verification", "Two users", "Two devices"]', 1, '2FA requires password plus another verification method.', 'easy', true, NOW(), NOW());

-- Insert quiz questions for Module 8: Database Testing
INSERT INTO quiz_questions (moduleID, question, options, correctAnswer, explanation, difficulty, active, createdAt, updatedAt) VALUES
(8, 'What is database testing?', '["Test database server", "Test data storage and retrieval", "Test queries only", "Test UI"]', 1, 'Database testing validates data operations and integrity.', 'easy', true, NOW(), NOW()),
(8, 'What is data integrity?', '["Data size", "Data accuracy and consistency", "Data speed", "Data security"]', 1, 'Data integrity ensures data is accurate and consistent.', 'medium', true, NOW(), NOW()),
(8, 'What is ACID in databases?', '["Atomicity, Consistency, Isolation, Durability", "Access, Control, Integrity, Data", "Automated, Consistent, Isolated, Durable", "None of the above"]', 0, 'ACID properties ensure reliable database transactions.', 'hard', true, NOW(), NOW()),
(8, 'What is normalization?', '["Data compression", "Organizing data to reduce redundancy", "Data encryption", "Data backup"]', 1, 'Normalization eliminates data redundancy and improves integrity.', 'medium', true, NOW(), NOW()),
(8, 'What is a primary key?', '["First column", "Unique identifier for records", "Password field", "Index field"]', 1, 'Primary key uniquely identifies each database record.', 'easy', true, NOW(), NOW()),
(8, 'What is referential integrity?', '["Data references", "Relationships between tables", "Data types", "Data size"]', 1, 'Referential integrity maintains valid relationships between tables.', 'medium', true, NOW(), NOW()),
(8, 'What is a foreign key?', '["External key", "Links to primary key in another table", "Security key", "Index key"]', 1, 'Foreign key creates relationships between database tables.', 'easy', true, NOW(), NOW()),
(8, 'Why test database constraints?', '["Check data types", "Ensure data validity", "Both A and B", "Test performance"]', 2, 'Constraints ensure data meets business rules.', 'medium', true, NOW(), NOW()),
(8, 'What is database migration testing?', '["Moving servers", "Testing schema changes", "Data backup", "Performance testing"]', 1, 'Migration testing validates database structure changes.', 'hard', true, NOW(), NOW()),
(8, 'What is ETL testing?', '["Extract, Transform, Load", "Error, Test, Log", "Execute, Test, Load", "None of the above"]', 0, 'ETL testing validates data extraction, transformation, and loading.', 'medium', true, NOW(), NOW());
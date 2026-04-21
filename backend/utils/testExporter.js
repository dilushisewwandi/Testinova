// testExporter.js

// FUNCTION 1: Convert code from one framework to another
function convertFormat(generatedCode, sourceFramework, targetFramework) {
  if (!generatedCode) return generatedCode;
  
  // If same framework, no conversion needed
  if (sourceFramework === targetFramework) {
    return generatedCode;
  }

  let convertedCode = generatedCode;

  // JEST → PYTEST conversion
  if (sourceFramework === "jest" && targetFramework === "pytest") {
    convertedCode = jestToPytest(generatedCode);
  }
  // JEST → JUNIT conversion
  else if (sourceFramework === "jest" && targetFramework === "junit") {
    convertedCode = jestToJunit(generatedCode);
  }
  // PYTEST → JEST conversion
  else if (sourceFramework === "pytest" && targetFramework === "jest") {
    convertedCode = pytestToJest(generatedCode);
  }
  // PYTEST → JUNIT conversion
  else if (sourceFramework === "pytest" && targetFramework === "junit") {
    convertedCode = pytestToJunit(generatedCode);
  }
  // Add more conversions as needed

  return convertedCode;
}

// CONVERSION: Jest → Pytest
function jestToPytest(code) {
  let converted = code;
  
  // Replace describe with class
  converted = converted.replace(
    /describe\(['"`](.*?)['"`],\s*\(\)\s*=>\s*\{/g,
    "class Test$1:\n"
  );
  
  // Replace test with def
  converted = converted.replace(
    /test\(['"`](.*?)['"`],\s*\(\)\s*=>\s*\{/g,
    "    def test_$1(self):\n"
  );
  
  // Replace expect().toBe() with assert ==
  converted = converted.replace(
    /expect\((.*?)\)\.toBe\((.*?)\)/g,
    "assert $1 == $2"
  );
  
  // Replace expect().toEqual() with assert ==
  converted = converted.replace(
    /expect\((.*?)\)\.toEqual\((.*?)\)/g,
    "assert $1 == $2"
  );

  // Replace expect().not.toBe() with assert !=
  converted = converted.replace(
    /expect\((.*?)\)\.not\.toBe\((.*?)\)/g,
    "assert $1 != $2"
  );

  // Close braces cleanup
  converted = converted.replace(/\s*\}\s*\);?\s*$/gm, "");
  converted = converted.replace(/\s*\}\s*$/gm, "");

  return converted;
}

// CONVERSION: Jest → JUnit
function jestToJunit(code) {
  let converted = code;
  
  // Replace describe with class
  converted = converted.replace(
    /describe\(['"`](.*?)['"`],\s*\(\)\s*=>\s*\{/g,
    "public class Test$1 {\n"
  );
  
  // Replace test with @Test method
  converted = converted.replace(
    /test\(['"`](.*?)['"`],\s*\(\)\s*=>\s*\{/g,
    "@Test\n    public void test$1() {\n"
  );
  
  // Replace expect().toBe() with assertTrue/assertEquals
  converted = converted.replace(
    /expect\((.*?)\)\.toBe\(true\)/g,
    "assertTrue($1)"
  );
  
  converted = converted.replace(
    /expect\((.*?)\)\.toBe\(false\)/g,
    "assertFalse($1)"
  );
  
  converted = converted.replace(
    /expect\((.*?)\)\.toBe\((.*?)\)/g,
    "assertEquals($2, $1)"
  );

  // Close braces
  converted = converted.replace(/\s*\}\s*\);?\s*$/gm, "    }");

  return converted;
}

// CONVERSION: Pytest → Jest (similar logic, reversed)
function pytestToJest(code) {
  let converted = code;
  
  // Replace class Test with describe
  converted = converted.replace(
    /class (Test\w+):/g,
    "describe('$1', () => {"
  );
  
  // Replace def test_ with test(
  converted = converted.replace(
    /def (test_\w+)\(self\):/g,
    "test('$1', () => {"
  );
  
  // Replace assert with expect
  converted = converted.replace(
    /assert (.*?) == (.*)/g,
    "expect($1).toBe($2)"
  );
  
  converted = converted.replace(
    /assert (.*?) != (.*)/g,
    "expect($1).not.toBe($2)"
  );

  // Add closing braces
  converted = converted.replace(/^(\s{4}})$/gm, "    });\n  }");
  converted += "\n});";

  return converted;
}

// CONVERSION: Pytest → JUnit
function pytestToJunit(code) {
  let converted = code;
  
  // Replace class with JUnit class
  converted = converted.replace(
    /class (Test\w+):/g,
    "public class $1 {"
  );
  
  // Replace def test with @Test method
  converted = converted.replace(
    /def (test_\w+)\(self\):/g,
    "@Test\n    public void $1() {"
  );
  
  // Replace assert with assertEquals/assertTrue
  converted = converted.replace(
    /assert (.*?) == (.*)/g,
    "assertEquals($2, $1)"
  );

  converted = converted.replace(/^(\s{4}})$/gm, "    }");
  converted += "\n}";

  return converted;
}

// FUNCTION 2: Build complete file content with imports
function buildFileContent(code, targetFramework) {
  let fileContent = "";

  if (targetFramework === "jest") {
    fileContent = buildJestFile(code);
  } else if (targetFramework === "pytest") {
    fileContent = buildPytestFile(code);
  } else if (targetFramework === "junit") {
    fileContent = buildJunitFile(code);
  } else if (targetFramework === "selenium") {
    fileContent = buildSeleniumFile(code);
  } else if (targetFramework === "cypress") {
    fileContent = buildCypressFile(code);
  } else if (targetFramework === "playwright") {
    fileContent = buildPlaywrightFile(code);
  } else {
    fileContent = code; // Fallback
  }

  return fileContent;
}

// BUILD: Jest file with proper structure
function buildJestFile(code) {
  const imports = `// Auto-generated test file
// Framework: Jest
// Generated by Testinova

describe('Generated Test Suite', () => {
${code}
});
`;
  return imports;
}

// BUILD: Pytest file with proper structure
function buildPytestFile(code) {
  const imports = `# Auto-generated test file
# Framework: Pytest
# Generated by Testinova

import pytest

${code}

if __name__ == "__main__":
    pytest.main([__file__, "-v"])
`;
  return imports;
}

// BUILD: JUnit file with proper structure
function buildJunitFile(code) {
  const imports = `// Auto-generated test file
// Framework: JUnit
// Generated by Testinova

import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;

${code}
`;
  return imports;
}

// BUILD: Selenium file
function buildSeleniumFile(code) {
  const imports = `# Auto-generated test file
# Framework: Selenium
# Generated by Testinova

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pytest

${code}
`;
  return imports;
}

// BUILD: Cypress file
function buildCypressFile(code) {
  const imports = `// Auto-generated test file
// Framework: Cypress
// Generated by Testinova

describe('Generated Test Suite', () => {
${code}
});
`;
  return imports;
}

// BUILD: Playwright file
function buildPlaywrightFile(code) {
  const imports = `// Auto-generated test file
// Framework: Playwright
// Generated by Testinova

const { test, expect } = require('@playwright/test');

${code}
`;
  return imports;
}

// FUNCTION 3: Get file extension
function getFileExtension(framework) {
  const extensions = {
    jest: "js",
    cypress: "js",
    playwright: "js",
    pytest: "py",
    selenium: "py",
    junit: "java",
  };

  return extensions[framework] || "txt";
}

// FUNCTION 4: Get MIME type for download
function getMimeType(framework) {
  const mimeTypes = {
    jest: "application/javascript",
    cypress: "application/javascript",
    playwright: "application/javascript",
    pytest: "text/plain",
    selenium: "text/plain",
    junit: "text/plain",
  };

  return mimeTypes[framework] || "application/octet-stream";
}

// EXPORT all functions
export {
  convertFormat,
  buildFileContent,
  getFileExtension,
  getMimeType,
};// testExporter.js

// FUNCTION 1: Convert code from one framework to another
function convertFormat(generatedCode, sourceFramework, targetFramework) {
  if (!generatedCode) return generatedCode;
  
  // If same framework, no conversion needed
  if (sourceFramework === targetFramework) {
    return generatedCode;
  }

  let convertedCode = generatedCode;

  // JEST → PYTEST conversion
  if (sourceFramework === "jest" && targetFramework === "pytest") {
    convertedCode = jestToPytest(generatedCode);
  }
  // JEST → JUNIT conversion
  else if (sourceFramework === "jest" && targetFramework === "junit") {
    convertedCode = jestToJunit(generatedCode);
  }
  // PYTEST → JEST conversion
  else if (sourceFramework === "pytest" && targetFramework === "jest") {
    convertedCode = pytestToJest(generatedCode);
  }
  // PYTEST → JUNIT conversion
  else if (sourceFramework === "pytest" && targetFramework === "junit") {
    convertedCode = pytestToJunit(generatedCode);
  }
  // Add more conversions as needed

  return convertedCode;
}

// // CONVERSION: Jest → Pytest
// function jestToPytest(code) {
//   let converted = code;
  
//   // Replace describe with class
//   converted = converted.replace(
//     /describe\(['"`](.*?)['"`],\s*\(\)\s*=>\s*\{/g,
//     "class Test$1:\n"
//   );
  
//   // Replace test with def
//   converted = converted.replace(
//     /test\(['"`](.*?)['"`],\s*\(\)\s*=>\s*\{/g,
//     "    def test_$1(self):\n"
//   );
  
//   // Replace expect().toBe() with assert ==
//   converted = converted.replace(
//     /expect\((.*?)\)\.toBe\((.*?)\)/g,
//     "assert $1 == $2"
//   );
  
//   // Replace expect().toEqual() with assert ==
//   converted = converted.replace(
//     /expect\((.*?)\)\.toEqual\((.*?)\)/g,
//     "assert $1 == $2"
//   );

//   // Replace expect().not.toBe() with assert !=
//   converted = converted.replace(
//     /expect\((.*?)\)\.not\.toBe\((.*?)\)/g,
//     "assert $1 != $2"
//   );

//   // Close braces cleanup
//   converted = converted.replace(/\s*\}\s*\);?\s*$/gm, "");
//   converted = converted.replace(/\s*\}\s*$/gm, "");

//   return converted;
// }

// // CONVERSION: Jest → JUnit
// function jestToJunit(code) {
//   let converted = code;
  
//   // Replace describe with class
//   converted = converted.replace(
//     /describe\(['"`](.*?)['"`],\s*\(\)\s*=>\s*\{/g,
//     "public class Test$1 {\n"
//   );
  
//   // Replace test with @Test method
//   converted = converted.replace(
//     /test\(['"`](.*?)['"`],\s*\(\)\s*=>\s*\{/g,
//     "@Test\n    public void test$1() {\n"
//   );
  
//   // Replace expect().toBe() with assertTrue/assertEquals
//   converted = converted.replace(
//     /expect\((.*?)\)\.toBe\(true\)/g,
//     "assertTrue($1)"
//   );
  
//   converted = converted.replace(
//     /expect\((.*?)\)\.toBe\(false\)/g,
//     "assertFalse($1)"
//   );
  
//   converted = converted.replace(
//     /expect\((.*?)\)\.toBe\((.*?)\)/g,
//     "assertEquals($2, $1)"
//   );

//   // Close braces
//   converted = converted.replace(/\s*\}\s*\);?\s*$/gm, "    }");

//   return converted;
// }

// // CONVERSION: Pytest → Jest (similar logic, reversed)
// function pytestToJest(code) {
//   let converted = code;
  
//   // Replace class Test with describe
//   converted = converted.replace(
//     /class (Test\w+):/g,
//     "describe('$1', () => {"
//   );
  
//   // Replace def test_ with test(
//   converted = converted.replace(
//     /def (test_\w+)\(self\):/g,
//     "test('$1', () => {"
//   );
  
//   // Replace assert with expect
//   converted = converted.replace(
//     /assert (.*?) == (.*)/g,
//     "expect($1).toBe($2)"
//   );
  
//   converted = converted.replace(
//     /assert (.*?) != (.*)/g,
//     "expect($1).not.toBe($2)"
//   );

//   // Add closing braces
//   converted = converted.replace(/^(\s{4}})$/gm, "    });\n  }");
//   converted += "\n});";

//   return converted;
// }

// // CONVERSION: Pytest → JUnit
// function pytestToJunit(code) {
//   let converted = code;
  
//   // Replace class with JUnit class
//   converted = converted.replace(
//     /class (Test\w+):/g,
//     "public class $1 {"
//   );
  
//   // Replace def test with @Test method
//   converted = converted.replace(
//     /def (test_\w+)\(self\):/g,
//     "@Test\n    public void $1() {"
//   );
  
//   // Replace assert with assertEquals/assertTrue
//   converted = converted.replace(
//     /assert (.*?) == (.*)/g,
//     "assertEquals($2, $1)"
//   );

//   converted = converted.replace(/^(\s{4}})$/gm, "    }");
//   converted += "\n}";

//   return converted;
// }

// // FUNCTION 2: Build complete file content with imports
// function buildFileContent(code, targetFramework) {
//   let fileContent = "";

//   if (targetFramework === "jest") {
//     fileContent = buildJestFile(code);
//   } else if (targetFramework === "pytest") {
//     fileContent = buildPytestFile(code);
//   } else if (targetFramework === "junit") {
//     fileContent = buildJunitFile(code);
//   } else if (targetFramework === "selenium") {
//     fileContent = buildSeleniumFile(code);
//   } else if (targetFramework === "cypress") {
//     fileContent = buildCypressFile(code);
//   } else if (targetFramework === "playwright") {
//     fileContent = buildPlaywrightFile(code);
//   } else {
//     fileContent = code; // Fallback
//   }

//   return fileContent;
// }

// // BUILD: Jest file with proper structure
// function buildJestFile(code) {
//   const imports = `// Auto-generated test file
// // Framework: Jest
// // Generated by Testinova

// describe('Generated Test Suite', () => {
// ${code}
// });
// `;
//   return imports;
// }

// // BUILD: Pytest file with proper structure
// function buildPytestFile(code) {
//   const imports = `# Auto-generated test file
// # Framework: Pytest
// # Generated by Testinova

// import pytest

// ${code}

// if __name__ == "__main__":
//     pytest.main([__file__, "-v"])
// `;
//   return imports;
// }

// // BUILD: JUnit file with proper structure
// function buildJunitFile(code) {
//   const imports = `// Auto-generated test file
// // Framework: JUnit
// // Generated by Testinova

// import org.junit.Test;
// import org.junit.Before;
// import org.junit.After;
// import static org.junit.Assert.*;

// ${code}
// `;
//   return imports;
// }

// // BUILD: Selenium file
// function buildSeleniumFile(code) {
//   const imports = `# Auto-generated test file
// # Framework: Selenium
// # Generated by Testinova

// from selenium import webdriver
// from selenium.webdriver.common.by import By
// from selenium.webdriver.support.ui import WebDriverWait
// from selenium.webdriver.support import expected_conditions as EC
// import pytest

// ${code}
// `;
//   return imports;
// }

// // BUILD: Cypress file
// function buildCypressFile(code) {
//   const imports = `// Auto-generated test file
// // Framework: Cypress
// // Generated by Testinova

// describe('Generated Test Suite', () => {
// ${code}
// });
// `;
//   return imports;
// }

// // BUILD: Playwright file
// function buildPlaywrightFile(code) {
//   const imports = `// Auto-generated test file
// // Framework: Playwright
// // Generated by Testinova

// const { test, expect } = require('@playwright/test');

// ${code}
// `;
//   return imports;
// }

// // FUNCTION 3: Get file extension
// function getFileExtension(framework) {
//   const extensions = {
//     jest: "js",
//     cypress: "js",
//     playwright: "js",
//     pytest: "py",
//     selenium: "py",
//     junit: "java",
//   };

//   return extensions[framework] || "txt";
// }

// // FUNCTION 4: Get MIME type for download
// function getMimeType(framework) {
//   const mimeTypes = {
//     jest: "application/javascript",
//     cypress: "application/javascript",
//     playwright: "application/javascript",
//     pytest: "text/plain",
//     selenium: "text/plain",
//     junit: "text/plain",
//   };

//   return mimeTypes[framework] || "application/octet-stream";
// }

// // EXPORT all functions
// module.exports = {
//   convertFormat,
//   buildFileContent,
//   getFileExtension,
//   getMimeType,
// };
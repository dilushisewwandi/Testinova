// export function calculateDeveloperScore(code, framework) {
//   let score = 0;
//   let feedback = [];

//   const lowerCode = code.toLowerCase();

//   //assertion Strength
//   const assertionMatches = code.match(/assert|expect|toBe|assertEquals/g) || [];
//   const assertionCount = assertionMatches.length;

//   let assertionScore = 0;
//   if (assertionCount >= 3) {
//     assertionScore = 25;
//     score += 25;

//   } else if (assertionCount > 0) {
//     assertionScore = 15;
//     score += 15;
//     feedback.push({type: "warning", message:"Increase number of assertions." });
//   } else {
//     assertionScore = 0;
//     feedback.push({
//     type: "error",
//     message: "No assertions found. Add assertions like expect(result).toBe(value)."
//   });
//   }

//   //test Diversity
//   const hasPositive = lowerCode.includes("valid");
//   const hasNegative = lowerCode.includes("invalid") || lowerCode.includes("error");
//   const hasBoundary = lowerCode.includes("boundary") || lowerCode.match(/\b0\b|\b1\b|\b100\b/);

//   let diversityScore = 0;
//   if (hasPositive) diversityScore += 8;
//   if (hasNegative) diversityScore += 8;
//   if (hasBoundary) diversityScore += 9;

//   score += diversityScore;

//   if (!hasPositive) feedback.push({type: "warning", message: "Positive test case missing."});
//   if (!hasNegative) feedback.push({type: "warning", message: "Negative test case missing."});
//   if (!hasBoundary) feedback.push({type: "warning", message: "Boundary test case missing."});

//   //framework Structure Check
//   let frameworkScore = 0;
//   if (framework === "jest" && code.includes("describe") && code.includes("test(")) {
//     frameworkScore = 20;
//     score += 20;
//   } else if (framework === "pytest" && code.includes("def test_")) {
//     frameworkScore = 20;
//     score += 20;
//   } else if (framework === "junit" && code.includes("@Test")) {
//     frameworkScore = 20;
//     score += 20;
//   } else {
//     frameworkScore = 0;
//     feedback.push({type:"warning", message: "Framework structure may be incorrect."});
//   }

//   //code Richness
//   const lineCount = code.split("\n").length;
//   let lengthScore = 0;
//   if (lineCount > 15) {
//     lengthScore = 15;
//     score += 15;
//   } else {
//     lengthScore = 0;
//     feedback.push({ type: "warning", message: "Test code is too short." });
//   }

//   //formatting Quality
//   let formattingScore = 0;
//   if (code.includes("{") || code.includes(":")) {
//     formattingScore = 15;
//     score += 15;
//   }else{
//     formattingScore = 0;
//     feedback.push({type:"warning", message:"Formatting may be incorrect."})
//   }

//   const breakdown = {
//     assertions: assertionScore,
//     diversity: diversityScore,
//     structure: frameworkScore,
//     length: lengthScore,
//     formatting: formattingScore,
//   };

//   return {
//     score: Math.min(score, 100),
//     feedback,
//     breakdown,
//   };
// }

// // QA scoring
// export function calculateQAScore(code) {
//   let score = 0;
//   let coverage = 0;
//   let feedback = [];

//   const testCases = (code.match(/it\(|test\(|@Test/g) || []).length;

//   //test case count
//   if (testCases >= 3) {
//     score += 30;
//     coverage += 40;
//   } else {
//     feedback.push({
//       type: "warning",
//       message: "Not enough test cases generated."
//     });
//   }

//   //UI interaction coverage
//   const hasInteraction =
//     code.includes("click") ||
//     code.includes("sendKeys") ||
//     code.includes("navigate");

//   if (hasInteraction) {
//     score += 30;
//     coverage += 30;
//   } else {
//     feedback.push({
//       type: "warning",
//       message: "UI interaction steps missing."
//     });
//   }

//   //assertions
//   if (code.includes("assert")) {
//     score += 40;
//     coverage += 30;
//   } else {
//     feedback.push({
//       type: "error",
//       message: "Assertions missing in test."
//     });
//   }

//   return {
//     score: Math.min(score, 100),
//     // coverage: Math.min(coverage, 100),
//     coverage,
//     feedback
//   };
// }





export function calculateDeveloperScore(code, framework) {
  let score = 0;
  let feedback = [];
  let deductions = [];
  const lowerCode = code.toLowerCase();

  // ── Assertion Strength ─────────────────────────────────────
  const assertionMatches = code.match(
    /assert\s+\w|expect\(|assertEquals|assertTrue|assertFalse|assertThrows|assertRaises/g
  ) || [];
  const assertionCount = assertionMatches.length;

  // Also count pytest.raises as assertions
  const raisesCount = (code.match(/pytest\.raises/g) || []).length;
  const totalAssertions = assertionCount + raisesCount;

  let assertionScore = 0;
  if (totalAssertions >= 5) {
    assertionScore = 25;
    score += 25;
  } else if (totalAssertions >= 3) {
    assertionScore = 18;
    score += 18;
    feedback.push({
      type: "info",
      message: `Found ${totalAssertions} assertions. Adding more improves coverage.`
    });
  } else if (totalAssertions > 0) {
    assertionScore = 10;
    score += 10;
    feedback.push({
      type: "warning",
      message: `Only ${totalAssertions} assertion(s) found. Aim for at least 5.`
    });
  } else {
    assertionScore = 0;
    feedback.push({
      type: "error",
      message: "No assertions found. Tests need assertions to verify behaviour."
    });
  }

  // ── Test Diversity ──────────────────────────────────────────
  const hasPositive =
    lowerCode.includes("valid") ||
    lowerCode.includes("correct") ||
    lowerCode.includes("success") ||
    lowerCode.includes("test_valid") ||
    lowerCode.includes("test_correct");

  const hasNegative =
    lowerCode.includes("invalid") ||
    lowerCode.includes("error") ||
    lowerCode.includes("fail") ||
    lowerCode.includes("test_invalid") ||
    lowerCode.includes("test_error") ||
    lowerCode.includes("raises_error") ||
    lowerCode.includes("pytest.raises") ||
    lowerCode.includes("tothrow") ||
    lowerCode.includes("assertthrows");

  const hasBoundary =
    lowerCode.includes("boundary") ||
    lowerCode.includes("edge") ||
    lowerCode.includes("minimum") ||
    lowerCode.includes("maximum") ||
    lowerCode.includes("test_boundary") ||
    lowerCode.includes("test_min") ||
    lowerCode.includes("test_max") ||
    /\b0\b/.test(lowerCode) ||
    /\b-1\b/.test(lowerCode) ||
    /\b100\b/.test(lowerCode) ||
    /\b101\b/.test(lowerCode);

  let diversityScore = 0;
  if (hasPositive) diversityScore += 9;
  if (hasNegative) diversityScore += 9;
  if (hasBoundary) diversityScore += 7;
  score += diversityScore;

  if (!hasPositive) feedback.push({
    type: "warning",
    message: "No positive test cases detected. Add tests for valid inputs."
  });
  if (!hasNegative) feedback.push({
    type: "warning",
    message: "No negative test cases detected. Add tests for invalid inputs."
  });
  if (!hasBoundary) feedback.push({
    type: "warning",
    message: "No boundary tests detected. Test edge values like 0, -1, max."
  });

  // ── Framework Structure & Quality ───────────────────────────
  let structureScore = 0;

  if (framework === "jest") {
    const hasDescribe = code.includes("describe(");
    const hasTest = code.includes("test(") || code.includes("it(");
    const hasExpect = code.includes("expect(");
    const hasToThrow = code.includes(".toThrow(");

    // Check for WRONG exception pattern in Jest
    const wrongExceptionPattern = code.match(
      /expect\s*\(\s*[\w.]+\s*\([^)]*\)\s*\)\s*\.\s*(toBe|toEqual)\s*\(\s*(Error|TypeError|ValueError)/
    );

    if (hasDescribe && hasTest && hasExpect) {
      structureScore = 20;
      score += 20;
      feedback.push({
        type: "info",
        message: "Good Jest structure with describe() and test() blocks."
      });
    } else if (hasTest && hasExpect) {
      structureScore = 14;
      score += 14;
      feedback.push({
        type: "info",
        message: "Consider wrapping tests in describe() blocks."
      });
    } else {
      structureScore = 0;
      feedback.push({
        type: "error",
        message: "Jest structure incorrect. Use test() and expect()."
      });
    }

    if (wrongExceptionPattern) {
      const deduction = 8;
      score = Math.max(0, score - deduction);
      structureScore = Math.max(0, structureScore - deduction);
      deductions.push({
        type: "error",
        message: "Incorrect exception testing. Use expect(() => func()).toThrow(Error) not expect(func()).toBe(Error)."
      });
    } else if (hasToThrow) {
      feedback.push({
        type: "info",
        message: "Correct use of .toThrow() for exception testing."
      });
    }

  } else if (framework === "pytest") {
    const testFunctions = (code.match(/def test_\w+/g) || []);
    const testFunctionCount = testFunctions.length;
    const hasRaises = code.includes("pytest.raises");

    // Detect WRONG exception pattern
    // assert func(x) == ValueError  OR  assert func(x) == SomeError
    const wrongExceptionPattern = code.match(
      /assert\s+[\w.]+\s*\([^)]*\)\s*==\s*(ValueError|TypeError|Exception|KeyError|IndexError|Error)/
    );

    // Detect all tests crammed into ONE function (anti-pattern)
    const allInOneTest = testFunctionCount === 1 &&
      totalAssertions >= 3;

    if (testFunctionCount >= 3) {
      structureScore = 20;
      score += 20;
      feedback.push({
        type: "info",
        message: `Good — ${testFunctionCount} separate test functions found.`
      });
    } else if (testFunctionCount >= 1) {
      structureScore = 12;
      score += 12;
      if (allInOneTest) {
        feedback.push({
          type: "warning",
          message: "All assertions are in one test function. Split into separate test functions for each scenario."
        });
      }
    } else {
      structureScore = 0;
      feedback.push({
        type: "error",
        message: "No pytest test functions found. Functions must start with test_."
      });
    }

    // Penalise wrong exception pattern
    if (wrongExceptionPattern && !hasRaises) {
      const deduction = 10;
      score = Math.max(0, score - deduction);
      structureScore = Math.max(0, structureScore - deduction);
      deductions.push({
        type: "error",
        message: "Incorrect exception testing detected. Use 'with pytest.raises(ValueError):' instead of 'assert func() == ValueError'."
      });
    } else if (hasRaises) {
      feedback.push({
        type: "info",
        message: "Correct use of pytest.raises() for exception testing."
      });
    }

    // Penalise if function catches its own exception (self-catching bug)
    const hasSelfCatch =
      code.includes("try:") &&
      code.includes("except ValueError") &&
      code.includes("return None");

    if (hasSelfCatch) {
      const deduction = 8;
      score = Math.max(0, score - deduction);
      deductions.push({
        type: "warning",
        message: "The function catches its own ValueError and returns None. This means pytest.raises() tests will fail at runtime."
      });
    }

  } else if (framework === "junit") {
    const hasTestAnnotation = code.includes("@Test");
    const hasAssertMethod =
      code.includes("assertEquals") ||
      code.includes("assertTrue") ||
      code.includes("assertThrows") ||
      code.includes("assertFalse");

    if (hasTestAnnotation && hasAssertMethod) {
      structureScore = 20;
      score += 20;
      feedback.push({
        type: "info",
        message: "Good JUnit structure with @Test and assertion methods."
      });
    } else if (hasTestAnnotation) {
      structureScore = 12;
      score += 12;
      feedback.push({
        type: "warning",
        message: "Add JUnit assertions like assertEquals or assertThrows."
      });
    } else {
      structureScore = 0;
      feedback.push({
        type: "error",
        message: "No @Test annotations found. Add @Test to each test method."
      });
    }
  }

  // ── Code Length / Richness ──────────────────────────────────
  const nonEmptyLines = code.split("\n").filter(
    line => line.trim().length > 0
  ).length;

  let lengthScore = 0;
  if (nonEmptyLines >= 30) {
    lengthScore = 15;
    score += 15;
  } else if (nonEmptyLines >= 15) {
    lengthScore = 10;
    score += 10;
    feedback.push({
      type: "info",
      message: `Test has ${nonEmptyLines} lines. More test cases would improve coverage.`
    });
  } else if (nonEmptyLines >= 8) {
    lengthScore = 5;
    score += 5;
    feedback.push({
      type: "warning",
      message: `Test is short (${nonEmptyLines} lines). Add more test scenarios.`
    });
  } else {
    lengthScore = 0;
    feedback.push({
      type: "error",
      message: "Test code is too short to be meaningful."
    });
  }

  // ── Formatting & Documentation ──────────────────────────────
  const hasProperBlocks =
    code.includes("{") || code.includes(":");
  const hasComments =
    code.includes("#") ||
    code.includes("//") ||
    code.includes("/*");
  const hasDocstring =
    code.includes('"""') || code.includes("'''");
  const hasMeaningfulNames =
    /test_\w{5,}/.test(code) ||
    /it\(['"][^'"]{10,}/.test(code);

  let formattingScore = 0;
  if (hasProperBlocks && hasComments && hasMeaningfulNames) {
    formattingScore = 15;
    score += 15;
  } else if (hasProperBlocks && (hasComments || hasDocstring)) {
    formattingScore = 12;
    score += 12;
    feedback.push({
      type: "info",
      message: "Good formatting. Consider using descriptive test names."
    });
  } else if (hasProperBlocks) {
    formattingScore = 8;
    score += 8;
    feedback.push({
      type: "info",
      message: "Add comments or docstrings to explain what each test verifies."
    });
  } else {
    formattingScore = 0;
    feedback.push({
      type: "warning",
      message: "Poor formatting. Add proper structure and comments."
    });
  }

  // ── Add deductions to feedback ──────────────────────────────
  feedback = [...deductions, ...feedback];

  // ── Build Breakdown ─────────────────────────────────────────
  const breakdown = {
    assertions: assertionScore,
    diversity: diversityScore,
    structure: structureScore,
    length: lengthScore,
    formatting: formattingScore,
  };

  return {
    score: Math.min(Math.max(score, 0), 100),
    feedback,
    breakdown,
  };
}


// ── QA Scoring ────────────────────────────────────────────────
export function calculateQAScore(code) {
  let score = 0;
  let coverage = 0;
  let feedback = [];
  const lowerCode = code.toLowerCase();

  // Test case count
  const testCases = (
    code.match(/it\(|test\(|@Test|def test_/g) || []
  ).length;

  let testCountScore = 0;
  if (testCases >= 4) {
    testCountScore = 30;
    score += 30;
    coverage += 40;
    feedback.push({
      type: "info",
      message: `Good — ${testCases} test cases found.`
    });
  } else if (testCases >= 2) {
    testCountScore = 20;
    score += 20;
    coverage += 25;
    feedback.push({
      type: "warning",
      message: `Only ${testCases} test cases. Add more scenarios for better coverage.`
    });
  } else {
    feedback.push({
      type: "error",
      message: "Not enough test cases. Add at least 3 test scenarios."
    });
  }

  // UI interaction coverage
  const hasClick =
    lowerCode.includes("click") ||
    lowerCode.includes(".click(");
  const hasFill =
    lowerCode.includes("sendkeys") ||
    lowerCode.includes(".type(") ||
    lowerCode.includes(".fill(");
  const hasNavigation =
    lowerCode.includes("navigate") ||
    lowerCode.includes("goto") ||
    lowerCode.includes("visit") ||
    lowerCode.includes("cy.visit") ||
    lowerCode.includes("page.goto");
  const hasWait =
    lowerCode.includes("wait") ||
    lowerCode.includes("webdriverwait") ||
    lowerCode.includes("tobevisible");

  let interactionScore = 0;
  const interactionCount = [
    hasClick, hasFill, hasNavigation, hasWait
  ].filter(Boolean).length;

  if (interactionCount >= 3) {
    interactionScore = 30;
    score += 30;
    coverage += 30;
  } else if (interactionCount >= 2) {
    interactionScore = 20;
    score += 20;
    coverage += 20;
    feedback.push({
      type: "info",
      message: "Good UI interactions. Consider adding wait conditions."
    });
  } else if (interactionCount >= 1) {
    interactionScore = 10;
    score += 10;
    coverage += 10;
    feedback.push({
      type: "warning",
      message: "Limited UI interactions. Add click, fill and navigation actions."
    });
  } else {
    feedback.push({
      type: "error",
      message: "No UI interaction steps found. Add click, sendKeys or navigate actions."
    });
  }

  // Assertions
  const hasAssertions =
    lowerCode.includes("assert") ||
    lowerCode.includes("expect(") ||
    lowerCode.includes("should(") ||
    lowerCode.includes("tobevisible") ||
    lowerCode.includes("tocontaintext") ||
    lowerCode.includes("tohaveurl");

  let assertionScore = 0;
  if (hasAssertions) {
    assertionScore = 40;
    score += 40;
    coverage += 30;
  } else {
    feedback.push({
      type: "error",
      message: "No assertions found. Add assertions to verify expected behaviour."
    });
  }

  // Setup and teardown
  const hasSetup =
    lowerCode.includes("setup") ||
    lowerCode.includes("beforeeach") ||
    lowerCode.includes("before(");
  const hasTeardown =
    lowerCode.includes("teardown") ||
    lowerCode.includes("aftereach") ||
    lowerCode.includes("after(") ||
    lowerCode.includes("driver.quit");

  if (hasSetup && hasTeardown) {
    score = Math.min(100, score + 5);
    coverage = Math.min(100, coverage + 5);
    feedback.push({
      type: "info",
      message: "Good use of setup and teardown methods."
    });
  } else if (!hasSetup) {
    feedback.push({
      type: "warning",
      message: "No setup method found. Add setUp() or beforeEach() to initialise the browser."
    });
  }

  return {
    score: Math.min(score, 100),
    coverage: Math.min(coverage, 100),
    feedback
  };
}
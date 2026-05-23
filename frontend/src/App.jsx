import React from "react"
import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import SelectRole from "./pages/SelectRole"
import DeveloperDashboard from "./pages/dashboards/DeveloperDashboard"
import QADashboard from "./pages/dashboards/QADashboard"
import StudentDashboard from "./pages/dashboards/StudentDashboard"
import TestGeneration from "./pages/TestGeneration"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import LearningPage from "./pages/LearningPage"
// import PracticePage from "./pages/PracticePage"
import DeveloperTestHistory from "./pages/DeveloperTestHistory"
import QATestHistory from "./pages/QATestHistory"
// import QualityReports from "./pages/QualityReports"
import DeveloperReports from "./pages/DeveloperReports"
import QACoverage from "./pages/QACoverage"
import QACoverageReports from "./pages/QACoverageReports"
import StudentLearningHistory from "./pages/StudentLearningHistory"

const App = () => {
  return(
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/select-role' element={<SelectRole/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/dashboard/developer" element={<DeveloperDashboard/>}/>
        <Route path="/dashboard/qa" element={<QADashboard/>}/>
        <Route path="/dashboard/student" element={<StudentDashboard/>}/>
        <Route path="/developer/generate-test" element={<TestGeneration role={"developer"}/>}/>
        <Route path="/developer/test-history" element={<DeveloperTestHistory role={"developer"}/>}/>
        <Route path="/qa/test-history" element={<QATestHistory role={"qa"}/>}/>
        <Route path="/qa/generate-test" element={<TestGeneration role={"qa"}/>}/>
        {/* <Route path="/qa/quality-reports" element={<QualityReports role={"qa"}/>}/> */}
        <Route path="/reports/developer" element={<DeveloperReports />} />
        {/* <Route path="/qa-report" element={<QualityReports />} /> */}
        <Route path="/qa/coverage-report" element={<QACoverage />} />
        <Route path="/reports/qa" element={<QACoverageReports />} />
        <Route path="/student/generate-test" element={<TestGeneration role={"student"}/>}/>
        <Route path="/student/learn" element={<LearningPage />}/>
        {/* <Route path="/student/practice" element={<PracticePage/>}/> */}
        <Route path="/student/learning-history" element={<StudentLearningHistory />}/>
       
      </Routes>
    </div>
  )
}

export default App
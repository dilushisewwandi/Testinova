// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import Navbar from "../components/Navbar";
// import { Code2, Users, BookOpen, Zap, CheckCircle, Shield, TrendingUp, Lightbulb, ArrowRight } from "lucide-react";

// export default function LandingPage() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-white text-gray-800 overflow-hidden">
//       <Navbar />

//       {/* ================== HERO SECTION ================== */}
//       <section className="min-h-screen flex items-center px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden">
//         {/* Background decoration */}
//         <div className="absolute top-0 right-0 -mr-40 -mt-40 w-80 h-80 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
//         <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-80 h-80 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>

//         <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
          
//           <motion.div
//             initial={{ opacity: 0, x: -60 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
//               AI-Powered <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Test Case</span> Generation
//             </h1>

//             <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-xl">
//               Transform natural language requirements into intelligent, comprehensive test cases in seconds. Powered by local AI, secure by design, and engineered for teams.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 mb-12">
//               <button
//                 onClick={() => navigate("/signup")}
//                 className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl shadow-2xl hover:shadow-cyan-500/50 transition duration-300 flex items-center justify-center gap-2 text-lg"
//               >
//                 Get Started <ArrowRight className="w-5 h-5" />
//               </button>
//               <button
//                 onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}
//                 className="px-8 py-4 border-2 border-blue-300 text-white font-semibold rounded-xl hover:bg-blue-500/10 transition duration-300"
//               >
//                 Learn More
//               </button>
//             </div>

//             <div className="flex gap-8">
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="w-5 h-5 text-cyan-400" />
//                 <span className="text-blue-100">Instant Results</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="w-5 h-5 text-cyan-400" />
//                 <span className="text-blue-100">Privacy First</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="w-5 h-5 text-cyan-400" />
//                 <span className="text-blue-100">3 Roles</span>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="hidden md:block"
//           >
//             <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-12 border border-blue-400/30 backdrop-blur-sm">
//               <div className="space-y-6">
//                 <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
//                   <Code2 className="w-8 h-8 text-cyan-400 flex-shrink-0" />
//                   <div>
//                     <p className="text-sm font-semibold text-cyan-300">For Developers</p>
//                     <p className="text-sm text-blue-100">Unit & Integration Tests</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
//                   <Users className="w-8 h-8 text-cyan-400 flex-shrink-0" />
//                   <div>
//                     <p className="text-sm font-semibold text-cyan-300">For QA Engineers</p>
//                     <p className="text-sm text-blue-100">UI & Workflow Tests</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
//                   <BookOpen className="w-8 h-8 text-cyan-400 flex-shrink-0" />
//                   <div>
//                     <p className="text-sm font-semibold text-cyan-300">For Students</p>
//                     <p className="text-sm text-blue-100">Learn & Practice</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ================== ABOUT SECTION ================== */}
//       <section id="about" className="py-20 px-6 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               About Testinova
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//               Testinova transforms how teams approach software testing by combining AI-powered automation with role-specific workflows. Built for security, designed for speed.
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200"
//             >
//               <Zap className="w-12 h-12 text-blue-600 mb-4" />
//               <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
//               <p className="text-gray-700">Generate comprehensive test cases in seconds using advanced AI models running locally on your infrastructure.</p>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border border-green-200"
//             >
//               <Shield className="w-12 h-12 text-green-600 mb-4" />
//               <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy First</h3>
//               <p className="text-gray-700">All processing happens locally. Your code and requirements never leave your infrastructure. Complete data privacy guaranteed.</p>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200"
//             >
//               <Users className="w-12 h-12 text-purple-600 mb-4" />
//               <h3 className="text-xl font-bold text-gray-900 mb-3">Role-Based</h3>
//               <p className="text-gray-700">Tailored workflows for Developers, QA Engineers, and Students. Each role gets optimized tools and features.</p>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ================== FEATURES SECTION ================== */}
//       <section id="features" className="py-20 px-6 bg-gray-50">
//         <div className="max-w-6xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               Powerful Features
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Everything you need to streamline your testing workflow
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 gap-8">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//               className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
//             >
//               <div className="flex items-start gap-4">
//                 <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
//                   <Code2 className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-900 mb-2">Natural Language Processing</h3>
//                   <p className="text-gray-600">Convert requirements written in plain English into structured, executable test cases instantly.</p>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//               className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
//             >
//               <div className="flex items-start gap-4">
//                 <div className="p-3 bg-purple-100 rounded-lg flex-shrink-0">
//                   <TrendingUp className="w-6 h-6 text-purple-600" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-900 mb-2">Quality Scoring</h3>
//                   <p className="text-gray-600">Get automatic quality metrics and recommendations to improve your test coverage and effectiveness.</p>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
//             >
//               <div className="flex items-start gap-4">
//                 <div className="p-3 bg-green-100 rounded-lg flex-shrink-0">
//                   <Lightbulb className="w-6 h-6 text-green-600" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-900 mb-2">Cognitive Scaffolding</h3>
//                   <p className="text-gray-600">Interactive learning with step-by-step explanations and guided practice exercises for continuous improvement.</p>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
//             >
//               <div className="flex items-start gap-4">
//                 <div className="p-3 bg-orange-100 rounded-lg flex-shrink-0">
//                   <CheckCircle className="w-6 h-6 text-orange-600" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-900 mb-2">Multi-Framework Export</h3>
//                   <p className="text-gray-600">Export generated tests to any framework: Jest, Pytest, Selenium, Cypress, and more.</p>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ================== ROLES SECTION ================== */}
//       <section id="roles" className="py-20 px-6 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               Built for Your Role
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Specialized workflows tailored to Developers, QA Engineers, and Students
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border-2 border-blue-300"
//             >
//               <Code2 className="w-12 h-12 text-blue-600 mb-4" />
//               <h3 className="text-2xl font-bold text-gray-900 mb-3">For Developers</h3>
//               <ul className="space-y-3 text-gray-700">
//                 <li className="flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-blue-600" />
//                   Unit test generation
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-blue-600" />
//                   Integration tests
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-blue-600" />
//                   Quality scoring
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-blue-600" />
//                   Export to multiple frameworks
//                 </li>
//               </ul>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border-2 border-purple-300"
//             >
//               <Users className="w-12 h-12 text-purple-600 mb-4" />
//               <h3 className="text-2xl font-bold text-gray-900 mb-3">For QA Engineers</h3>
//               <ul className="space-y-3 text-gray-700">
//                 <li className="flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-purple-600" />
//                   UI test generation
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-purple-600" />
//                   Workflow testing
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-purple-600" />
//                   Coverage analytics
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-purple-600" />
//                   Test history & reports
//                 </li>
//               </ul>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border-2 border-green-300"
//             >
//               <BookOpen className="w-12 h-12 text-green-600 mb-4" />
//               <h3 className="text-2xl font-bold text-gray-900 mb-3">For Students</h3>
//               <ul className="space-y-3 text-gray-700">
//                 <li className="flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-green-600" />
//                   Structured learning paths
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-green-600" />
//                   Conceptual explanations
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-green-600" />
//                   Interactive exercises
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-green-600" />
//                   Progress tracking
//                 </li>
//               </ul>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ================== CTA SECTION ================== */}
//       <section className="py-20 px-6 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
//         <div className="max-w-4xl mx-auto text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h2 className="text-4xl md:text-5xl font-bold mb-6">
//               Ready to Transform Your Testing?
//             </h2>
//             <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//               Join developers and QA engineers who are already generating smarter test cases with Testinova.
//             </p>
//             <button
//               onClick={() => navigate("/select-role")}
//               className="px-10 py-4 bg-white text-blue-900 font-semibold rounded-xl hover:bg-blue-50 transition duration-300 inline-flex items-center gap-2 text-lg shadow-2xl"
//             >
//               Get Started Now <ArrowRight className="w-5 h-5" />
//             </button>
//           </motion.div>
//         </div>
//       </section>

//       {/* ================== FOOTER ================== */}
//       <footer className="bg-gray-900 text-gray-300 py-12 px-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <h4 className="text-white font-bold mb-4">Testinova</h4>
//               <p className="text-sm">AI-powered test generation for developers, QA engineers, and students.</p>
//             </div>
//             <div>
//               <h4 className="text-white font-bold mb-4">Product</h4>
//               <ul className="space-y-2 text-sm">
//                 <li><a href="#features" className="hover:text-white transition">Features</a></li>
//                 <li><a href="#about" className="hover:text-white transition">About</a></li>
//                 <li><a href="#roles" className="hover:text-white transition">Roles</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-white font-bold mb-4">Resources</h4>
//               <ul className="space-y-2 text-sm">
//                 <li><a href="#" className="hover:text-white transition">Documentation</a></li>
//                 <li><a href="#" className="hover:text-white transition">Blog</a></li>
//                 <li><a href="#" className="hover:text-white transition">Support</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-white font-bold mb-4">Legal</h4>
//               <ul className="space-y-2 text-sm">
//                 <li><a href="#" className="hover:text-white transition">Privacy</a></li>
//                 <li><a href="#" className="hover:text-white transition">Terms</a></li>
//                 <li><a href="#" className="hover:text-white transition">Contact</a></li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 pt-8 text-center text-sm">
//             <p>&copy; 2026 Testinova. All rights reserved. Built with ❤️ for the testing community.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }


import React from "react"; 
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Code2, Users, BookOpen, Zap, CheckCircle, Shield, TrendingUp, Lightbulb, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-80 h-80 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-80 h-80 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              AI-Powered <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Test Case</span> Generation
            </h1>

            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-xl">
              Quickly turn your plain language requirements into detailed test cases. Everything runs locally, so it’s secure and fast for teams.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => navigate("/signup")}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl shadow-2xl hover:shadow-cyan-500/50 transition duration-300 flex items-center justify-center gap-2 text-lg"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 border-2 border-blue-300 text-white font-semibold rounded-xl hover:bg-blue-500/10 transition duration-300"
              >
                Learn More
              </button>
            </div>

            <div className="flex gap-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-cyan-400" />
                <span className="text-blue-100">Instant Results</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-cyan-400" />
                <span className="text-blue-100">Privacy First</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-cyan-400" />
                <span className="text-blue-100">3 Roles</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-12 border border-blue-400/30 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <Code2 className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-cyan-300">For Developers</p>
                    <p className="text-sm text-blue-100">Unit & Integration Tests</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <Users className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-cyan-300">For QA Engineers</p>
                    <p className="text-sm text-blue-100">UI & Workflow Tests</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <BookOpen className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-cyan-300">For Students</p>
                    <p className="text-sm text-blue-100">Learn & Practice</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Testinova
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Testinova helps teams test software better by using AI and role-specific tools. Secure, fast, and made for everyone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200"
            >
              <Zap className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-700">AI generates complete test cases in seconds on your local machine.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border border-green-200"
            >
              <Shield className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy First</h3>
              <p className="text-gray-700">Your data stays local. Nothing leaves your machine. Fully private.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200"
            >
              <Users className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Role-Based</h3>
              <p className="text-gray-700">Custom tools for Developers, QA engineers, and Students.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tools that make testing easier and faster
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                  <Code2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">NLP Test Generation</h3>
                  <p className="text-gray-600">Turn plain English requirements into real test cases instantly.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 rounded-lg flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Quality Scoring</h3>
                  <p className="text-gray-600">Automatic metrics to improve test coverage and quality.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-lg flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Learning Support</h3>
                  <p className="text-gray-600">Step-by-step explanations to help students understand testing.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 rounded-lg flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Export Anywhere</h3>
                  <p className="text-gray-600">Export tests to Jest, Pytest, Selenium, Cypress, and more.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ROLES SECTION */}
      <section id="roles" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              For Your Role
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Special tools for Developers, QA engineers, and Students
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Developers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border-2 border-blue-300"
            >
              <Code2 className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Developers</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-blue-600" />Unit test generation</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-blue-600" />Integration tests</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-blue-600" />Quality scoring</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-blue-600" />Export to multiple frameworks</li>
              </ul>
            </motion.div>

            {/* QA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border-2 border-purple-300"
            >
              <Users className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">QA Engineers</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-purple-600" />UI test generation</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-purple-600" />Workflow testing</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-purple-600" />Coverage analytics</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-purple-600" />Test history & reports</li>
              </ul>
            </motion.div>

            {/* Students */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border-2 border-green-300"
            >
              <BookOpen className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Students</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" />Structured learning paths</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" />Concept explanations</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" />Interactive exercises</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" />Progress tracking</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Testing?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join developers and QA engineers who are already generating smarter test cases with Testinova.
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="px-10 py-4 bg-white text-blue-900 font-semibold rounded-xl hover:bg-blue-50 transition duration-300 inline-flex items-center gap-2 text-lg shadow-2xl"
            >
              Get Started Now <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">Testinova</h4>
              <p className="text-sm">AI-powered test generation for developers, QA engineers, and students.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#about" className="hover:text-white transition">About</a></li>
                <li><a href="#roles" className="hover:text-white transition">Roles</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 Testinova. All rights reserved. Built with ❤️ for the testing community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
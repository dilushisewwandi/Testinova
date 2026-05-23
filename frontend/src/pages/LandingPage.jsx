import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import {Code2,Users, BookOpen,Zap,CheckCircle,TrendingUp,Lightbulb,ArrowRight,Shield,Layers,} from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">

      <Navbar />

   
      <section className="pt-32 pb-24 px-6 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white relative overflow-hidden">

        <div className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -top-40 -left-40"></div>
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl -bottom-40 -right-40"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-blue-300 font-medium tracking-wider uppercase mb-4">
              Software Testing Platform
            </p>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Build, Generate & Manage
              <span className="block text-blue-400">Test Cases Faster</span>
            </h1>

            <p className="text-gray-300 text-lg mb-8 max-w-xl leading-relaxed">
              A modern testing platform that helps developers, QA engineers, and students convert requirements into structured test cases efficiently and consistently.
            </p>

            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => navigate("/signup")}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center gap-2 transition shadow-lg"
              >
                Get Started <ArrowRight size={18} />
              </button>

              <button
                onClick={() =>
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 border border-blue-400/40 rounded-xl hover:bg-white/5 transition"
              >
                Explore Features
              </button>
            </div>

            <div className="flex gap-6 mt-8 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-blue-400" />
                Role-Based System
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-blue-400" />
                Secure Platform
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 space-y-6">

              <Feature icon={<Code2 />} title="Developer Workflow" desc="Unit & integration test generation" />
              <Feature icon={<Users />} title="QA Workflow" desc="UI & system test coverage" />
              <Feature icon={<BookOpen />} title="Learning Mode" desc="Guided test creation" />

            </div>
          </motion.div>

        </div>
      </section>

    
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Platform Features</h2>
          <p className="text-gray-500">
            Everything you need in a modern testing SaaS
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <Card icon={<Zap />} title="Fast Generation" desc="Generate test cases instantly from requirements" />
          <Card icon={<TrendingUp />} title="Quality Insights" desc="Measure and improve test coverage quality" />
          <Card icon={<Shield />} title="Secure System" desc="Built with privacy and security in mind" />
          <Card icon={<Layers />} title="Structured Workflow" desc="Maintain consistent testing standards" />
          <Card icon={<Lightbulb />} title="Smart Suggestions" desc="AI-guided improvements for better test design" />
          <Card icon={<CheckCircle />} title="Reliable Output" desc="Consistent and clean test structure" />

        </div>
      </section>

   
      <section id="roles" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">Designed for Teams</h2>
          <p className="text-gray-500">Different workflows for different users</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <Role title="Developers" desc="Unit & integration testing workflows" />
          <Role title="QA Engineers" desc="UI and system-level test validation" />
          <Role title="Students" desc="Learn structured testing step by step" />

        </div>
      </section>

     
      <section className="py-24 px-6 bg-gradient-to-r from-blue-900 to-slate-900 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Start Using Testinova Today</h2>
       

        <button
          onClick={() => navigate("/select-role")}
          className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl transition"
        >
          Get Started
        </button>
      </section>

   
      <footer className="py-10 text-center text-sm text-gray-500 bg-white border-t">
        © 2026 Testinova.
      </footer>

    </div>
  );
}


function Feature({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="text-blue-400">{icon}</div>
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-300">{desc}</p>
      </div>
    </div>
  );
}

function Card({ icon, title, desc }) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function Role({ title, desc }) {
  return (
    <div className="p-8 rounded-2xl bg-white border border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
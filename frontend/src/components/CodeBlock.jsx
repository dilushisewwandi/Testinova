import { motion } from "framer-motion";

export default function CodeBlock({ title, children, color = "text-sky-300" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-lg p-5"
    >
      <h3 className="text-sm font-semibold text-slate-700 mb-3">
        {title}
      </h3>

      <div className="bg-[#0f172a] rounded-xl p-4 overflow-x-auto text-sm">
        <pre className={`${color} font-mono`}>
          {children}
        </pre>
      </div>
    </motion.div>
  );
}

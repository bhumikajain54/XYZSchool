import React from 'react';
import { motion } from 'framer-motion';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-white py-24 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blue-600 font-black text-xs uppercase tracking-[0.4em] mb-4 block"
        >
          Compliance & Conduct
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-black text-[#0a192f] mb-12 tracking-tighter"
        >
          Terms of <span className="text-blue-500">Use</span>
        </motion.h1>

        <div className="prose prose-lg max-w-none text-slate-600 font-medium space-y-8 leading-relaxed">
          <section>
            <h2 className="text-xl sm:text-2xl font-black text-[#0a192f] mb-4 uppercase tracking-tight">1. Portal Access</h2>
            <p>
              The XYZ School digital portal is provided for the exclusive use of registered students, parents, and staff. Unauthorized access or attempt to circumvent security measures is strictly prohibited and subject to disciplinary action.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#0a192f] mb-4 uppercase tracking-tight">2. Academic Integrity</h2>
            <p>
              Users are expected to maintain academic integrity while using our resources. Any form of digital plagiarism, sharing of confidential assessment materials, or disruptive behavior on school forums will not be tolerated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#0a192f] mb-4 uppercase tracking-tight">3. Responsible Usage</h2>
            <p>
              Our infrastructure must be used responsibly. Users must refrain from uploading malicious content, engaging in cyberbullying, or utilizing school resources for non-educational commercial purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#0a192f] mb-4 uppercase tracking-tight">4. Intellectual Property</h2>
            <p>
              All academic materials, logos, and digital content provided through the school portal are intellectual property of XYZ Higher Secondary School. Reproduction without explicit permission is prohibited.
            </p>
          </section>

          <section className="bg-slate-50 p-10 rounded-[2rem] border border-slate-100 italic">
            <p className="mb-0">
              Usage of this portal implies agreement with these terms. The school reserves the right to update these terms to reflect evolving educational standards.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;


import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white py-24 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blue-600 font-black text-xs uppercase tracking-[0.4em] mb-4 block"
        >
          Institutional Transparency
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-black text-[#0a192f] mb-12 tracking-tighter"
        >
          Privacy <span className="text-blue-500">Policy</span>
        </motion.h1>

        <div className="prose prose-lg max-w-none text-slate-600 font-medium space-y-8 leading-relaxed">
          <section>
            <h2 className="text-2xl font-black text-[#0a192f] mb-4 uppercase tracking-tight">1. Introduction</h2>
            <p>
              At XYZ Higher Secondary School, we are committed to protecting the privacy and security of our students, parents, and staff. This Privacy Policy outlines how we collect, use, and safeguard personal information within our educational ecosystem.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#0a192f] mb-4 uppercase tracking-tight">2. Information Collection</h2>
            <p>
              We collect information necessary for academic administration, including student records, parental contact details, and progress reports. This data is handled with the highest level of confidentiality and used strictly for educational purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#0a192f] mb-4 uppercase tracking-tight">3. Data Security</h2>
            <p>
              Our school management system utilizes advanced encryption and security protocols to prevent unauthorized access. Regular audits are conducted to ensure that our digital infrastructure remains resilient against evolving threats.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#0a192f] mb-4 uppercase tracking-tight">4. Third-Party Sharing</h2>
            <p>
              We do not sell or trade personal information to third parties. Information may only be shared with authorized educational boards or service providers essential for school operations, under strict contractual privacy obligations.
            </p>
          </section>

          <section className="bg-slate-50 p-10 rounded-[2rem] border border-slate-100 italic">
            <p className="mb-0">
              For any queries regarding our privacy practices, please reach out to the Administrative Office.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;


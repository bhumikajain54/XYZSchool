import React from 'react';
import SEO from '../components/SEO';
import { FiDownload, FiFileText, FiCheckCircle, FiInfo } from 'react-icons/fi';

const DisclosureTable = ({ title, data }) => (
  <div className="mb-12">
    <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
      <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
      {title}
    </h3>
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500 border-b border-slate-200">Information</th>
            <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500 border-b border-slate-200">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((item, i) => (
            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 text-sm font-bold text-slate-700 w-1/3">{item.label}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const MandatoryDisclosure = () => {
  const generalInfo = [
    { label: 'Name of the School', value: 'XYZ Higher Secondary School' },
    { label: 'Affiliation Number', value: '1030000 (Dummy)' },
    { label: 'School Code', value: '50000 (Dummy)' },
    { label: 'Principal Name & Qualification', value: 'Mr. Vikramaditya Singh (M.A., B.Ed.)' },
  ];

  const documents = [
    { name: 'Affiliation Letter', link: '#' },
    { name: 'Trust/Society Registration', link: '#' },
    { name: 'No Objection Certificate (NOC)', link: '#' },
    { name: 'Recognition Certificate', link: '#' },
    { name: 'Building Safety Certificate', link: '#' },
    { name: 'Fire Safety Certificate', link: '#' },
    { name: 'Self Certification by School', link: '#' },
    { name: 'Water, Health & Sanitation Certificate', link: '#' },
  ];

  const staffDetails = [
    { label: 'Principal', value: '01' },
    { label: 'Total No. of Teachers', value: '45' },
    { label: 'PGT', value: '12' },
    { label: 'TGT', value: '18' },
    { label: 'PRT', value: '15' },
    { label: 'Special Educator', value: '01' },
    { label: 'Counselor and Wellness Teacher', value: '01' },
  ];

  const infrastructure = [
    { label: 'Total Campus Area (sq. mtr)', value: '8000 sq. mtr.' },
    { label: 'No. and Size of Class Rooms', value: '35 (500 sq. ft. each)' },
    { label: 'No. and Size of Laboratories', value: '05 (Physics, Chemistry, Biology, Math, Computer)' },
    { label: 'Internet Facility', value: 'Yes (100 Mbps)' },
    { label: 'No. of Girls Toilets', value: '12' },
    { label: 'No. of Boys Toilets', value: '12' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Mandatory Disclosure"
        description="Public disclosure of XYZ School information as per CBSE / MP Board norms including affiliation, staff, and infrastructure details."
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="px-4 py-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full font-black text-[10px] uppercase tracking-widest mb-6 inline-block">Compliance</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">Mandatory Public Disclosure</h1>
          <p className="text-blue-100/70 max-w-2xl mx-auto font-medium text-lg leading-relaxed italic">
            Ensuring transparency and adherence to educational standards for the trust and success of our community.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">

          <div className="bg-blue-50 border border-blue-100 rounded-[2rem] p-8 mb-16 flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl shrink-0">
              <FiInfo />
            </div>
            <div>
              <h4 className="text-xl font-black text-blue-900 mb-2">Notice to Stakeholders</h4>
              <p className="text-blue-700/80 text-sm font-bold leading-relaxed m-0">
                In accordance with CBSE/MP Board norms, this page contains all relevant information regarding the school's affiliation, infrastructure, and administration. Links for document downloads are provided for verification purposes.
              </p>
            </div>
          </div>

          <DisclosureTable title="A: General Information" data={generalInfo} />

          <div className="mb-16">
            <h3 className="text-xl font-bold text-primary mb-8 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
              B: Documents and Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {documents.map((doc, i) => (
                <div key={i} className="group flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                      <FiFileText />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{doc.name}</span>
                  </div>
                  <FiDownload className="text-slate-300 group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <DisclosureTable title="C: Staff (Teaching)" data={staffDetails} />

          <DisclosureTable title="D: School Infrastructure" data={infrastructure} />

          {/* Verification Badge */}
          <div className="mt-20 flex flex-col items-center text-center p-12 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <FiCheckCircle className="text-5xl text-blue-400 mb-6" />
            <h4 className="text-2xl font-black mb-4 uppercase tracking-tight">Information Verified</h4>
            <p className="text-blue-100/60 max-w-xl text-sm font-bold leading-relaxed mb-8">
              The information provided above is correct to the best of our knowledge and is updated periodically as per board directions.
            </p>
            <button onClick={() => window.print()} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all">
              Print Disclosure Report
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default MandatoryDisclosure;


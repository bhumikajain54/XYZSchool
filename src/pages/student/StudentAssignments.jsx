import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiFileText, FiDownload, FiUpload, FiClock, 
  FiCheckCircle, FiAlertCircle, FiSearch, FiFilter,
  FiTrendingUp, FiX, FiPaperclip
} from 'react-icons/fi';
import { useApp } from '../../context/AppContext';

const MOCK_ASSIGNMENTS = [
  {
    id: 1,
    title: "Trigonometry Basics - Exercise 4.2",
    subject: "Mathematics",
    teacher: "Mr. Rajesh Sharma",
    dueDate: "2026-04-12",
    status: "Pending",
    description: "Complete all questions from exercise 4.2. Show all step-by-step calculations neatly.",
    points: 50
  },
  {
    id: 2,
    title: "Photosynthesis Experiment Report",
    subject: "Science (Biology)",
    teacher: "Mrs. Anita Verma",
    dueDate: "2026-04-10",
    status: "Submitted",
    description: "Submit the lab report for the leaf starch experiment conducted last Tuesday.",
    points: 100
  },
  {
    id: 3,
    title: "The Mughal Empire - Essay",
    subject: "History",
    teacher: "Mr. Vikram Singh",
    dueDate: "2026-04-05",
    status: "Graded",
    grade: "A+",
    description: "Write a 500-word essay on the administrative structure of the Mughal Empire under Akbar.",
    points: 80
  },
  {
    id: 4,
    title: "Atomic Structure Quiz",
    subject: "Chemistry",
    teacher: "Mrs. Sunita Gupta",
    dueDate: "2026-04-15",
    status: "Pending",
    description: "Read Chapter 4 and complete the practice quiz provided in the handout.",
    points: 30
  }
];

const StatusBadge = ({ status }) => {
  const styles = {
    Pending: { bg: 'bg-orange-50', text: 'text-orange-700', icon: <FiClock /> },
    Submitted: { bg: 'bg-blue-50', text: 'text-blue-700', icon: <FiCheckCircle /> },
    Graded: { bg: 'bg-green-50', text: 'text-green-700', icon: <FiCheckCircle /> },
    Overdue: { bg: 'bg-red-50', text: 'text-red-700', icon: <FiAlertCircle /> }
  };
  
  const current = styles[status] || styles.Pending;
  
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${current.bg} ${current.text}`}>
      {current.icon} {status}
    </div>
  );
};

export default function StudentAssignments() {
  const { addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filtered = MOCK_ASSIGNMENTS.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         a.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "All" || a.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleDownload = (title) => {
    addToast('success', `Downloading: ${title}`);
  };

  const openSubmitModal = (assignment) => {
    setSelectedAssignment(assignment);
    setIsSubmitModalOpen(true);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitModalOpen(false);
    addToast('success', 'Submitted successfully!');
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 min-h-full space-y-6 md:space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight uppercase">My Assignments</h1>
          <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Academic growth through timely submissions</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[
          { label: 'Pending Task', count: 2, color: 'text-orange-500', bg: 'bg-orange-50', icon: <FiClock /> },
          { label: 'Completed', count: 2, color: 'text-emerald-500', bg: 'bg-emerald-50', icon: <FiCheckCircle /> },
          { label: 'Overall Perf.', count: 'A Grade', color: 'text-indigo-500', bg: 'bg-indigo-50', icon: <FiTrendingUp /> }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 md:p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5 hover:shadow-md transition-all ring-1 ring-slate-100">
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center text-xl md:text-2xl shrink-0`}>
              {stat.icon}
            </div>
            <div>
              <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</div>
              <div className="text-lg md:text-xl font-black text-slate-800 leading-none">{stat.count}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls Container */}
      <div className="bg-white p-4 md:p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative w-full lg:flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input 
              type="text" 
              placeholder="Search assignments..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 text-sm font-bold focus:border-indigo-400 focus:bg-white outline-none transition-all"
            />
          </div>
          <div className="flex gap-1.5 bg-slate-50 p-1.5 rounded-2xl w-full lg:w-auto overflow-x-auto no-scrollbar border border-slate-100">
            {['All', 'Pending', 'Submitted', 'Graded'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${filter === f ? 'bg-white text-indigo-600 shadow-sm border border-indigo-100/50' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Assignment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((assignment, index) => (
          <motion.div
            key={assignment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-6 md:p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl transition-all relative group flex flex-col h-full ring-1 ring-slate-100"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50/50 px-3 py-1 rounded-lg border border-indigo-100/30">{assignment.subject}</span>
              <StatusBadge status={assignment.status} />
            </div>

            <h3 className="text-xl font-black text-slate-800 mb-4 leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
              {assignment.title}
            </h3>
            
            <p className="text-slate-500 font-bold text-xs md:text-sm leading-relaxed mb-6 flex-1 opacity-80">
              {assignment.description}
            </p>

            <div className="grid grid-cols-2 gap-4 p-5 bg-slate-50/50 border border-slate-100 rounded-2xl mb-8">
              <div>
                <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Maturity Date</div>
                <div className="text-[11px] font-black text-slate-700 flex items-center gap-1.5">
                  <FiClock className="text-indigo-500 shrink-0" size={12} /> {assignment.dueDate}
                </div>
              </div>
              <div>
                <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Value</div>
                <div className="text-[11px] font-black text-slate-700">
                  {assignment.grade ? <span className="text-emerald-600">Grade: {assignment.grade}</span> : <span>{assignment.points} Points</span>}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => handleDownload(assignment.title)}
                className="flex-1 px-4 py-3.5 rounded-xl border border-slate-200 bg-white font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <FiDownload size={14} /> Download
              </button>
              {assignment.status === "Pending" ? (
                <button 
                  onClick={() => openSubmitModal(assignment)}
                  className="flex-1 px-4 py-3.5 rounded-xl bg-primary text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                >
                  <FiUpload size={14} /> Submit Now
                </button>
              ) : (
                <button disabled className="flex-1 px-4 py-3.5 rounded-xl bg-slate-100 font-black text-[10px] uppercase tracking-widest text-slate-300 flex items-center justify-center gap-2 cursor-default border border-slate-200">
                  <FiCheckCircle size={14} /> Finalized
                </button>
              )}
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
              <FiSearch size={32} />
            </div>
            <p className="text-slate-400 font-black text-xs uppercase tracking-widest">No matching assignments located</p>
          </div>
        )}
      </div>

      {/* Submit Modal */}
      <AnimatePresence>
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSubmitModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[32px] md:rounded-[40px] w-full max-w-xl p-6 md:p-10 shadow-2xl border border-white mx-auto overflow-hidden"
            >
              <div className="mb-8 flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <FiUpload size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight uppercase">Upload Entry</h2>
                    <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[200px]">{selectedAssignment?.title}</p>
                  </div>
                </div>
                <button onClick={() => setIsSubmitModalOpen(false)} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
                  <FiX />
                </button>
              </div>

              <form onSubmit={handleFinalSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1 block">Digital Asset (PDF/JPG)</label>
                    <label className="group flex flex-col items-center justify-center p-8 md:p-12 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 hover:bg-white hover:border-indigo-300 transition-all cursor-pointer shadow-inner">
                      <FiPaperclip size={28} className="text-slate-300 group-hover:text-indigo-500 mb-3 transition-colors" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select file from device</span>
                      <input type="file" className="hidden" />
                    </label>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1 block">Submittal Notes</label>
                    <textarea 
                      placeholder="Brief context for the instructor..."
                      className="w-full h-32 p-5 rounded-2xl border border-slate-100 bg-slate-50/50 text-sm font-bold focus:border-indigo-400 focus:bg-white outline-none transition-all resize-none shadow-inner"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="flex-1 py-4 md:py-5 rounded-2xl border border-slate-200 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all order-2 sm:order-1"
                  >
                    Discard
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-4 md:py-5 rounded-2xl bg-indigo-600 font-black text-[10px] uppercase tracking-widest text-white shadow-xl shadow-indigo-100 hover:bg-indigo-700 flex items-center justify-center gap-3 transition-all order-1 sm:order-2 active:scale-95"
                  >
                    {isSubmitting ? 'Encrypting...' : 'Finalize Post'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

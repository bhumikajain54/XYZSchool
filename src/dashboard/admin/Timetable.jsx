import React, { useState, useRef } from 'react';
import { FiPlus, FiClock, FiBook, FiUser, FiMapPin, FiEdit2, FiSave, FiX, FiUpload, FiDownload } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TIME_SLOTS = [
  '8:00-8:45',
  '8:45-9:30',
  '9:30-10:15',
  '10:30-11:15',
  '11:15-12:00',
  '12:00-12:45',
  '1:30-2:15',
  '2:15-3:00'
];

const INIT_TIMETABLE = {
  '10-A': [
    { day: 'Monday', slot: '8:00-8:45', subject: 'Math' },
    { day: 'Monday', slot: '8:45-9:30', subject: 'Science' },
    { day: 'Monday', slot: '9:30-10:15', subject: 'English' },
    { day: 'Monday', slot: '10:30-11:15', subject: 'Break' },
    { day: 'Monday', slot: '11:15-12:00', subject: 'SST' },
    { day: 'Monday', slot: '12:00-12:45', subject: 'Computer' },
    { day: 'Monday', slot: '1:30-2:15', subject: 'Lunch' },
    { day: 'Monday', slot: '2:15-3:00', subject: 'Art' },

    { day: 'Tuesday', slot: '8:00-8:45', subject: 'Science' },
    { day: 'Tuesday', slot: '8:45-9:30', subject: 'English' },
    { day: 'Tuesday', slot: '9:30-10:15', subject: 'Hindi' },
    { day: 'Tuesday', slot: '10:30-11:15', subject: 'Break' },
    { day: 'Tuesday', slot: '11:15-12:00', subject: 'Computer' },
    { day: 'Tuesday', slot: '12:00-12:45', subject: 'PT' },
    { day: 'Tuesday', slot: '1:30-2:15', subject: 'Lunch' },
    { day: 'Tuesday', slot: '2:15-3:00', subject: 'Math' },

    { day: 'Wednesday', slot: '8:00-8:45', subject: 'English' },
    { day: 'Wednesday', slot: '8:45-9:30', subject: 'Hindi' },
    { day: 'Wednesday', slot: '9:30-10:15', subject: 'SST' },
    { day: 'Wednesday', slot: '10:30-11:15', subject: 'Break' },
    { day: 'Wednesday', slot: '11:15-12:00', subject: 'PT' },
    { day: 'Wednesday', slot: '12:00-12:45', subject: 'Art' },
    { day: 'Wednesday', slot: '1:30-2:15', subject: 'Lunch' },
    { day: 'Wednesday', slot: '2:15-3:00', subject: 'Science' },

    { day: 'Thursday', slot: '8:00-8:45', subject: 'Hindi' },
    { day: 'Thursday', slot: '8:45-9:30', subject: 'SST' },
    { day: 'Thursday', slot: '9:30-10:15', subject: 'Computer' },
    { day: 'Thursday', slot: '10:30-11:15', subject: 'Break' },
    { day: 'Thursday', slot: '11:15-12:00', subject: 'Art' },
    { day: 'Thursday', slot: '12:00-12:45', subject: 'Math' },
    { day: 'Thursday', slot: '1:30-2:15', subject: 'Lunch' },
    { day: 'Thursday', slot: '2:15-3:00', subject: 'English' },

    { day: 'Friday', slot: '8:00-8:45', subject: 'SST' },
    { day: 'Friday', slot: '8:45-9:30', subject: 'Computer' },
    { day: 'Friday', slot: '9:30-10:15', subject: 'PT' },
    { day: 'Friday', slot: '10:30-11:15', subject: 'Break' },
    { day: 'Friday', slot: '11:15-12:00', subject: 'Math' },
    { day: 'Friday', slot: '12:00-12:45', subject: 'Science' },
    { day: 'Friday', slot: '1:30-2:15', subject: 'Lunch' },
    { day: 'Friday', slot: '2:15-3:00', subject: 'Hindi' },

    { day: 'Saturday', slot: '8:00-8:45', subject: 'Computer' },
    { day: 'Saturday', slot: '8:45-9:30', subject: 'PT' },
    { day: 'Saturday', slot: '9:30-10:15', subject: 'Art' },
    { day: 'Saturday', slot: '10:30-11:15', subject: 'Break' },
    { day: 'Saturday', slot: '11:15-12:00', subject: 'Science' },
    { day: 'Saturday', slot: '12:00-12:45', subject: 'English' },
    { day: 'Saturday', slot: '1:30-2:15', subject: 'Lunch' },
    { day: 'Saturday', slot: '2:15-3:00', subject: 'SST' },
  ]
};

export default function Timetable() {
  const { addToast } = useApp();
  const fileInputRef = useRef(null);
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [timetable, setTimetable] = useState(INIT_TIMETABLE);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editSlot, setEditSlot] = useState({ day: 'Monday', slot: TIME_SLOTS[0], subject: '', teacher: '', room: '' });

  const currentSchedule = timetable[selectedClass] || [];

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedClassList = [...currentSchedule.filter(s => !(s.day === editSlot.day && s.slot === editSlot.slot)), editSlot];
    setTimetable({ ...timetable, [selectedClass]: updatedClassList });
    setShowEditModal(false);
    addToast('success', 'Timetable Updated', `Schedule updated for Class ${selectedClass}.`);
  };

  const findEntry = (day, slot) => currentSchedule.find(s => s.day === day && s.slot === slot);

  const handleDownload = () => {
    try {
      const data = currentSchedule.map(s => ({ Day: s.day, Time: s.slot, Subject: s.subject }));
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, `Class_${selectedClass}`);
      const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      saveAs(new Blob([buf]), `Timetable_Class_${selectedClass}.xlsx`);
      addToast('success', 'Exported', 'Excel file generated successfully.');
    } catch (e) {
      addToast('error', 'Export Failed', 'Internal error during generation.');
    }
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      addToast('info', 'File Received', `Parsing ${file.name}... (Simulation)`);
      // Actual parsing logic would go here
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <input type="file" ref={fileInputRef} className="hidden" accept=".xlsx,.csv" onChange={handleFileChange} />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Timetable – Class {selectedClass}</h1>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition shadow-sm text-sm"
            onClick={handleUploadClick}
          >
            <FiUpload /> Upload
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition shadow-sm text-sm"
            onClick={handleDownload}
          >
            <FiDownload /> Download
          </button>
          <select
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500 shadow-sm cursor-pointer text-sm"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {['10-A', '10-B', '11-A', '12-B', '9-C'].map(c => <option key={c} value={c}>Class {c}</option>)}
          </select>
          <button
            onClick={() => setShowEditModal(true)}
            className="p-2 bg-primary text-white rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 flex items-center justify-center"
            title="Edit Schedule"
          >
            <FiPlus size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden border-zinc-100">
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-slate-50/30 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 text-left bg-slate-50/50 sticky left-0 z-10 w-32">Day</th>
                {TIME_SLOTS.map(slot => (
                  <th key={slot} className="px-6 py-4 text-xs font-bold text-slate-400 min-w-[120px]">{slot}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DAYS.map((day, dIdx) => (
                <tr key={day} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/10 transition-colors">
                  <td className="px-6 py-6 text-left font-bold text-slate-800 bg-slate-50/20 sticky left-0 z-10 shadow-sm shadow-slate-100/5 min-w-[120px]">
                    {day}
                  </td>
                  {TIME_SLOTS.map(slot => {
                    const entry = findEntry(day, slot);
                    const isSpecial = entry?.subject === 'Break' || entry?.subject === 'Lunch';
                    return (
                      <td key={`${day}-${slot}`} className="px-4 py-6">
                        <AnimatePresence mode="wait">
                          {entry ? (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${isSpecial
                                  ? 'bg-amber-100 text-amber-600'
                                  : 'bg-indigo-50 text-indigo-500'
                                }`}
                            >
                              {entry.subject}
                            </motion.div>
                          ) : (
                            <div className="h-6 w-12 mx-auto rounded-full bg-slate-50/50" />
                          )}
                        </AnimatePresence>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal remains functional but subtle */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowEditModal(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h4 className="font-bold text-slate-800">Edit Slot Resource</h4>
                <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition"><FiX /></button>
              </div>
              <form onSubmit={handleUpdate} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">Day</label>
                    <select className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-bold transition cursor-pointer" value={editSlot.day} onChange={e => setEditSlot({ ...editSlot, day: e.target.value })}>
                      {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">Slot</label>
                    <select className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-bold transition cursor-pointer" value={editSlot.slot} onChange={e => setEditSlot({ ...editSlot, slot: e.target.value })}>
                      {TIME_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">Subject</label>
                  <input type="text" className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-bold transition-all" value={editSlot.subject} onChange={e => setEditSlot({ ...editSlot, subject: e.target.value })} placeholder="e.g. Mathematics" required />
                </div>
                <div className="pt-4 flex gap-4">
                  <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 py-4 text-slate-500 font-bold rounded-xl hover:bg-slate-50 transition">Discard</button>
                  <button type="submit" className="flex-1 py-4 bg-primary text-white font-black rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">Save Slot</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

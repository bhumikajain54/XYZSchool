import React from 'react';

const AuthNavbar = () => {
  return (
    <div className="w-full z-50">
      {/* Top Thin Bar */}
      <div className="bg-slate-900/80 backdrop-blur-md border-b border-white/5 py-1.5 px-4 md:px-8 flex justify-center items-center text-[10px] md:text-xs font-medium text-slate-400">
                <div className="font-bold text-slate-300 uppercase tracking-widest">
          XYZ Higher Secondary School
        </div>
      </div>

    </div>
  );
};

export default AuthNavbar;

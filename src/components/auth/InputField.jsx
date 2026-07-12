import React from 'react';

const InputField = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  error, 
  icon: Icon,
  rightElement
}) => {
  return (
    <div className="mb-4">
      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full bg-[#1e293b]/50 border-2 ${error ? 'border-rose-500' : 'border-slate-700'} 
            focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 
            rounded-xl py-2.5 ${Icon ? 'pl-11' : 'pl-4'} pr-4 text-white text-sm 
            transition-all duration-200 outline-none placeholder:text-slate-500`}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 ml-1 text-[11px] font-semibold text-rose-500 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;

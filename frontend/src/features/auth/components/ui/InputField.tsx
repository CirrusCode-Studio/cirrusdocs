'use client'
import React, { useState } from 'react';
import { Eye, EyeOff, LucideIcon } from 'lucide-react';

interface InputFieldProps {
  type: string;
  placeholder: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: LucideIcon;
  error?: boolean;
}

const InputField = ({ type, placeholder, label, value, onChange, icon: Icon, error }: InputFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
    <div className="w-full group">
        <label className="block text-[11px] sm:text-xs font-medium text-slate-400 mb-1.5 ml-1 transition-colors group-focus-within:text-blue-400">
            {label}
        </label>
        <div className="relative">
            {Icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors pointer-events-none">
                <Icon size={18} />
            </div>
            )}
            <input
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`
                w-full bg-slate-900/50 border ${error ? 'border-red-500/50' : 'border-white/10'} 
                rounded-xl py-3 sm:py-2.5 ${Icon ? 'pl-11' : 'pl-4'} pr-11 
                text-sm sm:text-base text-slate-100 placeholder:text-slate-600 outline-none
                transition-all duration-200 appearance-none
                focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:shadow-[0_0_15px_rgba(59,130,246,0.2)]
            `}
            />
            {isPassword && (
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            )}
        </div>
    </div>
    );
};

export default InputField;

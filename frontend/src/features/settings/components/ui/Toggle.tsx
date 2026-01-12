'use client'
import React from 'react';
import { motion } from 'framer-motion';

interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
}

const Toggle = ({ checked, onChange, label }: ToggleProps) => {
    return (
        <div className="flex items-center justify-between w-full">
        {label && <span className="text-gray-300 font-medium">{label}</span>}
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
            checked ? 'bg-blue-600' : 'bg-gray-700'
            }`}
        >
            <motion.div
            animate={{ x: checked ? 26 : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
            />
        </button>
        </div>
    );
};

export default Toggle;

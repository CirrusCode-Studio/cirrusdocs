import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

const GlassCard = ({ children, title, description, className = '' }: GlassCardProps) => {
    return (
        <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl ${className}`}>
        {title && (
            <div className="mb-6">
            <h3 className="text-xl font-semibold text-white/90">{title}</h3>
            {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
            </div>
        )}
        {children}
        </div>
    );
};

export default GlassCard;

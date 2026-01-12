
import React from 'react';
import { Cloud, Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
    <footer className="pt-24 pb-12 px-6 border-t border-white/5 bg-slate-950/20">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
            <div className="col-span-2">
                <div className="flex items-center gap-2 mb-6">
                <Cloud className="w-8 h-8 text-blue-500" />
                <span className="text-xl font-extrabold tracking-tighter">CirrusDocs</span>
                </div>
                <p className="text-slate-500 max-w-sm mb-8">
                Empowering the next generation of knowledge work with traceable, secure AI infrastructure.
                </p>
                <div className="flex gap-4">
                <Twitter className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
                <Github className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
                </div>
            </div>

            <div>
                <h4 className="font-bold mb-6">Product</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                <li className="hover:text-white cursor-pointer transition-colors">Features</li>
                <li className="hover:text-white cursor-pointer transition-colors">Security</li>
                <li className="hover:text-white cursor-pointer transition-colors">Enterprise</li>
                <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold mb-6">Resources</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                <li className="hover:text-white cursor-pointer transition-colors">Documentation</li>
                <li className="hover:text-white cursor-pointer transition-colors">API Reference</li>
                <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
                <li className="hover:text-white cursor-pointer transition-colors">Community</li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold mb-6">Company</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                <li className="hover:text-white cursor-pointer transition-colors">About</li>
                <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-white cursor-pointer transition-colors">Privacy</li>
                <li className="hover:text-white cursor-pointer transition-colors">Terms</li>
                </ul>
            </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
            <div className="text-slate-600 text-xs">
                © 2025 CirrusDocs AI Inc. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">System Operational</span>
                </div>
            </div>
            </div>
        </div>
    </footer>
    );
};

export default Footer;

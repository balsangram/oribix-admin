import React from 'react';
import { Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ComingSoon() {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 min-h-[70vh]">
            <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-12 flex flex-col items-center justify-center max-w-md w-full text-center">
                <div className="w-20 h-20 rounded-[20px] bg-slate-50 flex items-center justify-center mb-6 shadow-inner relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#1aa3ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Rocket className="w-10 h-10 text-slate-300 group-hover:text-[#1aa3ff] transition-colors duration-500 group-hover:-translate-y-2 group-hover:translate-x-1" />
                </div>
                <h2 className="text-[22px] font-bold text-[#0b1220] mb-2.5 tracking-tight">System offline</h2>
                <p className="text-[13px] text-slate-500 font-medium leading-relaxed max-w-[280px]">
                    Engineering is currently building out this module. It will be available in an upcoming deployment.
                </p>
                <hr className="w-12 border-slate-100 my-6" />
                <button
                    onClick={() => navigate('/admin/console')}
                    className="px-6 py-3 px-7 bg-[#0b1220] text-white rounded-full text-[12.5px] font-bold shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all active:scale-95"
                >
                    Return to Mission Control
                </button>
            </div>
        </div>
    );
}

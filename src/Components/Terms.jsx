import React from 'react';
import { HiOutlineShieldCheck, HiOutlineDocumentText, HiOutlineScale } from 'react-icons/hi';

const Terms = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F1A] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                
                {/* Header Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-10 text-white text-center">
                    <HiOutlineShieldCheck className="text-6xl mx-auto mb-4 opacity-80" />
                    <h1 className="text-3xl font-black tracking-tight">Terms of Service</h1>
                    <p className="text-blue-100 mt-2 font-medium">Last Updated: January 2026</p>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-12 space-y-10">
                    
                    {/* Introduction */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <HiOutlineDocumentText className="text-2xl text-blue-600" />
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">1. Introduction</h2>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            Welcome to <strong>HabitPro</strong>. By accessing our dashboard and using our services, you agree to be bound by these terms. Our platform is designed to help you track habits and improve productivity. We reserve the right to update these terms at any time.
                        </p>
                    </section>

                    <hr className="border-slate-100 dark:border-slate-800" />

                    {/* User Conduct */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <HiOutlineScale className="text-2xl text-blue-600" />
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">2. User Responsibilities</h2>
                        </div>
                        <ul className="list-disc list-inside space-y-3 text-slate-600 dark:text-slate-400">
                            <li>You must provide accurate information when creating an account.</li>
                            <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                            <li>Any uploaded content (habit titles, images) must not violate any copyright laws.</li>
                            <li>We reserve the right to terminate accounts that engage in abusive or illegal behavior.</li>
                        </ul>
                    </section>

                    {/* Data & Privacy */}
                    <section className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                        <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">3. Data & Privacy</h3>
                        <p className="text-sm text-blue-700/80 dark:text-blue-400/80 italic">
                            Your habit data, completion history, and uploaded images are stored securely. We use industry-standard encryption to protect your information. Please refer to our Privacy Policy for more details on how we handle your data.
                        </p>
                    </section>

                    {/* Termination */}
                    <section>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">4. Limitation of Liability</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            HabitPro is provided "as is." While we strive for 100% uptime, we are not responsible for any data loss or service interruptions that may affect your habit-tracking streaks.
                        </p>
                    </section>

                    {/* Footer Contact */}
                    <div className="pt-10 text-center border-t border-slate-100 dark:border-slate-800">
                        <p className="text-slate-500 text-sm">
                            Questions about our terms? Contact us at <span className="text-blue-600 font-bold">support@habitpro.com</span>
                        </p>
                        <button 
                            onClick={() => window.history.back()}
                            className="mt-6 text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest"
                        >
                            ← Back to Dashboard
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Terms;
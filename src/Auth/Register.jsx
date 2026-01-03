import React, { useContext, useState } from "react"; // Changed use to useContext for standard React
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
    const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        const displayName = event.target.displayName.value;
        const photoURL = event.target.photoURL.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        // Validation
        if (!/(?=.*[a-z])/.test(password) || !/(?=.*[A-Z])/.test(password) || password.length < 6) {
            const msg = "Password must include uppercase, lowercase, and be at least 6 characters long";
            setError(msg);
            toast.error(msg);
            setLoading(false);
            return;
        }

        const toastId = toast.loading("Creating your profile...");

        try {
            const result = await createUser(email, password);
            await updateUserProfile(displayName, photoURL);
            toast.success(`Welcome, ${displayName}!`, { id: toastId });
            navigate("/");
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Registration failed", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                toast.success("Account created via Google!");
                navigate("/");
            })
            .catch((err) => toast.error(err.message));
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-black/10">
            <Toaster />
            
            <div className="card bg-white dark:bg-slate-900 w-full max-w-md shadow-2xl border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden">
                <div className="p-8 md:p-10">
                    <header className="text-center mb-8">
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                            Join Us<span className="text-blue-500">.</span>
                        </h1>
                        <p className="text-slate-500 text-sm mt-2 font-medium">Start building better habits today.</p>
                    </header>

                    <form onSubmit={handleRegister} className="space-y-4">
                        {/* Name Field */}
                        <div className="form-control">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4 mb-2 block">Full Name</label>
                            <input
                                type="text"
                                name="displayName"
                                required
                                className="input w-full rounded-2xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 transition-all px-6 py-4 h-auto"
                                placeholder="John Doe"
                            />
                        </div>

                        {/* Photo URL Field */}
                        <div className="form-control">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4 mb-2 block">Avatar URL</label>
                            <input
                                type="text"
                                name="photoURL"
                                required
                                className="input w-full rounded-2xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 transition-all px-6 py-4 h-auto"
                                placeholder="https://image.link"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="form-control">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4 mb-2 block">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="input w-full rounded-2xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 transition-all px-6 py-4 h-auto"
                                placeholder="email@example.com"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="form-control relative">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4 mb-2 block">Security Key</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                className="input w-full rounded-2xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 transition-all px-6 py-4 h-auto"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-[44px] text-slate-400 hover:text-blue-500 transition-colors"
                            >
                                {showPassword ? <FaEyeSlash size={20}/> : <FaEye size={20}/>}
                            </button>
                        </div>

                        {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-tight ml-4">{error}</p>}

                        <button 
                            disabled={loading}
                            className={`btn w-full text-white border-none mt-4 h-14 rounded-2xl text-lg font-black shadow-lg shadow-blue-500/30 bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] active:scale-95 transition-all ${loading ? 'opacity-70' : ''}`}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <div className="divider text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] my-8">Quick Connect</div>

                    <button
                        onClick={handleGoogleSignIn}
                        className="btn w-full bg-white dark:bg-slate-800 rounded-2xl text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 h-14 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
                    >
                        <FaGoogle className="text-red-500" />
                        Sign up with Google
                    </button>

                    <p className="text-center mt-8 text-slate-500 font-medium">
                        Already have an account? {" "}
                        <Link className="text-blue-500 font-black hover:underline" to="/auth/login">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
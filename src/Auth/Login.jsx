import { useContext, useState } from "react"; // Changed 'use' to 'useContext' for standard compatibility
import { Link, useLocation, useNavigate } from "react-router-dom"; // Standard router import
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const handleLogIn = (event) => {
        event.preventDefault();
        setLoading(true);
        const email = event.target.email.value;
        const password = event.target.password.value;

        signInUser(email, password)
            .then((result) => {
                toast.success(`Welcome back, ${result.user?.displayName || "User"}!`);
                event.target.reset();
                setTimeout(() => navigate(location.state || "/"), 1200);
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.message || "Invalid credentials. Please try again.");
            })
            .finally(() => setLoading(false));
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                toast.success("Signed in with Google!");
                navigate(location?.state || "/");
            })
            .catch((error) => {
                toast.error("Google Sign-in failed.");
            });
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            {/* Using the same Toaster theme from your Add Habit modal */}
            <Toaster 
                toastOptions={{
                    className: 'dark:bg-slate-800 dark:text-white rounded-2xl font-bold border border-slate-200 dark:border-slate-700',
                    success: { iconTheme: { primary: '#3B82F6', secondary: '#fff' } }
                }}
            />

            <div className="card bg-white dark:bg-slate-900 w-full max-w-md shadow-2xl border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden">
                <div className="p-8 md:p-10">
                    <header className="text-center mb-8">
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                            Login<span className="text-blue-500">.</span>
                        </h1>
                        <p className="text-slate-500 text-sm mt-2 font-medium">Continue your journey to productivity.</p>
                    </header>

                    <form onSubmit={handleLogIn} className="space-y-4">
                        <div className="form-control">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4 mb-2 block">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="input w-full rounded-2xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 transition-all px-6 py-4 h-auto"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="form-control relative">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4 mb-2 block">
                                Password
                            </label>
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

                        <div className="flex justify-end px-2">
                            <button type="button" className="text-xs font-bold text-slate-400 hover:text-blue-500 transition-colors">
                                Forgot password?
                            </button>
                        </div>

                        <button 
                            disabled={loading}
                            className={`btn w-full text-white border-none mt-2 h-14 rounded-2xl text-lg font-black shadow-lg shadow-blue-500/30 bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] active:scale-95 transition-all ${loading ? 'opacity-70' : ''}`}
                        >
                            {loading ? "Authenticating..." : "Login"}
                        </button>
                    </form>

                    <div className="divider text-xs font-black text-slate-300 uppercase tracking-widest my-8">Or continue with</div>

                    <button
                        onClick={handleGoogleSignIn}
                        className="btn w-full bg-white dark:bg-slate-800 rounded-2xl text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 h-14 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
                    >
                        <FaGoogle className="text-red-500" />
                        Google
                    </button>

                    <p className="text-center mt-8 text-slate-500 font-medium">
                        New here? {" "}
                        <Link
                            className="text-blue-500 font-black hover:underline"
                            to="/auth/register"
                        >
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
import { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Login = () => {
    const { signInUser, signInWithGoogle } = use(AuthContext);
    const [showPassword, setShowPassword] = useState(false)

    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);

    const handleLogIn = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        console.log(email, password);
        signInUser(email, password)
            .then((result) => {
                console.log(result.user);
                event.target.reset();
                navigate(location.state || "/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                console.log(result.user);
                navigate(location?.state || "/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="card bg-base-100  w-full mx-auto max-w-sm shrink-0 shadow-2xl border border-gray-200">
            <div className="card-body">
                <h1 className="text-3xl font-bold text-center">Login</h1>
                <form onSubmit={handleLogIn}>
                    <fieldset className="fieldset">

                        <label className="label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="input rounded-full focus:border-0 focus:outline-gray-200"
                            placeholder="Email"
                        />

                        <div className="relative">
                            <label className="label">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="input rounded-full focus:border-0 focus:outline-gray-200"
                                placeholder="Password"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-7 top-8 cursor-pointer text-gray-600"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>

                        </div>
                        <div>
                            <a className="link link-hover">Forgot password?</a>
                        </div>
                        <button className="btn text-white mt-4 rounded-full bg-linear-to-r from-blue-500 to-cyan-500">
                            Login
                        </button>
                    </fieldset>
                </form>

                <button
                    onClick={handleGoogleSignIn}
                    className="btn bg-white rounded-full text-black border-[#e5e5e5]"
                >
                    <FaGoogle />
                    Login with Google
                </button>
                <p className="text-center">
                    New to our website? Please  <Link
                        className="text-blue-500 hover:text-blue-800"
                        to="/auth/register"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoadingButton from "../../components/LoadingButton";
import { useTheme } from "../../context/ThemeContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { loadUserTheme } = useTheme();

    const navigate = useNavigate();

    const handleLogin = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            loadUserTheme();

            toast.success("Login successful!");

            if (response.data.user.mustChangePassword) {
                navigate("/change-password");
                return;
            }

            if (response.data.user.role === "employee") {
                navigate("/employee/dashboard");
            } else if (response.data.user.role === "manager") {
                navigate("/manager/dashboard");
            } else if (response.data.user.role === "admin") {
                navigate("/admin/dashboard");
            }
        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-900 via-blue-900 to-slate-800 px-6 py-12">

            {/* Background Blur */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>

            {/* Main Card */}
            <div className="relative w-full max-w-7xl min-h-[700px] lg:h-160 overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl grid lg:grid-cols-[1fr_1.1fr]">
                {/* LEFT PANEL */}
                <div className="hidden lg:flex flex-col justify-center items-center bg-linear-to-br from-blue-700 to-slate-900 text-white px-16 py-16">

                    {/* Logo + Brand */}
                    <div className="flex items-center justify-center gap-5 mb-12">

                        <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center text-4xl shadow-lg">
                            🏢
                        </div>

                        <h1 className="text-5xl font-extrabold tracking-tight">
                            LeaveVerse
                        </h1>

                    </div>

                    {/* Description */}
                    <p className="text-blue-100 text-lg leading-9 text-center max-w-md">
                        A modern leave management platform that helps
                        employees, managers, and administrators efficiently
                        manage leave requests, approvals, balances, and
                        attendance from one centralized system.
                    </p>
                    <br></br>
                    {/* Features */}
                    <div className="mt-14 pt-8 border-t border-white/20 space-y-6 text-lg w-full max-w-sm">

                        <br></br>

                        <div className="flex items-center justify-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-cyan-300"></div>
                            Secure Authentication
                        </div>

                        <div className="flex items-center justify-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-cyan-300"></div>
                            Real-Time Leave Tracking
                        </div>

                    </div>

                </div>

                {/* RIGHT PANEL */}
                <div className="bg-white flex items-center justify-center px-6 sm:px-10 lg:px-16 py-10 lg:py-16">
                    <div className="w-full max-w-xl px-0 lg:px-10">
                        {/* Heading */}
                        <div className="text-center mb-8 lg:mb-14">

                            <div className="lg:hidden text-5xl mb-4">
                                🏢
                            </div>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800">
                                Welcome Back
                            </h2>

                            <p className="mt-2 text-base sm:text-lg text-slate-500">
                                Sign in to continue to your account
                            </p>

                        </div>

                        {/* Email */}
                        <div className="mb-8">

                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="  Enter your email"
                                value={email}
                                disabled={loading}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-3.5 text-base outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
                            />

                        </div>

                        {/* Password */}
                        <div className="mb-8">

                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Password
                            </label>

                            <div className="relative">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="  Enter your password"
                                    autoComplete="current-password"
                                    value={password}
                                    disabled={loading}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-3.5 pr-12 text-base outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
                                />

                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600 transition"
                                >
                                    {showPassword ? (
                                        <FaEyeSlash size={18} />
                                    ) : (
                                        <FaEye size={18} />
                                    )}
                                </button>

                            </div>

                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end mb-10">

                            <Link
                                to="/forgot-password"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition"
                            >
                                Forgot Password?
                            </Link>

                        </div>

                        {/* Login Button */}
                        <LoadingButton
                            loading={loading}
                            text="Sign In"
                            loadingText="Signing In..."
                            onClick={handleLogin}
                            className="w-full py-4 text-lg rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        />

                        {/* Footer */}
                        <div className="mt-10 text-center">

                            <p className="text-sm text-slate-400">
                                © {new Date().getFullYear()} LeaveVerse
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;
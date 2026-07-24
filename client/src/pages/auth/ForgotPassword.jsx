import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import LoadingButton from "../../components/LoadingButton";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (loading) return;

        if (!email) {
            toast.error("Please enter your email.");
            return;
        }

        setLoading(true);

        try {
            const response = await api.post("/auth/forgot-password", {
                email,
            });

            toast.success(response.data.message);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-blue-900 to-slate-800 px-4 py-6">

            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl px-6 sm:px-10 lg:px-12 py-8 lg:py-10">

                {/* Heading */}

                <div className="text-center mb-8">

                    <div className="text-5xl mb-4">
                        🔑
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
                        Forgot Password
                    </h1>

                    <p className="mt-4 text-slate-500 leading-7 max-w-xl mx-auto">
                        Enter your registered email address to receive
                        a secure password reset link.
                    </p>

                </div>

                {/* Email */}

                <div className="mb-8">

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        disabled={loading}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-12 rounded-xl border border-slate-300 bg-slate-50 px-4 text-base text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
                    />

                </div>

                {/* Button */}

                <div className="flex justify-center">

                    <LoadingButton
                        loading={loading}
                        text="Send Reset Link"
                        loadingText="Sending..."
                        onClick={handleSubmit}
                        className="w-full sm:w-80 h-12 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold shadow-lg transition-all duration-300"
                    />

                </div>

                {/* Footer */}

                <p className="text-center text-sm text-slate-400 mt-8">
                    © {new Date().getFullYear()} LeaveVerse
                </p>

            </div>

        </div>
    );
};

export default ForgotPassword;
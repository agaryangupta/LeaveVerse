import { useState } from "react";
import axios from "axios";
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
            const response = await axios.post(
                "http://localhost:5000/api/auth/forgot-password",
                {
                    email,
                }
            );

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
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-blue-900 to-slate-800 px-4">

            <div className="w-200 h-70 bg-white rounded-2xl shadow-2xl p-10">

                <div className="text-center mb-8">
                    <br></br>

                    <h1 className="text-4xl font-bold text-slate-800">
                        Forgot Password
                    </h1>

                    <p className="mt-4 text-slate-500 leading-7">
                        Enter your registered email address to receive
                        a password reset link.
                    </p>

                </div>
                <br></br>

                <div className="flex justify-center mb-8">

                    <input
                        type="email"
                        placeholder="  Enter your email"
                        value={email}
                        disabled={loading}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-100 h-11 rounded-xl border border-slate-300 bg-slate-50 px-2 text-base text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
                    />

                </div>
                <br></br>
                <div className="flex justify-center mt-10">

                    <LoadingButton
                        loading={loading}
                        text="Send Reset Link"
                        loadingText="Sending..."
                        onClick={handleSubmit}
                        className="w-72 h-12 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold shadow-lg"
                    />

                </div>
                <br></br>

                <p className="text-center text-sm text-slate-400 mt-8">
                    © {new Date().getFullYear()} LeaveVerse
                </p>

            </div>

        </div>
    );
};

export default ForgotPassword;
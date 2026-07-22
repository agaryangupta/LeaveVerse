import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoadingButton from "../../components/LoadingButton";

const ResetPassword = () => {

    const { token } = useParams();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {

        if (loading) return;

        if (!newPassword || !confirmPassword) {
            toast.error("All fields are required.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {

            const response = await axios.put(
                `http://localhost:5000/api/auth/reset-password/${token}`,
                {
                    newPassword,
                    confirmPassword,
                }
            );

            toast.success(response.data.message);

            navigate("/");

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

        <div className="w-200 h-80 bg-white rounded-2xl shadow-2xl p-10">

            <div className="text-center mb-8">
                <br />

                <h1 className="text-4xl font-bold text-slate-800">
                    Reset Password
                </h1>

                <p className="mt-4 text-slate-500 leading-7">
                    Create a new password for your LeaveVerse account.
                </p>

            </div>

            <br />

            {/* New Password */}
            <div className="flex justify-center mb-6">

                <div className="relative w-100">

                    <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="  Enter new password"
                        autoComplete="new-password"
                        value={newPassword}
                        disabled={loading}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full h-11 rounded-xl border border-slate-300 bg-slate-50 px-2 pr-10 text-base text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
                    />

                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>

                </div>

            </div>
<br></br>
            {/* Confirm Password */}
            <div className="flex justify-center mb-8">

                <div className="relative w-100">

                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="  Confirm new password"
                        autoComplete="new-password"
                        value={confirmPassword}
                        disabled={loading}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        className="w-full h-11 rounded-xl border border-slate-300 bg-slate-50 px-2 pr-10 text-base text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
                    />

                    <button
                        type="button"
                        disabled={loading}
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                        {showConfirmPassword ? (
                            <FaEyeSlash />
                        ) : (
                            <FaEye />
                        )}
                    </button>

                </div>

            </div>
<br>
</br>
            {/* Button */}
            <div className="flex justify-center mt-8">

                <LoadingButton
                    loading={loading}
                    text="Reset Password"
                    loadingText="Resetting..."
                    onClick={handleSubmit}
                    className="w-72 h-12 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold shadow-lg"
                />

            </div>

            <p className="text-center text-sm text-slate-400 mt-8">
                © {new Date().getFullYear()} LeaveVerse
            </p>

        </div>

    </div>
);
};

export default ResetPassword;
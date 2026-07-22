import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";
import toast from "react-hot-toast";
import LoadingButton from "../../components/LoadingButton";
import { useTheme } from "../../context/ThemeContext";

import {
    CalendarDays,
    FileText,
    FolderOpen,
} from "lucide-react";

function ApplyLeave() {
    const [leaveType, setLeaveType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    const { theme } = useTheme();

    const handleApplyLeave = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const response = await api.post(
                "/leaves/apply",
                {
                    leaveType,
                    startDate,
                    endDate,
                    reason,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success(response.data.message);

            setLeaveType("");
            setStartDate("");
            setEndDate("");
            setReason("");
        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <br></br>
            <br></br>
            <br></br>

            <div className="flex justify-center py-10">

                <div className={`w-full max-w-3xl rounded-3xl shadow-2xl border p-12 transition-colors duration-300 ${theme === "dark"
                    ? "bg-slate-900 border-slate-700"
                    : "bg-white border-slate-200"
                    }`}>

                    {/* Heading */}

                    <div className="text-center mb-10">
                        <h1 className={`text-4xl font-bold transition-colors duration-300 ${theme === "dark"
                            ? "text-white"
                            : "text-slate-800"
                            }`}>
                            Apply Leave
                        </h1>

                        <p className={`mt-3 text-lg transition-colors duration-300 ${theme === "dark"
                            ? "text-slate-400"
                            : "text-slate-500"
                            }`}>
                            Submit your leave request by filling in the details below.
                        </p>

                    </div>

                    {/* Form */}

                    <div className={`rounded-2xl p-8 md:p-10 space-y-7 shadow-inner border transition-colors duration-300 ${theme === "dark"
                        ? "bg-linear-to-br from-slate-800 to-slate-900 border-slate-700"
                        : "bg-linear-to-br from-slate-50 to-blue-50 border-slate-200"
                        }`}>
                        {/* Leave Type */}

                        <div>

                            <label className={`flex items-center gap-2 mb-2 text-sm font-semibold transition-colors duration-300 ${theme === "dark"
                                ? "text-slate-200"
                                : "text-slate-700"
                                }`}>

                                <FolderOpen size={18} />

                                Leave Type

                            </label>

                            <select
                                value={leaveType}
                                disabled={loading}
                                onChange={(e) =>
                                    setLeaveType(e.target.value)
                                }
                                className={`w-full rounded-xl px-5 py-3.5 shadow-sm transition-all duration-300 outline-none ${theme === "dark"
                                    ? "bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 hover:border-blue-500 focus:ring-4 focus:ring-blue-900/40 focus:border-blue-500"
                                    : "bg-white border border-slate-200 text-slate-700 hover:border-blue-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                                    }`}>
                                <option value="">
                                    Select Leave Type
                                </option>
                                <option value="Casual">
                                    Casual Leave
                                </option>
                                <option value="Sick">
                                    Sick Leave
                                </option>
                                <option value="Paid">
                                    Paid Leave
                                </option>
                                <option value="Emergency">
                                    Emergency Leave
                                </option>
                            </select>

                        </div>

                        {/* Dates */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>

                                <label className={`flex items-center gap-2 mb-2 text-sm font-semibold transition-colors duration-300 ${theme === "dark"
                                    ? "text-slate-200"
                                    : "text-slate-700"
                                    }`}>

                                    <CalendarDays size={18} />

                                    Start Date

                                </label>

                                <input
                                    type="date"
                                    value={startDate}
                                    disabled={loading}
                                    onChange={(e) =>
                                        setStartDate(e.target.value)
                                    }
                                    className={`w-full rounded-xl px-5 py-3.5 shadow-sm transition-all duration-300 outline-none ${theme === "dark"
                                        ? "bg-slate-900 border border-slate-700 text-white hover:border-blue-500 focus:ring-4 focus:ring-blue-900/40 focus:border-blue-500"
                                        : "bg-white border border-slate-200 text-slate-700 hover:border-blue-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                                        }`} />

                            </div>

                            <div>

                                <label className={`flex items-center gap-2 mb-2 text-sm font-semibold transition-colors duration-300 ${theme === "dark"
                                    ? "text-slate-200"
                                    : "text-slate-700"
                                    }`}>

                                    <CalendarDays size={18} />

                                    End Date

                                </label>

                                <input
                                    type="date"
                                    value={endDate}
                                    disabled={loading}
                                    onChange={(e) =>
                                        setEndDate(e.target.value)
                                    }
                                    className={`w-full rounded-xl px-5 py-3.5 shadow-sm transition-all duration-300 outline-none ${theme === "dark"
                                        ? "bg-slate-900 border border-slate-700 text-white hover:border-blue-500 focus:ring-4 focus:ring-blue-900/40 focus:border-blue-500"
                                        : "bg-white border border-slate-200 text-slate-700 hover:border-blue-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                                        }`} />

                            </div>

                        </div>

                        {/* Reason */}

                        <div>

                            <label className={`flex items-center gap-2 mb-2 text-sm font-semibold transition-colors duration-300 ${theme === "dark"
                                ? "text-slate-200"
                                : "text-slate-700"
                                }`}>

                                <FileText size={18} />

                                Reason

                            </label>

                            <textarea
                                rows="4"
                                value={reason}
                                disabled={loading}
                                onChange={(e) =>
                                    setReason(e.target.value)
                                }
                                placeholder="Explain the reason for your leave..."
                                className={`w-full rounded-xl px-5 py-4 resize-none shadow-sm transition-all duration-300 outline-none ${theme === "dark"
                                        ? "bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 hover:border-blue-500 focus:ring-4 focus:ring-blue-900/40 focus:border-blue-500"
                                        : "bg-white border border-slate-200 text-slate-700 placeholder:text-slate-400 hover:border-blue-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                                    }`}
                            />
                        </div>

                    </div>

                    {/* Button */}

                    <div className="flex justify-center mt-8">

                        <LoadingButton
                            loading={loading}
                            text="Apply Leave"
                            loadingText="Applying..."
                            onClick={handleApplyLeave}
                            className="w-52 h-12 rounded-xl bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-semibold tracking-wide shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300" />

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default ApplyLeave;
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";
import toast from "react-hot-toast";
import StatusBadge from "../../components/StatusBadge";
import { useTheme } from "../../context/ThemeContext";

function ManagerLeaves() {

    const [leaves, setLeaves] = useState([]);
    const [loadingId, setLoadingId] = useState(null);

    const { theme } = useTheme();

    const fetchManagerLeaves = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/leaves/manager-leaves",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setLeaves(response.data.leaves);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchManagerLeaves();

    }, []);

    const updateStatus = async (leaveId, status) => {

        if (loadingId) return;

        setLoadingId(leaveId);

        try {

            const token = localStorage.getItem("token");

            const response = await api.put(
                `/leaves/manager-leaves/${leaveId}`,
                {
                    status,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success(response.data.message);

            fetchManagerLeaves();

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Something went wrong."
            );

        } finally {

            setLoadingId(null);

        }

    };

    return (

        <DashboardLayout>

            <br />
            <br />

            <div className="flex justify-center">

                <div className="w-full max-w-6xl">

                    {/* Heading */}

                    <div className="text-center mb-10">

                        <h1 className={`text-4xl font-bold transition-colors duration-300 ${theme === "dark"
                            ? "text-white"
                            : "text-slate-800"
                            }`}>
                            Manager Leave Requests
                        </h1>

                        <p className={`mt-3 text-lg transition-colors duration-300 ${theme === "dark"
                            ? "text-slate-400"
                            : "text-slate-500"
                            }`}>
                            Review and manage leave requests submitted by managers.
                        </p>

                        <br></br>

                    </div>

                    {/* Table */}

                    <div className={`rounded-xl shadow-xl border overflow-hidden transition-colors duration-300 ${theme === "dark"
                        ? "bg-slate-900 border-slate-700"
                        : "bg-white border-slate-200"
                        }`} >

                        <table className="w-full">

                            <thead>

                                <tr className="bg-linear-to-r from-blue-600 to-cyan-500 text-white">

                                    <th className="px-8 py-5 text-left font-semibold">
                                        Manager
                                    </th>

                                    <th className="px-8 py-5 text-left font-semibold">
                                        Leave Type
                                    </th>

                                    <th className="px-8 py-5 text-center font-semibold">
                                        Days
                                    </th>

                                    <th className="px-8 py-5 text-center font-semibold">
                                        Status
                                    </th>

                                    <th className="px-8 py-5 text-center font-semibold">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {leaves.length > 0 ? (

                                    leaves.map((leave) => (

                                        <tr
                                            key={leave._id}
                                            className={`border-b transition-all duration-300 ${theme === "dark"
                                                ? "border-slate-700 hover:bg-slate-800"
                                                : "border-slate-100 hover:bg-blue-50"
                                                }`}
                                        >

                                            <td className={`px-8 py-5 font-medium transition-colors duration-300 ${theme === "dark"
                                                ? "text-slate-100"
                                                : "text-slate-700"
                                                }`}>
                                                {leave.employee.fullName}
                                            </td>

                                            <td className={`px-8 py-5 transition-colors duration-300 ${theme === "dark"
                                                ? "text-slate-300"
                                                : "text-slate-600"
                                                }`}>
                                                {leave.leaveType}
                                            </td>

                                            <td className={`px-8 py-5 text-center font-semibold transition-colors duration-300 ${theme === "dark"
                                                ? "text-white"
                                                : "text-slate-700"
                                                }`}>
                                                {leave.totalDays}
                                            </td>

                                            <td className="px-8 py-5 text-center">
                                                <StatusBadge status={leave.status} />
                                            </td>

                                            <td className="px-8 py-5 text-center">

                                                {leave.status === "Pending" ? (

                                                    <div className="flex justify-center gap-2">

                                                        <button
                                                            onClick={() =>
                                                                updateStatus(
                                                                    leave._id,
                                                                    "Approved"
                                                                )
                                                            }
                                                            disabled={loadingId === leave._id}
                                                            className={`text-white px-4 py-2 rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed ${theme === "dark"
                                                                    ? "bg-emerald-600 hover:bg-emerald-700"
                                                                    : "bg-green-600 hover:bg-green-700"
                                                                }`}
                                                        >
                                                            {loadingId === leave._id
                                                                ? "Approving..."
                                                                : "Approve"}
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                updateStatus(
                                                                    leave._id,
                                                                    "Rejected"
                                                                )
                                                            }
                                                            disabled={loadingId === leave._id}
                                                            className={`text-white px-4 py-2 rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed ${theme === "dark"
                                                                    ? "bg-red-500 hover:bg-red-600"
                                                                    : "bg-red-600 hover:bg-red-700"
                                                                }`}                                                        >
                                                            {loadingId === leave._id
                                                                ? "Rejecting..."
                                                                : "Reject"}
                                                        </button>

                                                    </div>

                                                ) : (

                                                    <span className={`font-medium transition-colors duration-300 ${theme === "dark"
                                                        ? "text-slate-400"
                                                        : "text-slate-500"
                                                        }`}>
                                                        Completed
                                                    </span>

                                                )}

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className={`py-16 text-center text-lg transition-colors duration-300 ${theme === "dark"
                                                ? "text-slate-400"
                                                : "text-slate-500"
                                                }`}
                                        >
                                            No manager leave requests available.
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default ManagerLeaves;
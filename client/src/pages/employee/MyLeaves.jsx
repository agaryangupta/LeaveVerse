import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";
import StatusBadge from "../../components/StatusBadge";
import { useTheme } from "../../context/ThemeContext";

function MyLeaves() {
    const [leaves, setLeaves] = useState([]);
    const { theme } = useTheme();

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get(
                    "/leaves/my-leaves",
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

        fetchLeaves();
    }, []);

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
                            My Leave History
                        </h1>

                        <p className={`mt-3 text-lg transition-colors duration-300 ${theme === "dark"
                            ? "text-slate-400"
                            : "text-slate-500"
                            }`}>
                            View all your leave applications and their current status.
                        </p>
                        <br></br>
                    </div>

                    {/* Table Card */}

                    <div
                        className={`rounded-xl shadow-xl overflow-hidden border transition-colors duration-300 ${theme === "dark"
                            ? "bg-slate-900 border-slate-700"
                            : "bg-white border-slate-200"
                            }`}
                    >
                        <table className="w-full">

                            <thead>

                                <tr className="bg-linear-to-r from-blue-600 to-cyan-500 text-white">

                                    <th className="px-8 py-5 text-left font-semibold">
                                        Leave Type
                                    </th>

                                    <th className="px-8 py-5 text-center font-semibold">
                                        Start Date
                                    </th>

                                    <th className="px-8 py-5 text-center font-semibold">
                                        End Date
                                    </th>

                                    <th className="px-8 py-5 text-center font-semibold">
                                        Days
                                    </th>

                                    <th className="px-8 py-5 text-center font-semibold">
                                        Status
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
                                                }`}                                        >

                                            <td className={`px-8 py-5 font-medium transition-colors duration-300 ${theme === "dark"
                                                    ? "text-slate-100"
                                                    : "text-slate-700"
                                                }`}>
                                                {leave.leaveType}
                                            </td>

                                            <td className={`px-8 py-5 text-center transition-colors duration-300 ${theme === "dark"
                                                    ? "text-slate-300"
                                                    : "text-slate-600"
                                                }`}>
                                                {new Date(
                                                    leave.startDate
                                                ).toLocaleDateString()}
                                            </td>

                                            <td className={`px-8 py-5 text-center transition-colors duration-300 ${theme === "dark"
                                                    ? "text-slate-300"
                                                    : "text-slate-600"
                                                }`}>
                                                {new Date(
                                                    leave.endDate
                                                ).toLocaleDateString()}
                                            </td>

                                            <td className={`px-8 py-5 text-center font-semibold transition-colors duration-300 ${theme === "dark"
                                                    ? "text-white"
                                                    : "text-slate-700"
                                                }`}>
                                                {leave.totalDays}
                                            </td>

                                            <td className="px-8 py-5 text-center">
                                                <StatusBadge
                                                    status={leave.status}
                                                />
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
                                            No leave applications found.
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

export default MyLeaves;
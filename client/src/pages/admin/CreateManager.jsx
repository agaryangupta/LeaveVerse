import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import LoadingButton from "../../components/LoadingButton";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";

function CreateManager() {

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        designation: "",
        department: "IT",
        role: "manager",
    });

    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) return;

        setLoading(true);

        try {

            const token = localStorage.getItem("token");

            const response = await api.post(
                "/auth/create-user",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success(response.data.message);

            setFormData({
                fullName: "",
                email: "",
                phone: "",
                designation: "",
                department: "IT",
                role: "manager",
            });

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Something went wrong."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <DashboardLayout>

            <br />
            <br />

            <div className="flex justify-center">

                <div className="w-full max-w-3xl">

                    {/* Heading */}

                    <div className="text-center mb-10">

                        <h1 className={`text-4xl font-bold transition-colors duration-300 ${theme === "dark"
                            ? "text-white"
                            : "text-slate-800"
                            }`}>
                            Create Manager
                        </h1>

                        <p className={`mt-3 text-lg transition-colors duration-300 ${theme === "dark"
                            ? "text-slate-400"
                            : "text-slate-500"
                            }`}>
                            Add a new manager to your organization.
                        </p>

                    </div>
                    <br></br>

                    {/* Form Card */}

                    <div className={`rounded-xl shadow-xl border p-10 transition-colors duration-300 ${theme === "dark"
                        ? "bg-slate-900 border-slate-700"
                        : "bg-white border-slate-200"
                        }`}>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >

                            <div>

                                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${theme === "dark"
                                    ? "text-slate-300"
                                    : "text-slate-700"
                                    }`}>
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    disabled={loading}
                                    placeholder="Enter manager name"
                                    className={`w-full rounded-xl border px-4 py-3 outline-none transition-colors duration-300 focus:ring-2 focus:ring-blue-500 ${theme === "dark"
                                        ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
                                        : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500"
                                        }`} required
                                />

                            </div>

                            <div>

                                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${theme === "dark"
                                    ? "text-slate-300"
                                    : "text-slate-700"
                                    }`}>
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={loading}
                                    placeholder="Enter email address"
                                    className={`w-full rounded-xl border px-4 py-3 outline-none transition-colors duration-300 focus:ring-2 focus:ring-blue-500 ${theme === "dark"
                                        ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
                                        : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500"
                                        }`} required
                                />

                            </div>

                            <div className="grid md:grid-cols-2 gap-6">

                                <div>

                                    <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${theme === "dark"
                                        ? "text-slate-300"
                                        : "text-slate-700"
                                        }`}>
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={loading}
                                        placeholder="Enter phone number"
                                        className={`w-full rounded-xl border px-4 py-3 outline-none transition-colors duration-300 focus:ring-2 focus:ring-blue-500 ${theme === "dark"
                                            ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
                                            : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500"
                                            }`} required
                                    />

                                </div>

                                <div>

                                    <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${theme === "dark"
                                        ? "text-slate-300"
                                        : "text-slate-700"
                                        }`}>
                                        Designation
                                    </label>

                                    <input
                                        type="text"
                                        name="designation"
                                        value={formData.designation}
                                        onChange={handleChange}
                                        disabled={loading}
                                        placeholder="Enter designation"
                                        className={`w-full rounded-xl border px-4 py-3 outline-none transition-colors duration-300 focus:ring-2 focus:ring-blue-500 ${theme === "dark"
                                            ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
                                            : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500"
                                            }`} required
                                    />

                                </div>

                            </div>

                            <div>

                                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${theme === "dark"
                                    ? "text-slate-300"
                                    : "text-slate-700"
                                    }`}>
                                    Department
                                </label>

                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className={`w-full rounded-xl border px-4 py-3 outline-none transition-colors duration-300 focus:ring-2 focus:ring-blue-500 ${theme === "dark"
                                            ? "bg-slate-800 border-slate-700 text-white focus:border-blue-500"
                                            : "bg-white border-slate-300 text-slate-900 focus:border-blue-500"
                                        }`}                                >

                                    <option>IT</option>
                                    <option>HR</option>
                                    <option>Finance</option>
                                    <option>Marketing</option>

                                </select>

                            </div>

                            <div className="pt-4">

                                <LoadingButton
                                    loading={loading}
                                    text="Create Manager"
                                    loadingText="Creating Manager..."
                                    type="submit"
                                    className="w-full bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                                />

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default CreateManager;
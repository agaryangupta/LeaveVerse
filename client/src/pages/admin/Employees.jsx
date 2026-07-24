import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";
import { useTheme } from "../../context/ThemeContext";

function Employees() {

    const [employees, setEmployees] = useState([]);
    const { theme } = useTheme();

    useEffect(() => {

        const fetchEmployees = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await api.get(
                    "/auth/employees",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log("API Response:", response.data);
                setEmployees(response.data.employees);

            } catch (error) {

                console.error(error);

            }

        };

        fetchEmployees();

    }, []);

    return (

        <DashboardLayout>

            <br />
            <br />

            <div className="w-full flex justify-center">

                <div className="w-full max-w-6xl">

                    {/* Heading */}

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

                        <div>

                            <h1 className={`text-4xl font-bold transition-colors duration-300 ${theme === "dark"
                                ? "text-white"
                                : "text-slate-800"
                                }`}>
                                Employees
                            </h1>

                            <p className={`mt-3 text-lg transition-colors duration-300 ${theme === "dark"
                                ? "text-slate-400"
                                : "text-slate-500"
                                }`}>
                                Manage all employees in the organization.
                            </p>

                        </div>

                        {/* Total Employees */}

                        <div
                            className={`w-full lg:w-auto rounded-xl shadow-xl border px-6 py-5 text-center transition-colors duration-300 ${theme === "dark"
                                ? "bg-slate-900 border-slate-700"
                                : "bg-white border-slate-200"
                                }`}>

                            <p className={`text-sm transition-colors duration-300 ${theme === "dark"
                                ? "text-slate-400"
                                : "text-slate-500"
                                }`}>
                                Total Employees
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-blue-600">
                                {employees.length}
                            </h2>

                        </div>

                    </div>

                    <br></br>

                    {/* Table */}

                    <div className={`w-full rounded-xl shadow-xl border overflow-hidden transition-colors duration-300 ${theme === "dark"
                        ? "bg-slate-900 border-slate-700"
                        : "bg-white border-slate-200"
                        }`}>

                        <table className="w-full table-fixed">

                            <thead>

                                <tr className="bg-linear-to-r from-blue-600 to-cyan-500 text-white">

                                    <th className="px-8 py-5 text-left font-semibold">
                                        Employee ID
                                    </th>

                                    <th className="px-8 py-5 text-left font-semibold">
                                        Name
                                    </th>

                                    <th className="hidden md:table-cell px-8 py-5 text-left font-semibold">
                                        Email
                                    </th>

                                    <th className="hidden lg:table-cell px-8 py-5 text-left font-semibold">
                                        Department
                                    </th>

                                    <th className="hidden lg:table-cell px-8 py-5 text-left font-semibold">
                                        Designation
                                    </th>
                                </tr>

                            </thead>

                            <tbody>

                                {employees.length > 0 ? (

                                    employees.map((employee) => (

                                        <tr
                                            key={employee._id}
                                            className={`border-b transition-all duration-300 ${theme === "dark"
                                                ? "border-slate-700 hover:bg-slate-800"
                                                : "border-slate-100 hover:bg-blue-50"
                                                }`}
                                        >

                                            <td className={`px-8 py-5 font-medium transition-colors duration-300 ${theme === "dark"
                                                ? "text-white"
                                                : "text-slate-700"
                                                }`}>
                                                {employee.employeeId}
                                            </td>

                                            <td className={`px-8 py-5 transition-colors duration-300 ${theme === "dark"
                                                ? "text-slate-200"
                                                : "text-slate-700"
                                                }`}>
                                                {employee.fullName}
                                            </td>

                                            <td
                                                className={`hidden md:table-cell px-8 py-5 transition-colors duration-300 ${theme === "dark"
                                                        ? "text-slate-300"
                                                        : "text-slate-600"
                                                    }`}
                                            >
                                                {employee.email}
                                            </td>

                                            <td
                                                className={`hidden lg:table-cell px-8 py-5 transition-colors duration-300 ${theme === "dark"
                                                        ? "text-slate-300"
                                                        : "text-slate-600"
                                                    }`}
                                            >
                                                {employee.department}
                                            </td>

                                            <td
                                                className={`hidden lg:table-cell px-8 py-5 transition-colors duration-300 ${theme === "dark"
                                                        ? "text-slate-300"
                                                        : "text-slate-600"
                                                    }`}
                                            >
                                                {employee.designation}
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
                                            No employees found.
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

export default Employees;
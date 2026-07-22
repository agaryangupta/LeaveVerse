import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";
import toast from "react-hot-toast";

function AssignManager() {

    const [employeeId, setEmployeeId] = useState("");
    const [managerId, setManagerId] = useState("");
    const [employees, setEmployees] = useState([]);
    const [managers, setManagers] = useState([]);


    useEffect(() => {

        const fetchData = async () => {

            try {

                const token = localStorage.getItem("token");

                const employeeResponse = await api.get(
                    "/auth/employees",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const managerResponse = await api.get(
                    "/auth/managers",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setEmployees(employeeResponse.data.employees);
                setManagers(managerResponse.data.managers);

            } catch (error) {
                console.error(error);
            }

        };

        fetchData();

    }, []);

    const handleAssignManager = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.put(
                "/auth/assign-manager",
                {
                    employeeId,
                    managerId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success(response.data.message);

            setEmployeeId("");
            setManagerId("");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Something went wrong."
            );

        }

    };

    return (

        <DashboardLayout>

            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Assign Reporting Manager
                </h1>

                <div className="space-y-5">

                    <div>

                        <label className="block mb-2 font-medium">
                            Employee
                        </label>

                        <select
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            className="w-full border rounded-lg p-3"
                        >
                            <option value="">
                                Select Employee
                            </option>

                            {employees.map((employee) => (
                                <option
                                    key={employee._id}
                                    value={employee._id}
                                >
                                    {employee.fullName} ({employee.employeeId})
                                </option>
                            ))}

                        </select>

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">
                            Manager
                        </label>

                        <select
                            value={managerId}
                            onChange={(e) => setManagerId(e.target.value)}
                            className="w-full border rounded-lg p-3"
                        >
                            <option value="">
                                Select Manager
                            </option>

                            {managers.map((manager) => (
                                <option
                                    key={manager._id}
                                    value={manager._id}
                                >
                                    {manager.fullName} ({manager.employeeId})
                                </option>
                            ))}

                        </select>

                    </div>

                    <button
                        onClick={handleAssignManager}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                    >
                        Assign Manager
                    </button>

                </div>

            </div>

        </DashboardLayout>

    );
}

export default AssignManager;
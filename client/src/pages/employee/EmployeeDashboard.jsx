import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardCard from "../../components/dashboard/DashboardCard";
import api from "../../services/api";
import {
    CalendarDays,
    FileText,
    CheckCircle,
    XCircle,
} from "lucide-react";

function EmployeeDashboard() {

    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {

        const fetchDashboardData = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await api.get(
                    "/dashboard/employee",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setDashboardData(response.data);

            } catch (error) {
                console.error(error);
            }

        };

        fetchDashboardData();

    }, []);

    return (
        <DashboardLayout>

            {/* Page Heading */}

            <div className="text-center mb-12">
                <br></br>

                <p className="text-slate-500 text-lg mt-3">
                    Here's an overview of your leave details.
                </p>

                <br></br>
            </div>


            {/* Dashboard Cards */}

            <div className="flex justify-center">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">

                    <DashboardCard
                        title="Leave Balance"
                        value={dashboardData?.leaveBalance ?? 0}
                        icon={
                            <CalendarDays
                                size={34}
                                className="text-white"
                            />
                        }
                        color="bg-blue-600"
                    />

                    <DashboardCard
                        title="Total Applied"
                        value={dashboardData?.totalApplied ?? 0}
                        icon={
                            <FileText
                                size={34}
                                className="text-white"
                            />
                        }
                        color="bg-purple-600"
                    />

                    <DashboardCard
                        title="Approved Leaves"
                        value={dashboardData?.approved ?? 0}
                        icon={
                            <CheckCircle
                                size={34}
                                className="text-white"
                            />
                        }
                        color="bg-green-600"
                    />

                    <DashboardCard
                        title="Rejected Leaves"
                        value={dashboardData?.rejected ?? 0}
                        icon={
                            <XCircle
                                size={34}
                                className="text-white"
                            />
                        }
                        color="bg-red-600"
                    />

                </div>

            </div>

        </DashboardLayout>
    );
}

export default EmployeeDashboard;
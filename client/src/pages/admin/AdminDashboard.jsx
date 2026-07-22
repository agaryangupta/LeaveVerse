import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardCard from "../../components/dashboard/DashboardCard";
import api from "../../services/api";

import {
    Users,
    UserCog,
    Clock3,
    CheckCircle,
    XCircle,
} from "lucide-react";

function AdminDashboard() {

    const [stats, setStats] = useState({
        totalEmployees: 0,
        totalManagers: 0,
        pendingLeaves: 0,
        approvedLeaves: 0,
        rejectedLeaves: 0,
    });

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await api.get(
                    "/dashboard/admin",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setStats(response.data);

            } catch (error) {

                console.error(error);

            }

        };

        fetchDashboard();

    }, []);

    return (

        <DashboardLayout>

            {/* Heading */}

            <div className="text-center mb-12">

                <br></br>

                <p className="text-slate-500 text-lg mt-3">
                    Here's an overview of your organization.
                </p>

                <br></br>

            </div>

            {/* Top Row */}

            <div className="flex justify-center">

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-6xl">

                    <DashboardCard
                        title="Total Employees"
                        value={stats.totalEmployees}
                        icon={
                            <Users
                                size={34}
                                className="text-white"
                            />
                        }
                        color="bg-blue-600"
                    />

                    <DashboardCard
                        title="Total Managers"
                        value={stats.totalManagers}
                        icon={
                            <UserCog
                                size={34}
                                className="text-white"
                            />
                        }
                        color="bg-purple-600"
                    />

                    <DashboardCard
                        title="Pending Leaves"
                        value={stats.pendingLeaves}
                        icon={
                            <Clock3
                                size={34}
                                className="text-white"
                            />
                        }
                        color="bg-yellow-500"
                    />

                </div>

            </div>
            <br></br>
            {/* Bottom Row */}

            <div className="flex justify-center mt-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-205">

                    <DashboardCard
                        title="Approved Leaves"
                        value={stats.approvedLeaves}
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
                        value={stats.rejectedLeaves}
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

export default AdminDashboard;
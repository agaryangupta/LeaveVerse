import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardCard from "../../components/dashboard/DashboardCard";
import api from "../../services/api";

import {
    Users,
    Clock3,
    CheckCircle,
    XCircle,
} from "lucide-react";

function ManagerDashboard() {

    const [dashboard, setDashboard] = useState({
        teamSize: 0,
        pendingLeaves: 0,
        approvedLeaves: 0,
        rejectedLeaves: 0,
    });

    const fetchDashboard = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/dashboard/manager",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setDashboard(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        fetchDashboard();

    }, []);

    return (

        <DashboardLayout>

            <br />
            <br />

            {/* Heading */}

            <div className="mb-10 text-center">

                <p className="text-slate-500 text-lg mt-3">
                    Here's an overview of your team's leave statistics.
                </p>
                <br></br>

            </div>

            {/* Dashboard Cards */}

            <div className="flex justify-center">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">

                    <DashboardCard
                        title="Team Members"
                        value={dashboard.teamSize}
                        icon={
                            <Users
                                size={32}
                                className="text-white"
                            />
                        }
                        color="bg-indigo-600"
                    />

                    <DashboardCard
                        title="Pending Leaves"
                        value={dashboard.pendingLeaves}
                        icon={
                            <Clock3
                                size={32}
                                className="text-white"
                            />
                        }
                        color="bg-yellow-500"
                    />

                    <DashboardCard
                        title="Approved Leaves"
                        value={dashboard.approvedLeaves}
                        icon={
                            <CheckCircle
                                size={32}
                                className="text-white"
                            />
                        }
                        color="bg-green-600"
                    />

                    <DashboardCard
                        title="Rejected Leaves"
                        value={dashboard.rejectedLeaves}
                        icon={
                            <XCircle
                                size={32}
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

export default ManagerDashboard;
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";
import { useTheme } from "../../context/ThemeContext";

import {
    User,
    Mail,
    Phone,
    Building2,
    BadgeCheck,
    Briefcase,
    Shield,
    CalendarDays,
} from "lucide-react";

function Profile() {

    const [user, setUser] = useState(null);
    const { theme } = useTheme();

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await api.get(
                    "/auth/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setUser(response.data.user);

            } catch (error) {

                console.error(error);

            }

        };

        fetchProfile();

    }, []);

    if (!user) {

        return (

            <DashboardLayout>

                <div className="flex justify-center items-center h-[70vh]">

                    <p className={`text-xl transition-colors duration-300 ${theme === "dark"
                            ? "text-slate-400"
                            : "text-slate-500"
                        }`}>
                        Loading Profile...
                    </p>

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <br />
            <br />

            <div className="flex justify-center">

                <div className={`w-full max-w-5xl rounded-3xl shadow-xl border p-10 transition-colors duration-300 ${theme === "dark"
                        ? "bg-slate-900 border-slate-700"
                        : "bg-white border-slate-200"
                    }`}>

                    {/* Header */}

                    <div className="flex flex-col items-center">

                        <div className="w-28 h-28 rounded-full bg-linear-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">

                            <User
                                size={56}
                                className="text-white"
                            />

                        </div>

                        <h1 className={`mt-6 text-4xl font-bold transition-colors duration-300 ${theme === "dark"
                                ? "text-white"
                                : "text-slate-800"
                            }`}>

                            Admin Profile

                        </h1>

                        <p className={`mt-2 text-lg transition-colors duration-300 ${theme === "dark"
                                ? "text-slate-400"
                                : "text-slate-500"
                            }`}>

                            View your administrator information.

                        </p>

                    </div>

                    {/* Information */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">

                        <InfoCard
                            icon={<BadgeCheck size={22} />}
                            title="Employee ID"
                            value={user.employeeId}
                        />

                        <InfoCard
                            icon={<User size={22} />}
                            title="Full Name"
                            value={user.fullName}
                        />

                        <InfoCard
                            icon={<Mail size={22} />}
                            title="Email Address"
                            value={user.email}
                        />

                        <InfoCard
                            icon={<Phone size={22} />}
                            title="Phone Number"
                            value={user.phone}
                        />

                        <InfoCard
                            icon={<Building2 size={22} />}
                            title="Department"
                            value={user.department}
                        />

                        <InfoCard
                            icon={<Briefcase size={22} />}
                            title="Designation"
                            value={user.designation}
                        />

                        <InfoCard
                            icon={<Shield size={22} />}
                            title="Role"
                            value={user.role}
                        />

                        <InfoCard
                            icon={<CalendarDays size={22} />}
                            title="Leave Balance"
                            value="♾️"
                        />

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

function InfoCard({ icon, title, value }) {

    const { theme } = useTheme();

    return (

        <div className={`rounded-2xl p-6 border hover:shadow-lg transition-all duration-300 ${theme === "dark"
                ? "bg-slate-800 border-slate-700 hover:bg-slate-700"
                : "bg-slate-50 border-slate-200 hover:bg-blue-50"
            }`}>

            <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white">

                    {icon}

                </div>

                <div>

                    <p className={`text-sm transition-colors duration-300 ${theme === "dark"
                            ? "text-slate-400"
                            : "text-slate-500"
                        }`}>

                        {title}

                    </p>

                    <h3 className={`mt-1 text-lg font-semibold break-all transition-colors duration-300 ${theme === "dark"
                            ? "text-white"
                            : "text-slate-800"
                        }`}>

                        {value}

                    </h3>

                </div>

            </div>

        </div>

    );

}

export default Profile;
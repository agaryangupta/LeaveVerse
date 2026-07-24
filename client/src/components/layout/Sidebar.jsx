import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    FilePlus2,
    ClipboardList,
    Users,
    UserCog,
    UserCheck,
    User,
    LogOut,
    FileCheck,
} from "lucide-react";


import { useTheme } from "../../context/ThemeContext";

function Sidebar({ sidebarOpen, setSidebarOpen }) {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const { theme } = useTheme();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    const handleNavClick = () => {
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    };

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive
            ? "bg-blue-600 text-white"
            : theme === "dark"
                ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
        }`;

    return (
        <>
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div
                className={`fixed lg:fixed top-0 left-0 h-screen w-64 flex flex-col justify-between z-50 transform transition-transform duration-300
        ${sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                    }
        ${theme === "dark"
                        ? "bg-slate-900"
                        : "bg-white border-r border-slate-200"
                    }`}
            >
                <div>

                    <div
                        className={`p-6 transition-colors duration-300 ${theme === "dark"
                            ? "border-b border-slate-700"
                            : "border-b border-slate-200"
                            }`}
                    >
                        <h1
                            className={`text-3xl font-bold transition-colors duration-300 ${theme === "dark"
                                ? "text-white"
                                : "text-slate-800"
                                }`}
                        >                        LeaveVerse
                        </h1>

                        <br></br>

                    </div>

                    <nav className="p-4 flex flex-col gap-2">

                        <br></br>

                        {/* Employee */}

                        {user?.role === "employee" && (
                            <>
                                <NavLink
                                    to="/employee/dashboard"
                                    className={linkClass}
                                    onClick={handleNavClick}
                                >
                                    <LayoutDashboard size={20} />
                                    Dashboard
                                </NavLink>

                                <br></br>

                                <NavLink
                                    to="/employee/apply-leave"
                                    className={linkClass}
                                    onClick={handleNavClick}
                                >
                                    <FilePlus2 size={20} />
                                    Apply Leave
                                </NavLink>

                                <br></br>

                                <NavLink
                                    to="/employee/my-leaves"
                                    className={linkClass}
                                >
                                    <ClipboardList size={20} />
                                    My Leaves
                                </NavLink>

                                <br></br>

                                <NavLink
                                    to="/employee/profile"
                                    className={linkClass}
                                >
                                    <User size={20} />
                                    Profile
                                </NavLink>


                            </>
                        )}

                        {/* Manager */}

                        {user?.role === "manager" && (
                            <>
                                <NavLink
                                    to="/manager/dashboard"
                                    className={linkClass}
                                >
                                    <LayoutDashboard size={20} />
                                    Dashboard
                                </NavLink>

                                <NavLink
                                    to="/manager/apply-leave"
                                    className={linkClass}
                                >
                                    <FilePlus2 size={20} />
                                    Apply Leave
                                </NavLink>

                                <NavLink
                                    to="/manager/my-leaves"
                                    className={linkClass}
                                >
                                    <ClipboardList size={20} />
                                    My Leaves
                                </NavLink>

                                <NavLink
                                    to="/manager/team-leaves"
                                    className={linkClass}
                                >
                                    <Users size={20} />
                                    Team Leaves
                                </NavLink>

                                <NavLink
                                    to="/manager/employees"
                                    className={linkClass}
                                >
                                    <UserCheck size={20} />
                                    Employees
                                </NavLink>

                                <NavLink
                                    to="/manager/profile"
                                    className={linkClass}
                                >
                                    <User size={20} />
                                    Profile
                                </NavLink>
                            </>
                        )}

                        {/* Admin */}

                        {user?.role === "admin" && (
                            <>
                                <NavLink
                                    to="/admin/dashboard"
                                    className={linkClass}
                                >
                                    <LayoutDashboard size={20} />
                                    Dashboard
                                </NavLink>

                                <NavLink
                                    to="/admin/employees"
                                    className={linkClass}
                                >
                                    <UserCheck size={20} />
                                    Employees
                                </NavLink>

                                <NavLink
                                    to="/admin/create-employee"
                                    className={linkClass}
                                >
                                    <FilePlus2 size={20} />
                                    Create Employee
                                </NavLink>

                                <NavLink
                                    to="/admin/managers"
                                    className={linkClass}
                                >
                                    <UserCog size={20} />
                                    Managers
                                </NavLink>

                                <NavLink
                                    to="/admin/create-manager"
                                    className={linkClass}
                                >
                                    <FilePlus2 size={20} />
                                    Create Manager
                                </NavLink>


                                <NavLink
                                    to="/admin/manager-leaves"
                                    className={linkClass}
                                >
                                    <FileCheck size={20} />
                                    Manager Leave Requests
                                </NavLink>

                                <NavLink
                                    to="/admin/profile"
                                    className={linkClass}
                                >
                                    <User size={20} />
                                    Profile
                                </NavLink>
                            </>
                        )}

                    </nav>

                </div>

                <div
                    className={`p-4 transition-colors duration-300 ${theme === "dark"
                        ? "border-t border-slate-700"
                        : "border-t border-slate-200"
                        }`}
                >
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>

                </div>

            </div>
        </>
    );
}

export default Sidebar;
import { Moon, Sun, UserCircle2, Menu } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

function Navbar({ sidebarOpen, setSidebarOpen }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const { theme, toggleTheme } = useTheme();

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";

    return (
        <header
            className={`transition-colors duration-300 shadow-sm ${
                theme === "dark"
                    ? "bg-slate-900 border-b border-slate-700"
                    : "bg-white border-b border-slate-200"
            }`}
        >
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 lg:py-5">

                {/* Left */}
                <div className="flex items-center gap-3">

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className={`lg:hidden p-2 rounded-lg transition ${
                            theme === "dark"
                                ? "hover:bg-slate-800"
                                : "hover:bg-slate-200"
                        }`}
                    >
                        <Menu
                            size={24}
                            className={
                                theme === "dark"
                                    ? "text-white"
                                    : "text-slate-800"
                            }
                        />
                    </button>

                    <div>
                        <h1
                            className={`text-xl sm:text-2xl lg:text-3xl font-bold transition-colors duration-300 ${
                                theme === "dark"
                                    ? "text-white"
                                    : "text-slate-800"
                            }`}
                        >
                            {greeting}, {user?.fullName?.split(" ")[0]} 👋
                        </h1>

                        <p
                            className={`hidden sm:block mt-1 transition-colors duration-300 ${
                                theme === "dark"
                                    ? "text-slate-400"
                                    : "text-slate-500"
                            }`}
                        >
                            Welcome back! Manage your leaves effortlessly.
                        </p>
                    </div>

                </div>

                {/* Right */}
                <div className="flex items-center gap-3 sm:gap-5">

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border shadow-sm transition-all duration-300 ${
                            theme === "dark"
                                ? "bg-slate-800 border-slate-700 hover:bg-slate-700"
                                : "bg-white border-slate-300 hover:bg-slate-100"
                        }`}
                    >
                        {theme === "light" ? (
                            <Moon size={20} className="text-slate-700" />
                        ) : (
                            <Sun size={20} className="text-yellow-500" />
                        )}
                    </button>

                    {/* User Card */}
                    <div
                        className={`hidden md:flex items-center gap-3 rounded-3xl border px-4 py-2 transition-colors duration-300 ${
                            theme === "dark"
                                ? "bg-slate-800 border-slate-700"
                                : "bg-slate-200 border-slate-200"
                        }`}
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500">
                            <UserCircle2
                                size={24}
                                className="text-white"
                            />
                        </div>

                        <div>
                            <h2
                                className={`font-semibold transition-colors duration-300 ${
                                    theme === "dark"
                                        ? "text-white"
                                        : "text-slate-800"
                                }`}
                            >
                                {user?.fullName}
                            </h2>

                            <p
                                className={`text-sm capitalize transition-colors duration-300 ${
                                    theme === "dark"
                                        ? "text-slate-400"
                                        : "text-slate-500"
                                }`}
                            >
                                {user?.role}
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </header>
    );
}

export default Navbar;
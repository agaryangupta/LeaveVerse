import { Moon, Sun, UserCircle2 } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
    const user = JSON.parse(localStorage.getItem("user"));
    const { theme, toggleTheme } = useTheme();

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";
    else if (hour < 24) greeting = "Good Evening";

    return (
        <header
            className={`transition-colors duration-300 ${theme === "dark"
                ? "bg-slate-900 border-b border-slate-700"
                : "bg-white border-b border-slate-200"
                } shadow-sm`}
        >

            <div className="flex items-center justify-between px-8 py-5">

                {/* Left */}

                <div>

                    <h1 className={`text-3xl font-bold transition-colors duration-300 ${theme === "dark"
                        ? "text-white"
                        : "text-slate-800"
                        }`}>
                        {greeting}, {user?.fullName?.split(" ")[0]} 👋
                    </h1>

                    <p className={`mt-1 transition-colors duration-300 ${theme === "dark"
                        ? "text-slate-400"
                        : "text-slate-500"
                        }`}>
                        Welcome back! Manage your leaves effortlessly.
                    </p>

                </div>

                {/* Right */}

                <div className="flex items-center gap-5">

                    {/* Notification */}
                    <button
                        onClick={toggleTheme}
                        className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-sm transition-all duration-300 ${theme === "dark"
                            ? "bg-slate-800 border-slate-700 hover:bg-slate-700"
                            : "bg-white border-slate-300 hover:bg-slate-100"
                            }`}
                    >

                        {theme === "light" ? (

                            <Moon
                                size={20}
                                className={`${theme === "dark"
                                    ? "text-slate-200"
                                    : "text-slate-700"
                                    }`}
                            />

                        ) : (

                            <Sun
                                size={20}
                                className="text-yellow-500"
                            />

                        )}

                    </button>


                    {/* User */}

                    <div className={`flex items-center gap-3 rounded-3xl border px-4 py-2 transition-colors duration-300 ${theme === "dark"
                        ? "bg-slate-800 border-slate-700"
                        : "bg-slate-200 border-slate-200"
                        }`}>

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-r from-blue-600 to-cyan-500">

                            <UserCircle2
                                size={24}
                                className="text-white"
                            />

                        </div>

                        <div>

                            <h2 className={`font-semibold transition-colors duration-300 ${theme === "dark"
                                ? "text-white"
                                : "text-slate-800"
                                }`}>
                                {user?.fullName}
                            </h2>

                            <p className={`text-sm capitalize transition-colors duration-300 ${theme === "dark"
                                    ? "text-slate-400"
                                    : "text-slate-500"
                                }`}>
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
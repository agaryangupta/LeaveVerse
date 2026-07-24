import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

function DashboardLayout({ children }) {

    const { theme } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div
            className={`min-h-screen transition-colors duration-300 ${theme === "dark"
                ? "bg-slate-950"
                : "bg-slate-100"
                }`}
        >

            <div className="flex">

                {/* Sidebar */}
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                {/* Main Content */}
                <main className="flex-1 lg:ml-72">

                    {/* Navbar */}
                    <Navbar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />

                    {/* Page Content */}
                    <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10 pb-6 sm:pb-8">
                        {children}
                    </div>

                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;
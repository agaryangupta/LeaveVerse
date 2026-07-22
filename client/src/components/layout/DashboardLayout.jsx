import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useTheme } from "../../context/ThemeContext";

function DashboardLayout({ children }) {

    const { theme } = useTheme();

    return (
        <div
    className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
            ? "bg-slate-950"
            : "bg-slate-100"
    }`}
>

            <div className="flex">

                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 lg:ml-72">

                    {/* Navbar */}
                    <Navbar />

                    {/* Page Content */}
                    <div className="px-8 pt-10 pb-8">
                        {children}
                    </div>

                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;
import { useTheme } from "../../context/ThemeContext";

function DashboardCard({ title, value, icon, color }) {

    const { theme } = useTheme();

    return (
        <div
            className={`relative rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border h-56 ${theme === "dark"
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-slate-100"
                }`}
        >
            {/* Title */}
            <h3
                className={`absolute top-8 left-8 text-xl font-semibold transition-colors duration-300 ${theme === "dark"
                    ? "text-slate-400"
                    : "text-slate-500"
                    }`}
            >                {title}
            </h3>

            {/* Icon */}
            <div
                className={`absolute top-6 right-6 w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg ${color}`}
            >
                {icon}
            </div>

            {/* Number */}
            <div className="h-full flex items-center justify-center">

                <h2
                    className={`text-7xl font-bold transition-colors duration-300 ${theme === "dark"
                        ? "text-white"
                        : "text-slate-800"
                        }`}
                >                    {value}
                </h2>

            </div>

        </div>
    );
}

export default DashboardCard;
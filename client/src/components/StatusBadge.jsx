import { useTheme } from "../context/ThemeContext";

function StatusBadge({ status }) {

    const { theme } = useTheme();

    let badgeClass = "";

    switch (status) {

    case "Approved":

        badgeClass =
            theme === "dark"
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                : "bg-green-100 text-green-700";

        break;

    case "Rejected":

        badgeClass =
            theme === "dark"
                ? "bg-red-500/15 text-red-400 border border-red-500/30"
                : "bg-red-100 text-red-700";

        break;

    default:

        badgeClass =
            theme === "dark"
                ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                : "bg-yellow-100 text-yellow-700";
}

    return (
        <span
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${badgeClass}`}        >
            {status}
        </span>
    );
}

export default StatusBadge;
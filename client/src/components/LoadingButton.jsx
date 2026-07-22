function LoadingButton({
    loading = false,
    text,
    loadingText = "Loading...",
    type = "button",
    className = "",
    onClick,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={loading}
            className={`
                flex items-center justify-center gap-2
                rounded-xl
                font-semibold
                transition-all duration-300
                disabled:cursor-not-allowed
                disabled:opacity-70
                ${loading ? "" : ""}
                ${className}
            `}
        >
            {loading && (
                <svg
                    className="w-5 h-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                </svg>
            )}

            {loading ? loadingText : text}
        </button>
    );
}

export default LoadingButton;
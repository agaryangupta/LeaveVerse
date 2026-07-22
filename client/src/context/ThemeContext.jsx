import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

    const getTheme = () => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) return "light";

        return localStorage.getItem(`theme_${user.employeeId}`) || "light";

    };

    const [theme, setTheme] = useState(getTheme);

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {

            localStorage.setItem(
                `theme_${user.employeeId}`,
                theme
            );

        }

        if (theme === "dark") {

            document.documentElement.classList.add("dark");

        } else {

            document.documentElement.classList.remove("dark");

        }

    }, [theme]);

    const toggleTheme = () => {

        setTheme((prev) => (prev === "light" ? "dark" : "light"));

    };

const loadUserTheme = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    const savedTheme = user
        ? localStorage.getItem(`theme_${user.employeeId}`) || "light"
        : "light";

    setTheme(savedTheme);

};


    return (

        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
                loadUserTheme,
            }}
        >

            {children}

        </ThemeContext.Provider>

    );

}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {

    return useContext(ThemeContext);

}
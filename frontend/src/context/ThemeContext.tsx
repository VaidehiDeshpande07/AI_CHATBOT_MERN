// import { createContext, useState, useContext, ReactNode } from "react";

// type ThemeContextType = {
//     theme: string;
//     toggleTheme: () => void;
// };

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const ThemeProvider = ({ children }: { children: ReactNode }) => {
//     const [theme, setTheme] = useState<string>("dark"); // default theme is dark

//     const toggleTheme = () => {
//         setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"));
//     };

//     return (
//         <ThemeContext.Provider value={{ theme, toggleTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };

// export const useTheme = () => {
//     const context = useContext(ThemeContext);
//     if (!context) {
//         throw new Error("useTheme must be used within a ThemeProvider");
//     }
//     return context;
// };


import { createContext, useState, useContext, ReactNode, useEffect } from "react";

type ThemeContextType = {
    theme: string;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<string>("dark"); // default theme is dark

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"));
    };

    useEffect(() => {
        // Apply the theme to the body
        document.body.className = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

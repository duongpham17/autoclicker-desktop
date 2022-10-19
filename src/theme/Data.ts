export interface ThemeTypes {
    theme: "light" | "purple" | "green" | "yellow" | "night" | "orange" | "pink" | "blue"
    color: string,
}

export const data: ThemeTypes[] = [
    {
        theme: "light",
        color: "white",
    },
    {
        theme: "night",
        color: "black"
    },
    {
        theme: "purple",
        color: "black"
    },
    {
        theme: "green",
        color: "black",
    },
    {
        theme: "yellow",
        color: "rgb(20, 20, 20)",
    },
    {
        theme: "orange",
        color: "rgb(19, 19, 19)"
    },
    {
        theme: "pink",
        color: "rgb(19, 19, 19)"
    },
    {
        theme: "blue",
        color: "rgb(19, 19, 19)"
    }
]
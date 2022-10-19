export interface ThemeTypes {
    theme: "light" | "purple" | "matrix" | "electric" | "night" | "cave"
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
        theme: "matrix",
        color: "black",
    },
    {
        theme: "electric",
        color: "rgb(20, 20, 20)",
    },
    {
        theme: "cave",
        color: "rgb(19, 19, 19)"
    }
]
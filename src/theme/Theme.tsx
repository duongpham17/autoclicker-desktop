import './Theme.scss';
import {createContext, ReactNode, useLayoutEffect, useState, Dispatch, SetStateAction} from 'react';
import {localStorageSet} from 'utils';
import {ThemeTypes} from './Data';

export interface PropsTypes {
    theme: ThemeTypes,
    setTheme: Dispatch<SetStateAction<ThemeTypes>>
    onSetTheme: (theme: ThemeTypes) => void,
}

// for consuming in children components, initial return state
export const Context = createContext<PropsTypes>({
    theme: {
        theme: "light",
        color: "",
    },
    setTheme: () => null,
    onSetTheme: () => null
});

// Provider in your app
export const Theme = ({children}: {children: ReactNode}) => {

    const initialState = {theme: "light", color: ""};

    const saved_theme = localStorage.getItem("theme");

    const theme_state = saved_theme ? JSON.parse(saved_theme) : initialState;

    const [theme, setTheme] = useState<ThemeTypes>(theme_state)

    useLayoutEffect(() => { document.body.style.background = theme.color }, [theme]);

    const onSetTheme = (theme: ThemeTypes) => {
        localStorageSet("theme", theme);
        setTheme(theme);
    }

    const value: PropsTypes = {
        theme,
        setTheme,
        onSetTheme,
    };
  
    return (
        <Context.Provider value={value}>
            <div className={`theme-${theme.theme}`}>
                {children}
            </div>
        </Context.Provider>
    )
};

export default Theme
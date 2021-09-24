import {THEME_STYLES} from "./constants";
import {createContext} from "react";

export const commonTheme = {
    overrides: {
        MuiCssBaseline: {
            "@global": {
                "main > div:not(:first-child)": {
                    paddingTop: "5em",
                },
            },
        },
    },
    underscore: {
        textAlign: "center",
        position: "relative",
        "&::after": {
            content: "''",
            position: "absolute",
            left: "50%",
            bottom: 0,
            width: 50,
            height: 1,
            marginLeft: -25,
            backgroundColor: "#d65050",
        },
    },
};

const initialContext = {
    style: THEME_STYLES.light,
    toggleStyle: () => {},
};

export const ThemeContext = createContext(initialContext);
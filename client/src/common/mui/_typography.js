import { createTheme } from "@mui/material/styles";

const typographyDefault = createTheme({
    typography: {
        h1: {
            fontSize: "2rem",
        },
        h2: {
            fontSize: "1.5rem",
        },
        h3: {
            fontSize: "1.25rem",
        },
        h4: {
            fontSize: "1.125rem",
        },
        h5: {
            fontSize: "1rem",
        },
        h6: {
            fontSize: "0.75rem",
        },
        subtitle1: {
            fontSize: "1.125rem",
        },
        subtitle2: {
            fontSize: "0.75rem",
        },
        body1: {
            fontWeight: "1rem",
        },
        button: {
            fontSize: "1.25rem",
            color: "white",
            backgroundColor: "primary",
            border: "1px solid white",
        },
        buttonOutline: {
            fontSize: "1.25rem",
            color: "primary",
            backgroundColor: "white",
            border: "1px solid primary",
        },
    },
});

export default typographyDefault;

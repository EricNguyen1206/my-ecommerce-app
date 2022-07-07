import { createTheme } from "@mui/material/styles";

const palette = (prim = 210, sec = 290) =>
    createTheme({
        palette: {
            primary: {
                main: `hsl(${prim},79%,46%)`,
                light: `hsl(${prim},90%,61%)`,
                dark: `hsl(${prim},80%,42%)`,
                contrastText: "#fff",
            },
            secondary: {
                main: `hsl(${sec},64%,42%)`,
                light: `hsl(${sec},46%,88%)`,
                dark: `hsl(${sec},68%,38%)`,
                contrastText: "#fff",
            },
        },
    });

export default palette;

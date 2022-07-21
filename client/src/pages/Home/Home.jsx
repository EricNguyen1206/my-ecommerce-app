import { Box, createTheme, ThemeProvider } from "@mui/material";
import {
    Announcement,
    Banner,
    Categories,
    Footer,
    Header,
    Newsletter,
    Products,
    Slider,
} from "../../components";
import { useMode } from "../../hooks";

const Home = () => {
    const { mode } = useMode();
    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <Box bgcolor={"background.default"} color={"text.primary"}>
                <Announcement />
                <Header />
                <Banner />
                <Slider cat="new" />
                <Categories />
                <Products limit={8} />
                <Newsletter />
                <Footer />
            </Box>
        </ThemeProvider>
    );
};

export default Home;

import { AppBar, Stack, styled, Typography } from "@mui/material";
import "./Announcement.scss";

const StyledAnnouncement = styled(AppBar)(({ theme }) => ({
    height: "32px",
    backgroundColor: theme.palette.primary.light,
    zIndex: 10,
}));

const Announcement = () => {
    return (
        <StyledAnnouncement position="sticky">
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ height: "100%" }}
            >
                <Typography variant="h5" components="span">
                    Super Deal! Free Shipping on Orders Over $50
                </Typography>
            </Stack>
        </StyledAnnouncement>
    );
};

export default Announcement;

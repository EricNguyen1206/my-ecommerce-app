import { Send } from "@mui/icons-material";
import { Container, Typography, styled, Button } from "@mui/material";

const Section = styled(Container)(({ theme }) => ({
    backgroundColor: theme.palette.background,
}));
const SectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: 20,
    color: theme.palette.primary,
}));
const SectionSubtitle = styled(Typography)(({ theme }) => ({
    fontSize: 14,
    color: theme.palette.primary,
}));
const Newsletter = () => {
    return (
        <Section sx={{ height: "50%", width: "100%" }}>
            <SectionTitle variant="h1" components="h2">
                Newsletter
            </SectionTitle>
            <SectionSubtitle variant="subtitle1" components="span">
                Get timely updates from your favorite products.
            </SectionSubtitle>
            <div className="contact">
                <input placeholder="Your email" />
                <Button>
                    <Send />
                </Button>
            </div>
        </Section>
    );
};

export default Newsletter;

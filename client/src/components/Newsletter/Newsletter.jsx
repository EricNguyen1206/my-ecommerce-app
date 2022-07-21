import { Send } from "@mui/icons-material";
import { Container, Typography, styled, Button } from "@mui/material";
import PrimaryButton from "../../common/mui/components/PrimaryButton";

const Section = styled(Container)(({ theme }) => ({
    backgroundColor: theme.palette.background,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
        <Section sx={{ height: "500px", width: "100%" }}>
            <SectionTitle variant="h1" components="h2">
                Newsletter
            </SectionTitle>
            <SectionSubtitle variant="subtitle1" components="span">
                Get timely updates from your favorite products.
            </SectionSubtitle>
            <div className="contact">
                <input placeholder="Your email" />
                <PrimaryButton>
                    <Send />
                </PrimaryButton>
            </div>
        </Section>
    );
};

export default Newsletter;

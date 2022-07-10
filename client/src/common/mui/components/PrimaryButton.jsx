import { Button, styled } from "@mui/material";
const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary,
    borderRadius: 1,
    color: theme.palette.primary.contrastText,
    height: 48,
    fontSize: 16,
    "&:hover": {
        backgroundColor: theme.palette.primary.light,
        borderColor: theme.palette.primary,
        boxShadow: "none",
    },
}));

const PrimaryButton = ({ children }) => {
    return <StyledButton variant="contained">{children}</StyledButton>;
};

export default PrimaryButton;

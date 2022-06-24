import { useEffect } from "react";
import { useState } from "react";
import { Alert } from "reactstrap";

const AlertCustom = ({ open, type, message }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        open && setVisible(true);
    }, [open]);
    return (
        <Alert
            color="warning"
            isOpen={visible}
            toggle={() => window.setTimeout(() => setVisible(false), 3000)}
        >
            Plese login before purchase
        </Alert>
    );
};

export default AlertCustom;

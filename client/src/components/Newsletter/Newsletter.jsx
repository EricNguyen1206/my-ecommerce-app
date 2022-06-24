import { Send } from "@mui/icons-material";
import "./Newsletter.scss";

const Newsletter = () => {
    return (
        <div className="newsletter">
            <h1>Newsletter</h1>
            <span>Get timely updates from your favorite products.</span>
            <div className="contact">
                <input placeholder="Your email" />
                <button>
                    <Send />
                </button>
            </div>
        </div>
    );
};

export default Newsletter;

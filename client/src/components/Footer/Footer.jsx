import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Pinterest,
    Room,
    Twitter,
} from "@mui/icons-material";
import "./Footer.scss";

const Footer = () => {
    return (
        <div className="footer">
            <div className="left">
                <h1>ERIC.</h1>
                <p className="description">
                    ERIC. is a company thay ensures it provides casual clothes
                    for all kinds of people.
                </p>
                <div className="social-container">
                    <div className="social-container__icon">
                        <Facebook />
                    </div>
                    <div className="social-container__icon">
                        <Instagram />
                    </div>
                    <div className="social-container__icon">
                        <Twitter />
                    </div>
                    <div className="social-container__icon">
                        <Pinterest />
                    </div>
                </div>
            </div>
            <div className="center">
                <h3>Discover Me</h3>
                <ul>
                    <li>Home</li>
                    <li>Cart</li>
                    <li>Man Fashion</li>
                    <li>Woman Fashion</li>
                    <li>Accessories</li>
                    <li>My Account</li>
                    <li>Order Tracking</li>
                    <li>Wishlist</li>
                    <li>Terms</li>
                </ul>
            </div>
            <div className="right">
                <h3>Contact</h3>
                <div className="contact-items">
                    <Room style={{ marginRight: "10px" }} /> Thu Duc City , Ho
                    Chi Minh City
                </div>
                <div className="contact-items">
                    <Phone style={{ marginRight: "10px" }} /> +1 234 56 78
                </div>
                <div className="contact-items">
                    <MailOutline style={{ marginRight: "10px" }} />{" "}
                    11a1eric3@gmail.com
                </div>
                <img
                    className="payment"
                    src="https://i.ibb.co/Qfvn4z6/payment.png"
                    alt="payment"
                />
            </div>
        </div>
    );
};

export default Footer;

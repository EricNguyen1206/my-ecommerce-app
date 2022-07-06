import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { sliderItems } from "../../data";
import "./Banner.scss";

const Banner = () => {
    const [slideindex, setSlideindex] = useState(0);
    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideindex(slideindex > 0 ? slideindex - 1 : 2);
        } else {
            setSlideindex(slideindex < 2 ? slideindex + 1 : 0);
        }
    };

    return (
        <div className="banner">
            <div className="arrow left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlined />
            </div>
            <div
                className="banner__wrapper"
                style={{ transform: `translateX(${slideindex * -100}vw)` }}
            >
                {sliderItems.map((item) => (
                    <div
                        className="banner__content"
                        key={item.id}
                        style={{ backgroundColor: `#${item.bg}` }}
                    >
                        <div className="banner__content--img">
                            <img src={item.img} alt="banner" />
                        </div>
                        <div className="banner__content--info">
                            <h1>{item.title}</h1>
                            <p>{item.desc}</p>
                            <Link to={`/products/new`}>
                                <button>SHOW NOW</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div
                className="arrow right"
                direction="right"
                onClick={() => handleClick("right")}
            >
                <ArrowRightOutlined />
            </div>
        </div>
    );
};

export default Banner;

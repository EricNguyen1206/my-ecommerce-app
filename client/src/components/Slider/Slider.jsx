import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { useState } from "react";
import { sliderItems } from "../../data";
import "./Slider.scss";

const Slider = () => {
    const [slideindex, setSlideindex] = useState(0);
    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideindex(slideindex > 0 ? slideindex - 1 : 2);
        } else {
            setSlideindex(slideindex < 2 ? slideindex + 1 : 0);
        }
    };

    return (
        <div className="slider">
            <div className="arrow left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlined />
            </div>
            <div
                className="slider__wrapper"
                style={{ transform: `translateX(${slideindex * -100}vw)` }}
            >
                {sliderItems.map((item) => (
                    <div
                        className="slider__content"
                        key={item.id}
                        style={{ backgroundColor: `#${item.bg}` }}
                    >
                        <div className="image-container">
                            <img src={item.img} alt="sliderimg" />
                        </div>
                        <div className="slider__info">
                            <h1>{item.title}</h1>
                            <p>{item.desc}</p>
                            <button>SHOW NOW</button>
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

export default Slider;

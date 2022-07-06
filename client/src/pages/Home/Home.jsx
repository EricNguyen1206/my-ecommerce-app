import React, { Suspense } from "react";
import {
    Announcement,
    Navbar,
    Banner,
    Categories,
    Products,
    Newsletter,
    Footer,
    Slider,
} from "../../components";

// const Slider = React.lazy(() => import("../../components/Slider/Slider"));
const Home = () => {
    return (
        <div className="home">
            <Announcement />
            <Navbar />
            <Banner />
            <Slider cat="new" />
            <Categories />
            <Products limit={8} />
            <Newsletter />
            <Footer />
        </div>
    );
};

export default Home;

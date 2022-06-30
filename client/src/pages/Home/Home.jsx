import {
    Announcement,
    Navbar,
    Slider,
    Categories,
    Products,
    Newsletter,
    Footer,
} from "../../components";

const Home = () => {
    return (
        <div className="home">
            <Announcement />
            <Navbar />
            <Slider />
            <Categories />
            <Products limit={8} />
            <Newsletter />
            <Footer />
        </div>
    );
};

export default Home;

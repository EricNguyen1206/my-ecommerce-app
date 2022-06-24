import { Link } from "react-router-dom";
import "./CategoryItem.scss";

const CategoryItem = ({ item }) => {
    return (
        <div className="category-item">
            <Link to={`/products/${item.cat}`}>
                <img src={item.img} alt="category" />
                <div className="category-item__info">
                    <h1>{item.title}</h1>
                    <button>SHOP NOW</button>
                </div>
            </Link>
        </div>
    );
};

export default CategoryItem;

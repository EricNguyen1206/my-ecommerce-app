import { Link } from "react-router-dom";
import "./Product.scss";

const Product = ({ item }) => {
    function truncate(string, n) {
        return string.length > n ? string.substring(0, n - 1) + "..." : string;
    }
    return (
        <Link to={`/product/${item._id}`} className="product">
            <div className="product-card">
                <img
                    src={item.img}
                    width={250}
                    height={250}
                    className="product-image"
                    alt="product-img"
                />
                <p className="product-name">{truncate(item.title, 28)}</p>
                <p className="product-price">
                    <span
                        className="product-sale"
                        style={{
                            textDecoration: `${
                                item.sale ? "line-through" : "none"
                            }`,
                        }}
                    >
                        ${item.price}
                    </span>
                    {item.sale && (
                        <span
                            className="product-sale"
                            style={{
                                marginLeft: 10,
                                fontSize: "1.2rem",
                                color: "#f02d34",
                            }}
                        >
                            ${item.sale}
                        </span>
                    )}
                </p>
                {item.categories.includes("new") && <p className="new">NEW</p>}
            </div>
        </Link>
    );
};

export default Product;

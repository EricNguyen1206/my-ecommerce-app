import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./Product.scss";

const Product = ({ item }) => {
    return (
        <div className="product">
            <div className="circle" />
            <img
                src={`https://drive.google.com/uc?export=view&id=${item.img}`}
                alt="product"
            />
            <div className="product__detail">
                <p className="product__detail--name">{item.title}</p>
                <p className="product__detail--price">${item.price}</p>
            </div>
            <div className="product__info">
                <div className="product__icon">
                    <ShoppingCartOutlined />
                </div>
                <div className="product__icon">
                    <Link to={`/product/${item._id}`}>
                        <SearchOutlined />
                    </Link>
                </div>
                <div className="product__icon">
                    <FavoriteBorderOutlined />
                </div>
            </div>
        </div>
    );
};

export default Product;

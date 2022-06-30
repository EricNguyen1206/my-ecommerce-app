// import {
//     FavoriteBorderOutlined,
//     SearchOutlined,
//     ShoppingCartOutlined,
// } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./Product.scss";

const Product = ({ item }) => {
    function truncate(string, n) {
        return string.length > n ? string.substring(0, n - 1) + "..." : string;
    }
    return (
        // <div className="product">
        //     <div className="circle" />
        //     <img src={item.img} alt="product" />
        //     <div className="product__detail">
        //         <p className="product__detail--name">{item.title}</p>
        //         <p className="product__detail--price">${item.price}</p>
        //     </div>
        //     <div className="product__info">
        //         <div className="product__icon">
        //             <ShoppingCartOutlined />
        //         </div>
        //         <div className="product__icon">
        //             <Link to={`/product/${item._id}`}>
        //                 <SearchOutlined />
        //             </Link>
        //         </div>
        //         <div className="product__icon">
        //             <FavoriteBorderOutlined />
        //         </div>
        //     </div>
        // </div>
        <div>
            <Link to={`/product/${item._id}`}>
                <div className="product-card">
                    <img
                        src={item.img}
                        width={250}
                        height={250}
                        className="product-image"
                        alt="product-img"
                    />
                    <p className="product-name">{truncate(item.title, 28)}</p>
                    <p className="product-price">${item.price}</p>
                </div>
            </Link>
        </div>
    );
};

export default Product;

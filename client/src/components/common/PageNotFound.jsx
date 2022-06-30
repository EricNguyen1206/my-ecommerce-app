import { Link } from "react-router-dom";

function PageNotFound() {
    return (
        <div
            className="page-not-found"
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignitems: "center",
                fontSize: "1.2rem",
            }}
        >
            <h1
                style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#324d67",
                }}
            >
                Something went wrong!
                <br />
                Page not found!
                <br />
                Or you are not permissions to access this page
            </h1>
            <Link to="/">
                <button
                    className="btn"
                    style={{
                        display: "flex",
                        margin: "auto",
                        padding: "20px 40px",
                        border: "none",
                        color: "white",
                        backgroundColor: "#f02d34",
                        fontSize: "2rem",
                        cursor: "pointer",
                    }}
                >
                    Home
                </button>
            </Link>
        </div>
    );
}

export default PageNotFound;

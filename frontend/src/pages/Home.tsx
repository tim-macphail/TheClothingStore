import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh"
    }}>
        <h1>THE CLO👕HING STORE</h1>
        <div style={{
            outline: "1px solid blue",
            display: "flex",
        }}>
            <textarea
                style={{
                    width: "20rem",
                    height: "2rem",
                    resize: "none",
                }}
                placeholder="SEARCH"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            ></textarea>
            <Link to={`/search?query=${encodeURIComponent(searchQuery)}`}
                style={{
                    height: "100%",
                }}
            >
                <button
                    style={{
                        height: "100%",
                    }}
                >🔎</button>
            </Link>
        </div>
    </div >;
}
export default Home;
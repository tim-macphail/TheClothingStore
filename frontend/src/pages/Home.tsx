import { Link } from "react-router-dom";

const Home = () => <div style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh"
}}>
    <h1>THE CLOT👕HING STORE</h1>
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
        ></textarea>
        <Link to="/browse"
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
</div>;
export default Home;
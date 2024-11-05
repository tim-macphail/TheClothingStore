const Home = () => <div style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh"
}}>
    <h1>THE CLOTHING STORE</h1>
    <div style={{
        outline: "1px solid red",
        padding: "0",
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
        <button>🔎</button>
    </div>
</div>;
export default Home;
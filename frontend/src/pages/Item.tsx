const Item = () => <div>
    <h1>{window.location.pathname.slice("/item/".length).toUpperCase()
    }</h1>
</div>;

export default Item;
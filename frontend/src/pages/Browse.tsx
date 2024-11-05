import { items } from '../mockdatastore'
import shirt from "../assets/shirtemoji.png"
import { Link } from 'react-router-dom';
import './index.css';

const Browse = () => <div
    style={{
        display: "flex",
        flexDirection: "column",
    }} >
    <h1 style={{
        outline: "1px solid blue",
    }} >{window.location.pathname.slice(1).toUpperCase().replace("/", " > ")
        }</h1>
    <div style={{
        display: "flex",
        outline: "1px solid green",
    }}>
        <div style={{
            width: "20%",
            display: "flex",
            flexDirection: "column",
        }}>
            <p>filters</p>
            <ul>
                <li>price</li>
                <li>style</li>
                <li>size</li>
                <li>color</li>
            </ul>
        </div>
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 2fr)",
            outline: "1px solid pink",
            width: "80%",
        }} >{
                items.map((item) => (
                    <Link key={item.name}
                        to={`/item/${item.name}`}
                        style={{
                            outline: "1px solid blue",
                            display: "flex",
                            flexDirection: "column",
                            textDecoration: "none",
                            backgroundColor: "white",
                        }}
                        className='hover-enlarge' >
                        <img src={shirt} alt="shirt picture" width={"100%"} />
                        <div style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                        }}>
                            <p>${item.price}</p>
                            <p>{item.name}</p>
                        </div>
                    </Link>
                ))}
        </div>
    </div>
</div>;

export default Browse;
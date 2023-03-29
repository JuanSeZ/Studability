import {Link} from "react-router-dom";

export default function HomePage() {
    return (
        <div style={{justifyContent: "center"}}>
            <h1>Studability, study smart</h1>
            <Link to='./'>
                <button type="button" className="btn btn-outline-danger">Log Out</button>
            </Link>
</div>

)
}
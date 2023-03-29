import * as React from 'react'
import {Link} from "react-router-dom";
import StudabilityLogo from "../images/StudabilityLogo.png"

export default function MainPage() {
    return (
        <div>
            <br/>
            <br/>
            <br/>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
                <img style={{width: 400, height: 400}} src={StudabilityLogo} className="logo" alt=""/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '0vh'}}>
                <h1>Studability</h1>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh'}}>
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <Link to="/register"><button type="button" className="btn btn-outline-primary">Register</button></Link>
                    <Link to="/login"><button type="button" className="btn btn-outline-primary">Log In</button></Link>
                </div>
            </div>
        </div>
    )
}

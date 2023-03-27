import * as React from 'react'
import {Link} from "react-router-dom";

export default function MainPage() {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/login">Log In</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
            </ul>
        </div>
    )
}

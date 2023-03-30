import {Link} from "react-router-dom";
import {useStudability} from "../service/Studability";
import {useState} from "react";
import {useNavigate} from "react-router";
import {useAuthProvider} from "../auth/auth"
import button from "bootstrap/js/src/button";
import Dropdown from 'react-bootstrap/Dropdown';


export default function HomePage() {
    const auth = useAuthProvider()
    const studability = useStudability()
    const [errorMsg, setErrorMsg] = useState(undefined)
    const navigate = useNavigate()

    function logout() {
        let userToken;
        userToken = auth.getToken();
        studability.logout(userToken,
            () => {
                auth.removeToken(userToken)
                navigate("/", {replace: true});
            },
            (msg) => {
                setErrorMsg(msg)
            })
    }


    return (
        <div>
            <div style={{justifyContent: "center", alignItems: "center", display: "flex"}}>
                <h1>Studability, study smart</h1>
            </div>

            <div>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Menu
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div style={{display: "flex", justifyContent: "center"}}>
                <button type="button" onClick={logout} className="btn btn-outline-danger">Log Out</button>
            </div>
        </div>

    )
}
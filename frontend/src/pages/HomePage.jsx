import {useStudability} from "../service/Studability";
import {useState} from "react";
import {useNavigate} from "react-router";
import {useAuthProvider} from "../auth/auth"
import button from "bootstrap/js/src/button";
import Dropdown from 'react-bootstrap/Dropdown';
import StudabilityLogo from "../images/StudabilityLogo.png";
import * as React from "react";


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
            <br/>
            <div>
                <div>

                    <div style={{justifyContent: "center", alignItems: "center", display: "flex"}}>
                        <img style={{width: 90, height: 90}} src={StudabilityLogo} className="logo" alt=""/>
                        <h1>Studability, study smart</h1>

                        <div style={{marginLeft: 650}}>
                            <Dropdown>

                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Menu
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/home/calendar">Calendar</Dropdown.Item>
                                    <Dropdown.Item href="/files">Files</Dropdown.Item>
                                    <Dropdown.Item href="/friends">Friends</Dropdown.Item>
                                    <Dropdown.Item href="/studytime">StudyTime</Dropdown.Item>
                                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                                </Dropdown.Menu>

                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>

            {/*<div style={{justifyContent: "flex-end", alignItems: "center", display: "flex"}}>*/}
            {/*    <Dropdown>*/}
            {/*        <Dropdown.Toggle variant="success" id="dropdown-basic">*/}
            {/*            Menu*/}
            {/*        </Dropdown.Toggle>*/}

            {/*        <Dropdown.Menu>*/}
            {/*            <Dropdown.Item href="#/calendar">Calendar</Dropdown.Item>*/}
            {/*            <Dropdown.Item href="#/action-2">Files</Dropdown.Item>*/}
            {/*            <Dropdown.Item href="#/action-3">Friends</Dropdown.Item>*/}
            {/*            <Dropdown.Item href="#/action-2">StudyTime</Dropdown.Item>*/}
            {/*            <Dropdown.Item href="#/action-2">Profile</Dropdown.Item>*/}
            {/*        </Dropdown.Menu>*/}
            {/*    </Dropdown>*/}
            {/*</div>*/}

            <div style={{display: "flex", justifyContent: "center"}}>
                <button type="button" onClick={logout} className="btn btn-outline-danger">Log Out</button>
            </div>
        </div>

    )
}
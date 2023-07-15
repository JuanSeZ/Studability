import * as React from "react";
import ToDoList from "../components/ToDoList";
import MyNavbar from "../components/MyNavbar";
import Swal from 'sweetalert2';
import {useStudability} from "../service/Studability";
import {useAuthProvider} from "../auth/auth";
import {useState} from "react";
import 'sweetalert2/src/sweetalert2.scss'
import {useSearchParams} from "react-router-dom";
import Feed from "../components/Feed";
import "../styles/HomePageStyle.css"

export default function HomePage() {

    const studability = useStudability();
    let token = useAuthProvider().getToken();
    const [username, setUsername] = useState('');
    const [searchParams] = useSearchParams();
    const [recentLog, setRecentLog] = useState(true)

    const name = searchParams.get("name")

    function handleLogIn() {
        studability.getUser(
            token,
            () => {searchParams.get("ok")
            },
            () => "Error"
        );
    }

    return (
        <div> {name && handleLogIn()}
            <row>
                <MyNavbar/>
            </row>
            <row>
                <div class="todoListColumn">
                    <ToDoList/>
                </div>
                <div className="feedColumn">
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <h1 className="header">
                            <header>Friend's Files</header>
                        </h1>
                    </div>
                    <div style={{height: 600, width: 1100, overflowY: "scroll"}}>
                        <Feed/>
                    </div>
                </div>
            </row>
        </div>
    )
}
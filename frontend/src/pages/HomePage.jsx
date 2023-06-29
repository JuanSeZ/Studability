import * as React from "react";
import ToDoList from "../components/ToDoList";
import MyNavbar from "../components/MyNavbar";
import Swal from 'sweetalert2';
import {useStudability} from "../service/Studability";
import {useAuthProvider} from "../auth/auth";
import {useEffect, useState} from "react";
import 'sweetalert2/src/sweetalert2.scss'
import {useSearchParams} from "react-router-dom";
import Feed from "../components/Feed";
import "../styles/HomePageStyle.css"

export default function HomePage() {

    const studability = useStudability();
    let token = useAuthProvider().getToken();
    const [username, setUsername] = useState('');
    const [searchParams] = useSearchParams();

    const name = searchParams.get("name")

    function handleLogIn() {
        studability.getUser(
            token,
            (user) => {
                setUsername(user.name + " " + user.surname);
            },
            () => "Error")

        const names = username.split(' ');
        const capitalizedNames = names.map((name) => name.charAt(0).toUpperCase() + name.slice(1));
        const capitalizedUsername = capitalizedNames.join(' ');

        Swal.fire({
            text: `You are successfully logged in, ${capitalizedUsername}!`,
            confirmButtonColor: '#87CEFAFF'
        });
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
                <div class="feedColumn">
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <h1 className="header">
                            <header>Friend's Files</header>
                        </h1>
                    </div>
                    <Feed/>
                </div>
            </row>
        </div>
    )
}
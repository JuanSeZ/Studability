import MyNavbar from "../../components/MyNavbar";
import ActualChat from "./ActualChat";
import SideBar from "./SideBar"
import ChatPageStyle from "../style/ChatPageStyle.css"
import * as React from "react";
import {useEffect, useState} from "react";
import io, {Socket} from "socket.io-client";
import {useStudability} from "../../service/Studability";
import {useAuthProvider} from "../../auth/auth";

export default function ChatPage() {

    const [actualFriend, setActualFriend] = useState("P");
    const [userId, setUserId] = useState("")
    const token = useAuthProvider().getToken();

    useStudability().getUserIdByToken(
        token,(userId) => {
            setUserId(userId)
        },
        () =>{}
    );


    const chooseActualFriend = (friend) => {
        setActualFriend(friend);

    };


    return (
        <div>
            <row>
                <MyNavbar/>
                <div style={{display: "flex", justifyContent: "center", marginTop: 20, marginBottom: 10}}>
                    <h1 className="header">
                        <header>Chats</header>
                    </h1>
                </div>
            </row>
            <row>
                <div className="sideBarColumn">
                    <SideBar chooseActualFriend={chooseActualFriend}/>
                </div>
                <div className="actualChatColumn">
                    <ActualChat actualFriend={actualFriend} userId = {userId}/>
                </div>
            </row>
        </div>
    )
}
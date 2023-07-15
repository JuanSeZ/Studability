import MyNavbar from "../../components/MyNavbar";
import ActualChat from "./ActualChat";
import SideBar from "./SideBar"
import ChatPageStyle from "../style/ChatPageStyle.css"
import * as React from "react";
import {useEffect, useState} from "react";

import {useStudability} from "../../service/Studability";
import {useAuthProvider} from "../../auth/auth";
import {GlobalSocket} from "./SocketManager";

const socket = GlobalSocket;


export default function ChatPage() {

    const [actualFriend, setActualFriend] = useState({name: "", surname: "", email: ""});
    const [userId, setUserId] = useState("")
    const token = useAuthProvider().getToken();
    const [conversation, setConversations] = useState([])
    const [newMessage, setNewMessage] = useState({body: "", from: ""})
    const [isGroup, setIsGroup] = useState(false)

    useEffect(() => {
        socket.connect();
        socket.on("loadConversation", (conversation) => {
            setConversations(conversation)
        })
        socket.on("message", (message) => {
            if(!isGroup)setConversations((prevConversation) => [...prevConversation, message])
        })

        return () => {
            socket.off("message");
            socket.off("loadConversation");
            socket.disconnect();
        }
    }, [])

    useEffect(() => {
        socket.emit("joinRoom",{userId: userId, id: actualFriend.email});

    }, [actualFriend])

    useEffect(() => {
        if (newMessage.body !== "") {
            if(isGroup){
                socket.emit("message", {senderId: userId, receiverId: "", message:newMessage.body, groupId:actualFriend.email})
            }
            else {
                socket.emit("message", {senderId: userId, receiverId: actualFriend.email, message: newMessage.body, groupId: ""})
            }
        }
    }, [newMessage])


    useStudability().getUserIdByToken(
        token,(userId) => {
            setUserId(userId)
        },
        () =>{}
    );


    const chooseActualFriend = (friend) => {
        setActualFriend(friend);
    };

    const newMessageHandler = (message) => {
        setNewMessage(message);
    }




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
                    <ActualChat actualFriend={actualFriend} userId = {userId} conversation ={conversation} newMessage={newMessageHandler} />
                </div>
            </row>
        </div>
    )
}
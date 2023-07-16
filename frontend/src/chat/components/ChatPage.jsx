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
    const [actualGroup, setActualGroup] = useState({name: ""})
    const [userId, setUserId] = useState("")
    const token = useAuthProvider().getToken();
    const [conversation, setConversations] = useState([])
    const [newMessage, setNewMessage] = useState({body: "", from: ""})
    const [isGroup, setIsGroup] = useState(false);
    const studability = useStudability();

    useEffect(() => {
        socket.connect();
        socket.on("loadConversation", (conversation) => {
            setConversations(conversation)
        })
        studability.getUserIdByToken(token, (userId) => {
            setUserId(userId);
        }, (msg) => console.log(msg));

        return () => {
            socket.off("loadConversation");
            socket.disconnect();
        }
    }, [])

    useEffect(() => {
        if(actualFriend.email !== ""){
            socket.emit("joinRoom",{userId: userId, id: actualFriend.email});
        }

    }, [actualFriend])

    useEffect(() => {
        if (newMessage.body !== "") {
            if(isGroup){
                socket.emit("groupMessage", {senderId: userId, receiverId: "", message:newMessage.body, groupId:actualGroup.name})
            }
            else {
                socket.emit("message", {senderId: userId, receiverId: actualFriend.email, message: newMessage.body, groupId: ""})
            }
        }
    }, [newMessage])




    const chooseActualFriend = (friend) => {
        setIsGroup(false)
        setActualGroup({name: ""})
        setActualFriend(friend);
    };

    const newMessageHandler = (message) => {
        setNewMessage(message);
    }

    const handleGroupCreation = (id,selectedFriends) => {
        setIsGroup(true);
        selectedFriends.push(userId);
        socket.emit("createGroupChat", {id: id , usersId: selectedFriends});
        setActualGroup({name: id});
    }

    const handleRoomJoin = (id) => {
        setIsGroup(true);
        socket.emit("joinGroupRoom",{userId: userId, id: id});
        setActualFriend({name: "", surname: "", email: ""})
        setActualGroup({name: id});
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
                    <SideBar chooseActualFriend={chooseActualFriend} handleGroupCreation={handleGroupCreation} handleRoomJoin={handleRoomJoin} />
                </div>
                <div className="actualChatColumn">
                    <ActualChat actualFriend={actualFriend} userId = {userId} conversation ={conversation} isGroup={isGroup} newMessage={newMessageHandler} actualGroup={actualGroup} />
                </div>
            </row>
        </div>
    )
}
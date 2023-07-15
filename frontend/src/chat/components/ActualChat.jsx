// message componente.
// id, senderId, date, message, groupId/receiverId
// input (donde ponés el mensaje y lo enviás)

import {useState, useEffect} from 'react'
import {Send} from "react-bootstrap-icons"
import {GlobalSocket} from "./SocketManager";
import {ActualChatStyle} from "../style/ActualChatStyle.css"


function ActualChat({actualFriend: actualFriend,userId: userId}) {

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const socket = GlobalSocket

    useEffect(() => {
        socket.connect()

        return () => {
            socket.disconnect()
        };
    });

    useEffect( ()=> {
        const loadMessage = (chats) => {
            const newMessages = chats.map(obj => ({
                from: obj.senderId,
                body: obj.message
            }))
            setMessages(newMessages)
        }
        socket.on("loadConversation", (chats) => loadMessage(chats))
        // socket.on("message", function (chat) {
        //     const newMessage = chat.map(obj => ({
        //         from: obj.senderId,
        //         body: obj.message
        //     }))
        //     setMessages([...messages, newMessage])
        // })

        return () => {
            socket.off("loadConversation", loadMessage);
            // socket.off("messages")
        }

    }, [])


    useEffect(() => {
            const receiveMessage = (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
            socket.on("message", receiveMessage);
            return () => {
                socket.off("message", receiveMessage);
            }
        },
        [])

    useEffect(() => {
        socket.emit("joinRoom",{id: "",
            userId:actualFriend.email})
        },
        [actualFriend])


    const handleSubmit = (e) => {
        e.preventDefault()
        if (message !== "") {
            socket.emit('message', {
                senderId: userId,
                receiverId: actualFriend.email,
                message: message,
                groupId: ""
            })
            const newMessage = {body: message, from: userId}
            setMessages([...messages, newMessage])
            setMessage('')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} style={{background: 'lightskyblue', height: 600, borderRadius: 10}}>
                <div className="friendChatName">
                    {actualFriend.name} {actualFriend.surname}
                </div>
                <div style={{height: 500, overflowY: "auto"}}>
                    <div>
                        <ul style={{paddingBottom: 1, paddingTop: 10}}>
                            {messages.map((message, index) => (
                                <li style={{
                                    marginTop: 2,
                                    padding: 2,
                                    fontSize: 18,
                                    borderRadius: 8,
                                    display: 'table',
                                    fontFamily: "sans-serif",
                                    backgroundColor: message.from === userId ? 'white' : '#ADD8E6',
                                    marginLeft: message.from === userId ? 'auto' : 'initial',
                                    textAlign: message.from === userId ? 'right' : 'initial',
                                    width: 'auto',
                                    height: 'auto',
                                    marginRight: message.from === userId ? '70px' : 'initial',
                                }}
                                    key={index}>
                                    <p>
                                        {message.from}: {message.body}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="messageSender"
                     style={{justifyContent: "center", display: "flex", alignItems: "center"}}>
                    <input
                        type="text"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        style={{width: 1000, height: 38, border: 2, marginTop: 10, fontFamily: "sans-serif"}}
                        placeholder="Type a message"
                    />
                    <button className="btn btn-outline-primary" style={{marginTop: 10}}>
                        <Send/>
                    </button>
                </div>
            </form>
        </div>

    )
}

export default ActualChat;
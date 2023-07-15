// message componente.
// id, senderId, date, message, groupId/receiverId
// input (donde ponés el mensaje y lo enviás)

// React component that renders the chat page using socket.io
// to send and receive messages in real time.

import {useState, useEffect} from 'react'
import {Send} from "react-bootstrap-icons"
import {ActualChatStyle} from "../style/ActualChatStyle.css"



function ActualChat({actualFriend: actualFriend,userId: userId, conversation: conversation, newMessage, isGroup}) {

    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])

    useEffect(() => {

        const messages = conversation.map(obj => ({
            id: obj.groupId,
            from: obj.senderId,
            body: obj.message
        }));

        setChat(messages);
    }, [conversation])


    const handleSubmit = (e) => {
        e.preventDefault()
        if (message !== "") {
            const newMessages = {body: message, from: userId}
            setChat([...chat, newMessages])
            newMessage(newMessages);
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
                            {chat.map((message, index) => (
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
                                        {isGroup && <span>{message.from}: </span>}
                                        {message.body}
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
                    <button className="btn btn-outline-primary"  style={{marginTop: 10}}>
                        <Send/>
                    </button>
                </div>
            </form>
        </div>

    )
}

export default ActualChat;
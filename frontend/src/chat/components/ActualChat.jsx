// message componente.
// id, senderId, date, message, groupId/receiverId
// input (donde ponés el mensaje y lo enviás)

import {useState, useEffect, useRef} from 'react'
import {Send} from "react-bootstrap-icons"
import {ActualChatStyle} from "../style/ActualChatStyle.css"
import * as React from "react";
import {useAuthProvider} from "../../auth/auth";
import {useStudability} from "../../service/Studability";


function ActualChat({actualFriend: actualFriend, userId: userId, conversation: conversation, newMessage, isGroup, actualGroup}) {

    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])
    const containerRef = useRef(null);
    const studability = useStudability();
    const token = useAuthProvider().getToken();
    const [usernames, setUsernames] = useState({});
    const [usernamesFetched, setUsernamesFetched] = useState(false);

    useEffect(() => {
        const fetchUsernames = async () => {
            const promises = conversation.map((obj) =>
                fetchUsernameById(obj.senderId, token)
            );
            await Promise.all(promises);
            setUsernamesFetched(true);
        };

        fetchUsernames();
    }, [conversation, token]);

    useEffect(() => {
        if (usernamesFetched) {
            const messages = conversation.map((obj) => {
                const username = usernames[obj.senderId] || "";
                return {
                    id: obj.groupId,
                    from: obj.senderId,
                    body: obj.message,
                    username: username,
                };
            });

            setChat(messages);
        }
    }, [conversation, usernames, usernamesFetched]);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [chat]);



    function fetchUsernameById(id, token) {
        return new Promise((resolve, reject) => {
            studability.getUserNameById(
                id,
                token,
                (userName) => {
                    setUsernames((prevUsernames) => ({
                        ...prevUsernames,
                        [id]: userName,
                    }));
                    resolve();
                },
                (msg) => {
                    console.log(msg);
                    reject();
                }
            );
        });
    }


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
                    {isGroup ? actualGroup.name : actualFriend.name + " " + actualFriend.surname}
                </div>
                <div ref={containerRef} style={{height: 500, overflowY: "auto"}}>
                    <div>
                        {actualFriend.name !== "" || actualGroup.name !== "" ? (
                        <ul style={{paddingBottom: 1, paddingTop: 10}}>
                            {chat.map((message, index) => (
                                <li style={{
                                    marginTop: 2,
                                    padding: 2,
                                    fontSize: 18,
                                    borderRadius: 8,
                                    display: 'table',
                                    fontFamily: "sans-serif",
                                    backgroundColor: message.from === userId ? 'white' : '#0275d8',
                                    marginLeft: message.from === userId ? 'auto' : 30,
                                    textAlign: message.from === userId ? 'right' : 'initial',
                                    width: 'auto',
                                    height: 'auto',
                                    marginRight: message.from === userId ? '70px' : 'initial',
                                }}
                                    key={index}>
                                    <div>
                                        {isGroup}
                                        <span style={{textTransform: "capitalize", fontWeight: "bold"}}>{message.username !== "" ? message.username : message.from}</span>
                                        <br />
                                        {message.body}
                                    </div>

                                </li>
                            ))}
                        </ul>) : (<div>
                            <p style={{display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontFamily: "sans-serif",
                                marginTop: 230
                            }}>Select a friend to have a one to one conversation</p>
                            <p style={{display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontFamily: "sans-serif",
                            }}>Select two or more friends to start a group conversation</p>

                        </div>)}
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
                    <button className="btn btn-outline-secondary" style={{marginTop: 10}}>
                        <Send/>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ActualChat;
// comoponente buscar amigos.
//columna con chats recientes.

import SideBarStyle from "../style/SideBarStyle.css"
import {useState} from "react";
import {useStudability} from "../../service/Studability";
import {useAuthProvider} from "../../auth/auth";
import * as React from "react";
import {end} from "@popperjs/core";

function SideBar({chooseActualFriend}) {

    const [friend, setFriend] = useState('');
    const [recentChats, setRecentChats] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const studability = useStudability();
    let token = useAuthProvider().getToken();
    const [searchResult, setSearchResult] = useState([]);

    const handleCheckboxChange = (name, surname, isSelected) => {
        const friendObj = {name, surname};
        if (isSelected) {
            setSelectedFriends((prevFriendsSelected) => [...prevFriendsSelected, friendObj]);
            console.log(selectedFriends)
        } else {
            setSelectedFriends((prevFriendSelected) =>
                prevFriendSelected.filter((friend) => friend.name !== name || friend.surname !== surname)
            );
        }
    };

    function searchFriend() {
        studability.listFriendByFullName(
            friend.toLowerCase(),
            token,
            (users) => {
                setSearchResult(users);
            },
            (msg) => console.log(msg)
        );
    }

    return (
        <div className="sideBar">
            <div>
                <input
                    className="friendSearcher"
                    placeholder="Search friend..."
                    value={friend}
                    onChange={(e) => {
                        searchFriend();
                        setFriend(e.target.value);
                    }}
                    style={{
                        height: 43,
                        width: 315,
                        marginTop: 1,
                        marginLeft: 5,
                        border: '1px solid black',
                    }}
                />
                {selectedFriends.length > 1 ? (
                    <button
                        className="btn btn-outline-primary"
                        style={{marginLeft: 55, marginTop: 5}}
                    >
                        Start Group Conversation
                    </button>
                ) : null}
                <ul className="chatResults">
                    {friend.length > 0 &&
                        searchResult
                            .filter((user) =>
                                user.name.toLowerCase().startsWith(friend.toLowerCase())
                            )
                            .map((user) => (
                                <text id={user.email} key={user.email}>
                                    <div style={{marginTop: 10}}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={selectedFriends.some(
                                                (friend) =>
                                                    friend.name === user.name && friend.surname === user.surname
                                            )}
                                            onChange={(e) =>
                                                handleCheckboxChange(
                                                    user.name,
                                                    user.surname,
                                                    e.target.checked
                                                )
                                            }
                                            style={{marginTop: 9, width: 16, height: 16}}
                                        />
                                        <text className="results-names">
                                            {user.name} {user.surname}
                                            <button
                                                className="btn btn-outline-primary"
                                                onClick={() => {
                                                    chooseActualFriend(user);
                                                }}
                                                style={{marginLeft: 5, textAlign: "right"}}
                                            >
                                                Chat
                                            </button>
                                        </text>
                                    </div>
                                </text>
                            ))}
                </ul>
            </div>
            <div>{/* Render recent chats here */}</div>
        </div>
    );

}

export default SideBar;
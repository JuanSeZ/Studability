// comoponente buscar amigos.
//columna con chats recientes.

import SideBarStyle from "../style/SideBarStyle.css"
import {useEffect, useState} from "react";
import {useStudability} from "../../service/Studability";
import {useAuthProvider} from "../../auth/auth";
import * as React from "react";
import Swal from "sweetalert2";
import {map} from "react-bootstrap/ElementChildren";

function SideBar({chooseActualFriend, handleGroupCreation, handleRoomJoin}) {

    const [friend, setFriend] = useState('');
    const [selectedFriends, setSelectedFriends] = useState([]);
    const studability = useStudability();
    let token = useAuthProvider().getToken();
    const [searchResult, setSearchResult] = useState([]);
    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState('');

    const handleGroupListing = () =>   studability.listGroups(
        token,
        (groups) => {
            setGroups(groups);
        },
        (msg) => console.log(msg)
    );
    useEffect(() => {
        handleGroupListing();
    }, []);


    const handleCheckboxChange = (friendId, isSelected) => {
        if (isSelected) {
            setSelectedFriends((prevFriendsSelected) => [...prevFriendsSelected, friendId]);
        } else {
            setSelectedFriends((prevFriendSelected) =>
                prevFriendSelected.filter((friend) => friend !== friendId)
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


    const createGroupName = () => {
        Swal.fire({
            title: "Enter Group Name",
            input: "text",
            inputPlaceholder: "Enter group name",
            showCancelButton: true,
            confirmButtonText: "Create",
            cancelButtonText: "Cancel",
            reverseButtons: true,
            confirmButtonColor: "#14A44D",
            inputValidator: (value) => {
                if (!value) {
                    return "Please enter a valid group name";
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const groupName = result.value;
                handleGroupCreation(groupName, selectedFriends);
                setGroups((prevGroups) => [...prevGroups, groupName]);
            }
        });
    };

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
                        onClick={createGroupName}
                    >
                        Start Group Conversation
                    </button>
                ) : null}
                <ul className="chatResults" style={{height: 168, overflowY: "auto"}}>
                    {friend.length > 0 ? (
                        searchResult
                            .filter((user) => user.name.toLowerCase().startsWith(friend.toLowerCase()))
                            .map((user) => (
                                <label id={user.email} key={user.email}>
                                    <div style={{marginTop: 10}}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={selectedFriends.includes(user.email)}
                                            onChange={() =>
                                                handleCheckboxChange(user.email, !selectedFriends.includes(user.email))
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
                                                style={{marginLeft: 5, textAlign: 'right'}}
                                            >
                                                Chat
                                            </button>
                                        </text>
                                    </div>
                                </label>
                            ))) : (
                        <text style={{
                            justifyContent: "center",
                            textAlign: "center",
                            marginLeft: 45,
                            fontSize: 15,
                            fontFamily: "sans-serif",
                            color: "gray",
                        }}> Find friends to chat </text>)}
                </ul>
            </div>
            <div>
                <text style={{fontFamily: "sans-serif", fontSize: 25, marginLeft: 7}}>Groups</text>

                <div style={{height: selectedFriends.length > 1 ? 255 : 305,
                    overflowY: "auto", marginLeft: 10, textTransform: "capitalize"}}>
                    <text>
                        {groups.length > 0 ? groups.map((group) => (
                            <div style={{marginTop: 9}}>
                                {group}
                                <button className="btn btn-outline-primary"
                                        onClick={() => handleRoomJoin(group)}
                                        style={{marginLeft: 5}}>
                                    Chat
                                </button>
                            </div>
                        )) : <text style={{
                            fontSize: 15,
                            fontFamily: "sans-serif",
                            color: "gray", textTransform: "none"}}>No groups yet</text>}
                    </text>
                </div>
            </div>
        </div>

    );

}

export default SideBar;
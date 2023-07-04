import React, {useState} from "react";
import {useStudability} from "../../service/Studability";
import {useAuthProvider} from "../../auth/auth";
import button from "bootstrap/js/src/button";
import ChatsStyle from "../ChatStyle.css"

export default function Chat(){

    const studability = useStudability();
    const auth = useAuthProvider();
    const token = auth.getToken()
    const [searchedFriend, setSearchedFriend] = useState('');
    const [searchResult, setSearchResult] = useState([])

    function searchUser() {
        studability.listFriendByFullName(searchedFriend.toLowerCase(),
            token,
            (users) => {
                setSearchResult(users)
                setSearchedFriend('')
            },
            (msg) => console.log(msg))
    }

    const changeSearchedFullName = (searchedFriend) => {
        setSearchedFriend(searchedFriend.target.value)
    }

    return (
        <>
            <div style={{justifyContent: "center", alignContent: "center", display: "flex", marginTop: 20}}>
                <h1 className="header" style={{marginBottom: 20}}>
                    <header>Chats</header>
                </h1>
            </div>

            <div className="my-chats">
                <h2 className="my-chats-header"
                    style={{justifyContent: "center", alignContent: "center", display: "flex"}}>Recent Chats</h2>
            </div>

            <div className="new-chats">
                <h2 className="new-chats-header"
                    style={{justifyContent: "center", alignContent: "center", display: "flex"}}>New Chat</h2>
                <nav>
                    <div className="searcher" style={{marginTop: 20}}>
                        <div className="d-flex">
                            <input
                                className="form-control border-1 border-dark"
                                type="search"
                                placeholder="Search new friends..."
                                value={searchedFriend}
                                aria-label="Search"
                                onChange={changeSearchedFullName}
                            />
                            <button className="btn btn-outline-info" onClick={searchUser}>
                                Search
                            </button>
                        </div>
                    </div>
                </nav>
                <ul className="results">
                    {searchResult.map((user) => (
                        <ul id={user.email} key={user.email}>
                            <div className="results-names">
                                {user.name} {user.surname}
                            </div>
                        </ul>
                    ))}
                </ul>
            </div>
        </>
    )

}
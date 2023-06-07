import {useEffect, useState} from "react";
import * as React from "react";
import button from "bootstrap/js/src/button";
import {useStudability} from "../service/Studability";
import {useAuthProvider} from "../auth/auth";
import SendRequestButton from "./SendRequestButton";

export default function MyFriendsPage() {

    const studability = useStudability();
    const [friends, setFriends] = useState([]);
    const [requests, setRequests] = useState([]);
    const [searchedFriend, setSearchedFriend] = useState('')
    const [searchResult, setSearchResult] = useState([])
    let token = useAuthProvider().getToken();
    const currentUser = token.id;
    const [buttonChange, setButtonChange] = useState('Send Request')

    useEffect(() => {
        studability.listRequests(
            token,
            (requests) => setRequests(requests),
            (msg) => console.log(msg));
    }, [])

    useEffect(() => {
        studability.listFriends(
            token,
            (friends) => setFriends(friends),
            (msg) => console.log(msg));
    }, [requests])

    function searchUser() {
        studability.listUserByFullName(searchedFriend.toLowerCase(),
            token,
            (users) => {
                setSearchResult(users)
                setSearchedFriend('')
            },
            (msg) => console.log(msg))
    }

    function sendRequest(requested) {
        return studability.sendRequest({
                emailRequester: currentUser,
                emailRequested: requested
            },
            token,
            () => {
                setButtonChange("Request Sent")
            },
            (msg) => console.log(msg))
    }

    function acceptRequest(email) {
        studability.acceptRequest({
                emailRequested: email
            },
            token,
            (requests) => setRequests(requests),
            (msg) => console.log(msg))
    }

    function rejectRequest(email) {
        studability.rejectRequest({
                emailRequested: email
            },
            token,
            (requests) => setRequests(requests),
            (msg) => console.log(msg))
    }

    const changeSearchedFullName = (searchedFriend) => {
        setSearchedFriend(searchedFriend.target.value)
    }

    return (
        <div>
            <br/>

            <div style={{display: "flex", justifyContent: "center"}}>
                <h1 className="header">
                    <header>My Friends</header>
                </h1>
            </div>

            <div class="row">
                <div class="column1">
                    <br/>
                    <nav className="searcher">
                        <div className="container-fluid"
                             style={{justifyContent: "flex-start", alignContent: "flex-start", display: "flex"}}>
                            <div className="d-flex">
                                <input className="form-control border-1 border-dark" type="search"
                                       placeholder="Search new friends..."
                                       value={searchedFriend}
                                       aria-label="Search"
                                       onChange={changeSearchedFullName}/>
                                <button className="btn btn-outline-info" onClick={searchUser}>Search</button>
                            </div>
                        </div>
                    </nav>
                    <ul className="results">
                        {searchResult.map((user) => (
                            <ul id={user.email} key={user.email}>
                                <div className="results-names">
                                    {user.name} {user.surname}
                                    <SendRequestButton sendRequest={sendRequest} email={user.email}/>
                                </div>
                            </ul>
                        ))}
                    </ul>
                    <div>
                        <text className="requests-header">Friends Requests</text>
                        {requests.map((request) => (
                            <ul key={request.email} id={request.email} className="requests">
                                <div>
                                    {request.name + " " + request.surname + " "}
                                    <button
                                        className="btn btn-outline-success"
                                        onClick={() => acceptRequest(request.email)}>✔
                                    </button>
                                    {" "}
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => rejectRequest(request.email)}>X
                                    </button>
                                </div>
                            </ul>
                        ))}
                    </div>
                </div>

                <div class="column1">
                    <br/>
                    <text className="mutualFriends">Mutual Friends</text>
                    {friends.map((friend) => (
                        <li key={friend.email}>
                            <div>
                                {friend.name + " " + friend.surname}
                            </div>
                        </li>
                    ))}
                </div>
            </div>

        </div>
    )
}
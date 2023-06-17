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
    const [sentRequests, setSentRequests] = useState([])
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

    useEffect(() => {
        studability.listSentRequests(token,
            (sentRequests) => setSentRequests(sentRequests),
            (msg) => console.log(msg))
    }, [searchResult])

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
                // setButtonChange("Request Sent");
                const index = searchResult.indexOf(requested)
                setSearchResult(searchResult.splice(index,1))
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

            <div className="row">
                <div className="column1">
                    <br/>
                    <nav>
                        <div className="searcher">
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
                                    <SendRequestButton sendRequest={sendRequest} email={user.email}/>
                                </div>
                            </ul>
                        ))}
                    </ul>
                    <div>
                        <h3 className="requests-header">Friends Requests</h3>
                        {requests.length === 0 ? (
                            <div className="no-requests" style={{
                                justifyContent: "center",
                                textAlign: "center",
                                fontSize: 20,
                                fontFamily: "sans-serif",
                                marginTop: 10,
                                color: "gray"
                            }}>No new friend requests</div>
                        ) : (
                            requests.map((request) => (
                                <ul key={request.email} id={request.email} className="requests">
                                    <div>
                                        {request.name + " " + request.surname + " "}
                                        <button
                                            className="btn btn-outline-success"
                                            onClick={() => acceptRequest(request.email)}
                                        >
                                            ✔
                                        </button>
                                        {" "}
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => rejectRequest(request.email)}
                                        >
                                            X
                                        </button>
                                    </div>
                                </ul>
                            ))
                        )}
                    </div>
                </div>

                <div className="columnRequestsSent">
                    <br/>
                    <h3 className="requestsSentHeader">Requests Sent</h3>
                    {sentRequests.length === 0 ? (
                        <div
                            className="no-requests-sent"
                            style={{
                                justifyContent: "center",
                                textAlign: "center",
                                fontSize: 20,
                                fontFamily: "sans-serif",
                                marginTop: 10,
                                color: "gray"
                            }}
                        >
                            No requests sent
                        </div>
                    ) : (
                        sentRequests
                            .sort((a, b) => a.name.localeCompare(b.name)) // Sort the array alphabetically by the "name" property
                            .map((sentRequest) => (
                                <ul key={sentRequest.email} id={sentRequest.email} className="requests">
                                    <div>
                                        {sentRequest.name + " " + sentRequest.surname + " "}
                                    </div>
                                </ul>
                            ))
                    )}

                </div>

                <div className="columnMutualFriends">
                    <br/>
                    <h3 className="mutualFriendsHeader">Mutual Friends</h3>
                    {friends.length === 0 ? (
                        <div className="no-friends" style={{
                            justifyContent: "center",
                            textAlign: "center",
                            fontSize: 20,
                            fontFamily: "sans-serif",
                            marginTop: 10,
                            color: "gray"
                        }}>No mutual friends</div>
                    ) : (
                        <ul className="mutualFriends">
                            {friends.map((friend) => (
                                <ul key={friend.email}>
                                    <div>
                                        {friend.name} {friend.surname}
                                    </div>
                                </ul>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>

    )
}
import {useEffect, useState} from "react";
import * as React from "react";
import button from "bootstrap/js/src/button";
import {useStudability} from "../service/Studability";
import {useAuthProvider} from "../auth/auth";
import SendRequestButton from "./SendRequestButton";
import Swal from "sweetalert2";

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
            },
            (msg) => console.log(msg))
    }

    function sendRequest(requested) {
        return studability.sendRequest(
            {
                emailRequester: currentUser,
                emailRequested: requested
            },
            token,
            () => {
                setSearchResult(prevResult =>
                    prevResult.filter(user => user.email !== requested)
                );
                Swal.fire({
                    icon: "success",
                    title: "Request sent Successfully",
                    timer: 1200,
                    showConfirmButton: false
                });
            },
            (msg) => console.log(msg)
        );
    }


    function acceptRequest(email) {
        studability.acceptRequest({
                emailRequested: email
            },
            token,
            (requests) => setRequests(requests),
            (msg) => console.log(msg))
        Swal.fire({
            icon: "success",
            timer: 1200,
            title: "Friend added successfully",
            showConfirmButton: false
        })
    }

    function rejectRequest(email) {
        studability.rejectRequest(
            {
                emailRequested: email
            },
            token,
            (requests) => setRequests(requests),
            (msg) => console.log(msg)
        );
        Swal.fire({
            icon: "success",
            title: "Request deleted successfully",
            showConfirmButton: false,
            timer: 1200
        }).then(() => {
            window.location.reload();
        });
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
                    {/*<nav>*/}
                    {/*    <div className="searcher">*/}
                    {/*        <div className="d-flex">*/}
                    {/*            <input*/}
                    {/*                className="form-control border-1 border-dark"*/}
                    {/*                type="search"*/}
                    {/*                placeholder="Search new friends..."*/}
                    {/*                value={searchedFriend}*/}
                    {/*                aria-label="Search"*/}
                    {/*                onChange={changeSearchedFullName}*/}
                    {/*            />*/}
                    {/*            <button className="btn btn-outline-info" onClick={searchUser}>*/}
                    {/*                Search*/}
                    {/*            </button>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</nav>*/}
                    {/*<ul className="results">*/}
                    {/*    {searchResult.map((user) => (*/}
                    {/*        <ul id={user.email} key={user.email}>*/}
                    {/*            <div className="results-names">*/}
                    {/*                {user.name} {user.surname}*/}
                    {/*                <SendRequestButton sendRequest={sendRequest} email={user.email}/>*/}
                    {/*            </div>*/}
                    {/*        </ul>*/}
                    {/*    ))}*/}
                    {/*</ul>*/}
                    <div className="searcher">
                        <div className="d-flex">
                            <input
                                className="searcher"
                                placeholder="Search User..."
                                value={searchedFriend}
                                onChange={(e) => {
                                    searchUser();
                                    setSearchedFriend(e.target.value);
                                }}
                                style={{
                                    height: 43,
                                    width: 315,
                                    marginTop: 1,
                                    marginLeft: 5,
                                    border: '1px solid black'
                                }}
                            />
                            <button className="btn btn-outline-info" onClick={searchUser}>
                                Search
                            </button>
                        </div>
                    </div>

                    <ul className="results" style={{overflowY: "auto", height: 480}}>
                        {searchedFriend.length > 0 ? (
                            searchResult.length > 0 ? (
                                searchResult
                                    .filter(user => user.name.toLowerCase().startsWith(searchedFriend.toLowerCase()))
                                    .map((user) => (
                                        <ul id={user.email} key={user.email}>
                                            <div className="text-center" style={{marginRight: 60}}>
                                                <text className="results-names">
                                                    {user.name} {user.surname}
                                                    <SendRequestButton sendRequest={sendRequest} email={user.email}/>
                                                </text>
                                            </div>
                                        </ul>
                                    ))
                            ) : (
                                <text style={{
                                    marginRight: 40,
                                    justifyContent: "center",
                                    textAlign: "center",
                                    fontSize: 18,
                                    fontFamily: "sans-serif",
                                    marginTop: 3,
                                    color: "gray"
                                }}>No users found with that name</text>
                            )
                        ) : <text style={{
                            marginRight: 60,
                            justifyContent: "center",
                            textAlign: "center",
                            fontSize: 18,
                            fontFamily: "sans-serif",
                            marginTop: 3,
                            color: "gray"
                        }}>Find new friends</text>}
                    </ul>
                </div>

                <div className="columnRequests">
                    <div style={{marginLeft: 18}}>
                        <h3 className="requests-header" style={{marginTop: 27}}>Friends Requests</h3>
                        <div style={{height: 230, overflowY: "auto"}}>
                            {requests.length === 0 ? (
                                <div className="no-requests" style={{
                                    justifyContent: "center",
                                    textAlign: "center",
                                    fontSize: 20,
                                    fontFamily: "sans-serif",
                                    marginTop: 5,
                                    color: "gray"
                                }}>No new friend requests</div>
                            ) : (
                                requests
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .sort((a, b) => a.surname.localeCompare(b.surname))
                                    .map((request) => (
                                    <ul key={request.email}
                                        id={request.email}
                                        className="requests">
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


                    <h3 className="requestsSentHeader">Requests Sent</h3>
                    <div style={{height: 240, overflowY: "auto"}}>
                        {sentRequests.length === 0 ? (
                            <div style={{
                                justifyContent: "center",
                                textAlign: "center",
                                fontSize: 20,
                                fontFamily: "sans-serif",
                                color: "gray",
                                marginLeft: 20
                            }}
                            >
                                No requests sent
                            </div>
                        ) : (
                            sentRequests
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .sort((a, b) => a.surname.localeCompare(b.surname))
                                .map((sentRequest) => (
                                    <ul key={sentRequest.email} id={sentRequest.email} className="requestsSent">
                                        <div>
                                            {sentRequest.name + " " + sentRequest.surname + " "}
                                        </div>
                                    </ul>
                                ))
                        )}
                    </div>
                </div>

                <div className="columnMutualFriends">
                    <br/>
                    <h3 className="mutualFriendsHeader">Mutual Friends</h3>
                    <div style={{height: 530, overflowY: "auto"}}>
                        {friends.length === 0 ? (
                            <div style={{
                                justifyContent: "center",
                                textAlign: "center",
                                fontSize: 20,
                                fontFamily: "sans-serif",
                                marginTop: 5,
                                color: "gray"
                            }}>No mutual friends</div>
                        ) : (
                            <ul className="mutualFriends">
                                {friends
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .sort((a, b) => a.surname.localeCompare(b.surname))
                                    .map((friend) => (
                                        <ul key={friend.email}>
                                            <div style={{marginTop: 5, fontFamily: "sans-serif"}}>
                                                {friend.name} {friend.surname}
                                            </div>
                                        </ul>
                                    ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>

    )
}
import io from "socket.io-client";
import {useAuthProvider} from "../../auth/auth";
import {useStudability} from "../../service/Studability";
import React from "react";


const tokenString = sessionStorage.getItem('token');
let userId = ""

const SocketHelper = () => {

useStudability().getUserIdByToken(
    tokenString,(usersId) => {
        userId = usersId
    },
    () =>{}
);

return (
    ""
)

}

export const GlobalSocket = io('http://localhost:8080', {

    query: {
        "Authorization" : tokenString,
        "userId" : userId
    },
    autoConnect: false,
});
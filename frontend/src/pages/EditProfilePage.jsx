import React from "react";
import MyNavbar from "../components/MyNavbar";
import EditProfile from "../components/EditProfile";
import "../styles/NavBarStyle.css"
import "../styles/EditProfileStyle.css"


export default function EditProfilePage() {

    return (

        <div>
            <row>
                <MyNavbar/>
            </row>
            <row>
                <EditProfile/>
            </row>
        </div>
    )
}
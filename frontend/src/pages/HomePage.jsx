import * as React from "react";
import ToDoList from "../components/ToDoList";
import MyNavbar from "../components/MyNavbar";
import Feed from "../components/Feed";



export default function HomePage() {

    return (
        <div>
            <row>
                <MyNavbar/>
            </row>
                <ToDoList/>
                <Feed/>
        </div>
    )
}
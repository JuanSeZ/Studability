import * as React from "react";
import ToDoList from "../components/ToDoList";
import MyNavbar from "../components/MyNavbar";
import Feed from "../components/Feed";
import "../styles/HomePageStyle.css"


export default function HomePage() {

    return (
        <div>
            <row>
                <MyNavbar/>
            </row>
            <row>
                <div class="todoListColumn">
                    <ToDoList/>
                </div>
                <div class="feedColumn">
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <h1 className="header">
                            <header>Friend's Files</header>
                        </h1>
                    </div>
                    <Feed/>
                </div>
            </row>
        </div>
    )
}
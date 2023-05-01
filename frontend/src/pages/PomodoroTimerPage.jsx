import MyPomodoroTimer from "../components/MyPomodoroTimer";
import MyNavbar from "../components/MyNavbar";
import ToDoList from "../components/ToDoList";
import React from "react";

export default function PomodoroTimerPage() {

    return (
        <div>
            <row>
                <MyNavbar/>
            </row>
            <row>
                <div class="column">
                    <ToDoList/>
                </div>
                <div class="column">
                    <MyPomodoroTimer/>
                </div>
            </row>
        </div>
    )
}
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
            <column>
                <ToDoList/>
            </column>
            <MyPomodoroTimer/>
        </div>
    )
}
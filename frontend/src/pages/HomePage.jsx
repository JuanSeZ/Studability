import * as React from "react";
import ToDoList from "../components/ToDoList";
import MyNavbar from "../components/MyNavbar";



export default function HomePage() {

    return (
        <div>
            <row>
                <MyNavbar/>
            </row>
            <column class="text-center" style ={{width:'150px'}}>
            <ToDoList/>
            </column>
        </div>

    )
}
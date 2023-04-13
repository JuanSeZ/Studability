import {useStudability} from "../service/Studability";
import {useState} from "react";
import {useNavigate} from "react-router";
import {useAuthProvider} from "../auth/auth"
import button from "bootstrap/js/src/button";
import Dropdown from 'react-bootstrap/Dropdown';
import StudabilityLogo from "../images/StudabilityLogo.png";
import * as React from "react";


export default function HomePage() {
    const studability = useStudability()
    const [setErrorMsg] = useState(undefined)
    const navigate = useNavigate()
    const [list, setList] = useState([]);
    const [input, setInput] = useState("");
    const auth = useAuthProvider()
    const token = auth.getToken();

    const addToDoTask = (task) => {
        const newTask = {
            id: Math.random(),
            task: task
        }
        studability.addToDoTask(task, token, () => setList(list.concat(task)), (msg) => console.log(msg))
        setList([...list, newTask]);
        setInput("");

    };

    const deleteTask = (id) => {
        const newList = list.filter((todo) => todo.id !== id);
        setList(newList);
    }


    function logout() {
        let userToken;
        userToken = auth.getToken();
        studability.logout(userToken,
            () => {
                auth.removeToken(userToken)
                navigate("/", {replace: true});
            },
            (msg) => {
                setErrorMsg(msg)
            })
    }


    return (
        <div>
            <br/>
            <div>
                <div>

                    <div style={{justifyContent: "center", alignItems: "center", display: "flex"}}>
                        <img style={{width: 90, height: 90}} src={StudabilityLogo} className="logo" alt=""/>
                        <h1>Studability, study smart</h1>

                        <div style={{marginLeft: 650}}>
                            <Dropdown>

                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Menu
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/home/calendar">Calendar</Dropdown.Item>
                                    <Dropdown.Item href="/files">Files</Dropdown.Item>
                                    <Dropdown.Item href="/friends">Friends</Dropdown.Item>
                                    <Dropdown.Item href="/studytime">StudyTime</Dropdown.Item>
                                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                                </Dropdown.Menu>

                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h4>To-Do List</h4>
                <input type="text"
                       value={input} required
                       placeholder="Enter a To-Do Task"
                       onChange={(e) => setInput(e.target.value)}/>
                <button onClick={() => addToDoTask(input)} className="btn btn-outline-primary">+ Add Task</button>
                <ul>
                    {list.map((task) => (
                        <li key={task.id}>
                            {task.task + " "}
                            <button onClick={() => deleteTask(task.id)}>&times;</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{display: "flex", justifyContent: "center"}}>
                <button type="button" onClick={logout} className="btn btn-outline-danger">Log Out</button>
            </div>
        </div>

    )
}
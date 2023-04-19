import {useStudability} from "../service/Studability";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useAuthProvider} from "../auth/auth"
import Dropdown from 'react-bootstrap/Dropdown';
import StudabilityLogo from "../images/StudabilityLogo.png";
import * as React from "react";


export default function HomePage() {
    const studability = useStudability()
    const [setErrorMsg] = useState(undefined)
    const navigate = useNavigate()
    const [list, setList] = useState([]);
    const auth = useAuthProvider();
    const token = auth.getToken();
    const [name, setName] = useState("");

    function addToDoTask(task) {
        const newTask = {
            task: task.name,
        }
        studability.addToDoTask(task,
            token,
            () => setList(list.concat(task)),
            (msg) => console.log(msg));
        setList([...list, newTask]);
        setName("");
    }

    useEffect(() => {
        studability.listTasks(
            token,
            (list) => setList(list),
            (msg) => console.log(msg));
    }, [])

    const deleteTask = (id) => {
        const newList = list.filter((task) => task.id !== id);
        const task = findTaskByID(id)
        handleDelete(task)
        setList(newList);
    }

    function findTaskByID(id) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id){
                return list[i];
            }
        }
    }

    function handleDelete(task) {
        let taskToDelete = task.id;
        studability.deleteToDoTask(taskToDelete,
            token,
            () => setList(list.splice(task, 1)),
            (msg) => console.log(msg))
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


    const handleSubmit = async e => {
        e.preventDefault()
        addToDoTask({
            name: name,
        });
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

            <form onSubmit={handleSubmit}>
                <div>
                    <h4>To-Do List</h4>
                    <input type="text"
                           value={name} required={true}
                           placeholder="Enter a To-Do Task"
                           onChange={(e) => setName(e.target.value)}/>
                    <button type="submit" className="btn btn-outline-primary">+ Add Task</button>
                    <ul>
                        {list.map((task) => (
                            <li key={task.id}  id={task.id}>
                                {task.name + " "}
                                <button className="btn btn-outline-danger" onClick={() => deleteTask(task.id)}>&times;</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </form>

            <div style={{display: "flex", justifyContent: "center"}}>
                <button type="button" onClick={logout} className="btn btn-outline-danger">Log Out</button>
            </div>
        </div>

    )
}
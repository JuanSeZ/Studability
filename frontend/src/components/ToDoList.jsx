import * as React from "react";
import {useStudability} from "../service/Studability";
import {useEffect, useState} from "react";
import {useAuthProvider} from "../auth/auth";

export default function ToDoList() {

    const studability = useStudability()
    const [list, setList] = useState([]);
    const [name, setName] = useState("");
    let token = useAuthProvider().getToken();

    const handleSubmit = async e => {
        e.preventDefault()
        addToDoTask({
            name: name,
        });
    }
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
    }, [list])

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




    return (

        <div>
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
                            <li id={task.id}>
                                {task.name + " "}
                                <button className="btn btn-outline-danger" onClick={() => deleteTask(task.id)}>&times;</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </form>
        </div>
    );
}
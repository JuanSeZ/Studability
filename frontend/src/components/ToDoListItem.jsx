import * as React from "react";
import {useState} from "react";
import {PencilSquare} from "react-bootstrap-icons";

export default function ToDoListItem(props) {

    const [popup, setPopup] = useState(false)
    const [newName, setNewName] = useState("");
    const { task, deleteTask, changeName } = props

    function changeTaskName(id, newName) {
        changeName(id, newName);
        setPopup(false);
    }

    function deleteTaskFn(id){
        deleteTask(id)
    }

    return (
        <>
            <input className="form-check-input" type="checkbox" style={{marginTop: "12px"}}/>
            <label className="form-check-label" style={{marginLeft: "10px"}}>
                {task.name + " "}
            </label>
            <button className="btn btn-outline-danger"
                    onClick={() => deleteTaskFn(task.id)}
                    style={{marginLeft: "10px", marginTop: "2px"}}>&times;</button>
            <button className="btn" onClick={() => setPopup(true)}>
                <PencilSquare></PencilSquare>
            </button>
        <form onSubmit={() => changeTaskName(task.id, newName)}>
            {popup && (
                <div className="changeNamePopUp">
                    <input className="newTaskName"
                           placeholder={"Task New Name"} required={true}
                           value={newName}
                           name="task"
                           onChange={(task) => setNewName(task.target.value)}
                    />
                </div>
            )}
        </form>
        </>
    )
}
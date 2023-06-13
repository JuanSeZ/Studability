import * as React from "react";
import {useState} from "react";
import {PencilSquare} from "react-bootstrap-icons";
import ClickAwayListener from "react-click-away-listener";

export default function ToDoListItem(props) {

    const [popup, setPopup] = useState(false)
    const {task, deleteTask, changeName} = props
    const [newName, setNewName] = useState(task.name);

    function changeTaskName(id, newName) {
        changeName(id, newName);
        setPopup(false);
    }

    function deleteTaskFn(id) {
        deleteTask(id)
    }

    return (
        <>
            <input className="form-check-input" type="checkbox" style={{marginTop: "12px"}}/>
            <label className="form-check-label text-capitalize" style={{marginLeft: "10px"}}>
                {task.name + " "}
            </label>
            {" "}
            <button className="btn btn-outline-primary" onClick={() => setPopup(true)}>
                <PencilSquare></PencilSquare>
            </button>
            <button className="btn btn-outline-danger deleteButton"
                    onClick={() => deleteTaskFn(task.id)}
                    style={{marginLeft: "10px", marginTop: "2px"}}>X
            </button>

            <form onSubmit={() => changeTaskName(task.id, newName)}>
                {popup && (
                    <ClickAwayListener onClickAway={() => setPopup(false)}>
                        <div className="changeNamePopUp">
                            <input className="newTaskName text-capitalize text-center"
                                   placeholder={"Task New Name"} required={true}
                                   value={newName}
                                   name="task"
                                   onChange={(task) => setNewName(task.target.value)}
                            />
                        </div>
                    </ClickAwayListener>
                )}
            </form>
        </>
    )
}
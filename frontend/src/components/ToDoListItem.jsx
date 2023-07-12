import * as React from "react";
import {useState} from "react";
import {PencilSquare} from "react-bootstrap-icons";
import ClickAwayListener from "react-click-away-listener";
import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'

export default function ToDoListItem(props) {

    const [popup, setPopup] = useState(false)
    const {task, deleteTask, changeName} = props
    const [newName, setNewName] = useState(task.name);

    function changeTaskName(id, newName, task) {
        task.preventDefault(); // Prevent page reload

        changeName(id, newName);
        setPopup(false);

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Task modified!',
            showConfirmButton: false,
            timer: 1200
        }).then(() => {
            window.location.reload(); // Reload the page
        });
    }

    function deleteTaskFn(id) {
        deleteTask(id)
    }

    function showConfirmDeleteAlert() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#adb5bd',
            confirmButtonText: 'Yes, delete it!',
            reverseButtons: true,
            allowEnterKey: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTaskFn(task.id)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your task has been deleted',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (
        <>
            <input className="form-check-input" type="checkbox" style={{marginTop: 11, width: 16, height: 16}}/>
            <label className="form-check-label text-capitalize" style={{marginLeft: "10px"}}>
                {task.name + " "}
            </label>
            {" "}
            <button className="btn btn-outline-primary modifyTaskButton" onClick={() => setPopup(true)}>
                <PencilSquare></PencilSquare>
            </button>
            <button className="btn btn-outline-danger deleteButton"
                    onClick={showConfirmDeleteAlert}
                    style={{marginLeft: "4px", marginTop: "2px"}}>X
            </button>

            <form onSubmit={(event) => changeTaskName(task.id, newName, event)}>
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
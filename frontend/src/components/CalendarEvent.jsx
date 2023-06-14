import ClickAwayListener from "react-click-away-listener";
import DatePicker from "react-date-picker";
import React, {useState} from "react";
import {PencilSquare} from "react-bootstrap-icons";

export default function CalendarEvent(props) {

    const {event, deleteEvent, modifyEvent, parser} = props
    const [popup, setPopup] = useState(false)
    const [eventsNewName, setEventsNewName] = useState(event.title)
    const [eventsNewDescription, setEventsNewDescription] = useState(event.description)
    const [eventsNewDate, setEventNewDate] = useState(parser(event.date))

    function deleteEventFn(event) {
        deleteEvent(event)
    }

    function modifyEventFn(){
        if (eventsNewName.length !== 0){
            setEventsNewName(eventsNewName)
        }
        if (eventsNewDescription.length !== 0){
            setEventsNewDescription(eventsNewDescription)
        }
        if (eventsNewDate !== event.date){
            setEventNewDate(eventsNewDate)
        }
        modifyEvent(event, eventsNewName, eventsNewDate, eventsNewDescription)
    }

    const handleSaveChanges = () => {
        if (!eventsNewName.trim() || !eventsNewDate) {
            return;
        }
        modifyEventFn();
    };

    return (
        <tr key={event.dateValue}>
            <td align="center">{event.date}</td>
            <td align="center">{event.title}</td>
            <td align="center">{event.description}</td>
            <td align="center" style={{width: "auto"}}>
                <button className="modifyButton mb-2" onClick={() => setPopup(true)}><PencilSquare></PencilSquare></button>
                <form>
                    {popup && (
                        <ClickAwayListener onClickAway={() => setPopup(false)}>
                            <div>
                                <div className="changeEventName">
                                    <text>New Name: </text>
                                    <input className="mt-1 border rounded border-2 border-dark text-center"
                                           placeholder={"Event New Name"}
                                           required
                                           value={eventsNewName}
                                           onChange={(event) => setEventsNewName(event.target.value)}
                                    />
                                </div>
                                <div className="mt-3 mb-3 text-center">
                                    <text>New Description: </text>
                                    <input className="mt-1 border border-2 rounded border-dark text-center"
                                           placeholder={"Event New Description"}
                                           value={eventsNewDescription}
                                           onChange={(event) => setEventsNewDescription(event.target.value)}
                                    />
                                </div>
                                <div className="text-center mt-4">
                                    <text>New Date: </text>
                                    <DatePicker className="datePicker"
                                                required
                                                onChange={setEventNewDate}
                                                value={eventsNewDate}/>
                                </div>
                                <button className="btn btn-outline-success mt-2"
                                        onClick={handleSaveChanges}>Save Changes</button>
                            </div>
                        </ClickAwayListener>
                    )}
                </form>
            </td>
            <td>
                <button type="button"
                        id={event.id}
                        className="btn btn-danger"
                        onClick={deleteEventFn}>X
                </button>
            </td>
        </tr>
    )

}
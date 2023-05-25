import ClickAwayListener from "react-click-away-listener";
import DatePicker from "react-date-picker";
import React, {useEffect, useState} from "react";
import {useStudability} from "../service/Studability";
import {useAuthProvider} from "../auth/auth";


export default function MyCalendarPage(){

    const [dateValue, setDate] = useState(new Date());
    const [popup, setPopup] = useState(false)
    const [title, setTitle] = useState('')
    const [msg, setErrorMsg] = useState(undefined)
    const studability = useStudability();
    const auth = useAuthProvider()
    const token = auth.getToken();
    const [events, setEvents] = useState([])
    const [description, setDescription] = useState('')

    useEffect(() => {
        studability.listEvents(token,(events) => setEvents(events.sort(compareDates)), (msg) => console.log(msg));
    }, [])

    const changeNameEvent = (event) => {
        setTitle(event.target.value)
    }

    const changeDescriptionEvent = (event) => {
        setDescription(event.target.value)
    }

    const resetForm = () => {
        setTitle('')
        setDate(new Date())
        setDescription('')
    }

    function addEvent(eventForm) {
        addEventToBackEnd(eventForm)
        resetForm()
    }

    function addEventToBackEnd(event) {
        studability.addEvent(event,
            token,
            (addedEvent) => addEventToCalendar(addedEvent),
            () => {
                setErrorMsg('Event already exists')
                resetForm();
            })
    }

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split("/");
        return new Date(year, month - 1, day);
    }

    const compareDates = (a, b) => {
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        return dateA - dateB;
    };

    function addEventToCalendar(addedEvent) {
        setEvents(events.concat(addedEvent).sort(compareDates))
    }

    const handleSubmit = async e => {
        e.preventDefault();
        addEvent({
            title: title,
            dateValue: parseDateToString(dateValue),
            description: description
        });
        setPopup(false);
    }

    function parseDateToString(date) {
        const month = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        //month is 0 based, January == 0, february == 1,, ...
        return date.getDate() + "/" + month[date.getMonth()] + "/" + date.getFullYear()
    }


    function deleteEvent(event) {
        let eventIdToDelete = event.target.getAttribute('id');
        studability.deleteEvent(eventIdToDelete,
            token,
            (eventDeleted) => handleDelete(eventDeleted),
            () =>
                setErrorMsg('Could not delete')
        )
        console.log(events)
    }

    function handleDelete(eventDeleted){
        const newEvents = events.filter((event) => eventDeleted.id !== event.id)
        setEvents(newEvents)
    }

    return (
        <div>
            <br/>

            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <h1 className="header">
                    <header>My Calendar</header>
                </h1>
            </div>

            <br/>

            <div id="addEventButton">
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <button className="btn btn-primary" onClick={() => setPopup(true)}>+ Add Event</button>
                </div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <form onSubmit={handleSubmit}>
                        {popup && (
                            <ClickAwayListener onClickAway={() => setPopup(false)}>
                                <div className={'popup'}>
                                    <div className="date">
                                        <text className="dateText">Pick event's date:</text>
                                        <DatePicker className="datePicker" onChange={setDate} value={dateValue}/>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <input className="nameEvent"
                                               placeholder="Event's name" required={true}
                                               value={title}
                                               name="event"
                                               onChange={changeNameEvent}/>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <input className="description"
                                               placeholder="Event's description" required={true}
                                               value={description}
                                               name="description"
                                               onChange={changeDescriptionEvent}/>
                                    </div>
                                    <div className="saveButton" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <button className="btn btn-success" type="submit">Save Event</button>
                                    </div>
                                </div>
                            </ClickAwayListener>
                        )}
                    </form>
                </div>
            </div>

            <br/>

            <table className="table" name="table" class="center">
                <thead>
                <tr>
                    <th scope="row" class="text-center">Date</th>
                    <th scope="row" class="text-center">Event</th>
                    <th scope="row" class="text-center">Description</th>
                    <th scope="row" className="text-center">Delete</th>
                </tr>
                </thead>
                <tbody>
                {events.map(event => (
                    <tr key={event.dateValue}>
                        <td align="center">{event.date}</td>
                        <td align="center">{event.title}</td>
                        <td align="center">{event.description}</td>
                        <td><button type="button" id={event.id} className="btn btn-danger" onClick={deleteEvent}>X</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
};
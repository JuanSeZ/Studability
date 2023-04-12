import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../calendarDesign.css';
import ClickAwayListener from 'react-click-away-listener';
import {useStudability} from "../service/Studability";
import DatePicker from 'react-date-picker';
import {useAuthProvider} from "../auth/auth";
import {useSearchParams} from "react-router-dom";
import * as events from "events";

export default function CalendarPage() {

    const [dateValue, setDate] = useState(new Date());
    const [popup, setPopup] = useState(false)
    const [title, setTitle] = useState('')
    const [setErrorMsg] = useState(undefined)
    const studability = useStudability();
    const auth = useAuthProvider()
    const token = auth.getToken();
    const [events, setEvents] = useState([])

    useEffect(() => {
        studability.listEvents(token,(events) => setEvents(events), (msg) => console.log(msg));
    }, [])

    const changeNameEvent = (event) => {
        setTitle(event.target.value)
    }

    const resetForm = () => {
        setTitle('')
        setDate(null)
    }

    function addEvent(eventForm) {
        addEventToBackEnd(eventForm)
        resetForm()
    }

    function addEventToBackEnd(addedEvent) {
        studability.addEvent(addedEvent,
            token,
            () => addEventToCalendar(addedEvent),
            () => {
                setErrorMsg('Event already exists')
                resetForm();
            })
    }

    function addEventToCalendar(addedEvent) {
        setEvents(events.concat(addedEvent));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        addEvent({
            title: title,
            dateValue: parseDateToString(dateValue)
        });
    }

    function parseDateToString(date) {
        const month = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        //month is 0 based, January == 0, february == 1,, ...
        return date.getDate() + "/" + month[date.getMonth()] + "/" + date.getFullYear()
    }

    return (
        <div>
            <br/>

            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <h1>
                    <header>My Calendar</header>
                </h1>
            </div>

            <br/>
            <br/>

            <div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <button className="btn btn-primary" onClick={() => setPopup(true)}>+ Add Event</button>
                </div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <form onSubmit={handleSubmit}>
                        {popup && (
                            <ClickAwayListener onClickAway={() => setPopup(false)}>
                                <div className={'popup'}>
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <DatePicker onChange={setDate} value={dateValue}/>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <input className="nameEvent"
                                               placeholder="Event name"
                                               value={title}
                                               name="event"
                                               onChange={changeNameEvent}/>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <button className="btn btn-success" type="submit">Save Event</button>
                                    </div>
                                </div>
                            </ClickAwayListener>
                        )}
                    </form>
                </div>
            </div>

            <br/>
            <br/>

            <div className="container">
                <h1 style={{justifyContent: "center", alignItems: "center", display: "flex"}}>Events scheduled</h1>
                <ul>
                    {events.map(event =>
                        <li key={event.title}>{event.title}</li>
                    )}
                </ul>
            </div>

            <br/>
        </div>
    )
};

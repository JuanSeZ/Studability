import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../calendarDesign.css';
import ClickAwayListener from 'react-click-away-listener';
import {useStudability} from "../service/Studability";
import DatePicker from 'react-date-picker'

export default function CalendarPage() {

    const [dateValue, setDate] = useState(new Date());
    const [popup, setPopup] = useState(false)
    const [title, setTitle] = useState('')
    const studability = useStudability();

    const changeNameEvent = (event) => {
        setTitle(event.target.value)
    }

    const resetForm = () => {
        setTitle('')
        setDate(null)
    }

    function addEvent(credentials) {
        studability.addEvent(credentials, title, dateValue)
        resetForm()
    }

    const handleSubmit = async e => {
        e.preventDefault();
        await addEvent({
            title: title,
            dateValue: dateValue
        })
    }

/* TODO make this function show the events for that day */
    function handleClickDate() {

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
                                               onChange={changeNameEvent}>
                                        </input>
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

            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Calendar onClickDay={handleClickDate} defaultView="year" value={new Date()}/>
            </div>

            <br/>
        </div>
    )
};

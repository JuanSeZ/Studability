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
    const [nameEvent, setNameEvent] = useState('')
    const studability = useStudability();

    const changeNameEvent = (event) => {
        setNameEvent(event.target.value)
    }


    const resetForm = () => {
        setNameEvent('')
        setDate(null)
    }

    function addEvent(credentials) {
        studability.addEvent(credentials, nameEvent, dateValue)
        resetForm()
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
                    {popup && (
                        <ClickAwayListener onClickAway={() => setPopup(false)}>
                            <div className={'popup'}>
                                <input className="nameEvent"
                                       placeholder="Event name"
                                       value={nameEvent}
                                       onChange={changeNameEvent}>
                                </input>
                                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <DatePicker onChange={setDate} value={dateValue}/></div>
                                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <button className="btn btn-success" onClick={addEvent}>Save Event</button>
                                </div>
                            </div>
                        </ClickAwayListener>
                    )}
                </div>
            </div>
        </div>
    )
};

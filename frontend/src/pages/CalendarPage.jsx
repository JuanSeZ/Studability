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
            <button onClick={() => setPopup(true)}>Add Event</button>
            {popup && (
                <ClickAwayListener onClickAway={() => setPopup(false)}>
                    <div className={'popup'}>
                        <input className="nameEvent"
                               placeholder="Event name"
                               value={nameEvent}
                               onChange={changeNameEvent}>
                        </input>
                        <div><DatePicker onChange={setDate} value={dateValue}/></div>
                        <div>
                            <button onClick={addEvent}>Save Event</button>
                        </div>
                    </div>
                </ClickAwayListener>
            )}
        </div>
    )
};

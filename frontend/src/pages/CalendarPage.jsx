import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../calendarDesign.css';

export default function CalendarPage() {

    const [value, onChange] = useState(new Date());
    return (
        <div className="Calendar">

        <br/>

            <div style={{justifyContent: "center", alignItems: "center", display: "flex"}}>
                <header><h1>My calendar</h1></header>
            </div>

            <br/>

            <div className="Calendar container">
                <main className="Calendar container content" style={{justifyContent: "center", alignItems: "center", display: "flex"}}>
                    <Calendar onChange={onChange} value={value}/>
                </main>
            </div>
        </div>
    );
}
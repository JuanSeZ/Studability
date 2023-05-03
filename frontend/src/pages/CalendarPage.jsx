import React from 'react';
import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarStyle.css';
import MyNavbar from "../components/MyNavbar";
import MyCalendarPage from "../components/MyCalendarPage";


export default function CalendarPage() {
    return (
        <div>
            <row>
                <MyNavbar/>
            </row>
            <row>
                <div className="column">
                    <MyCalendarPage/>
                </div>
            </row>
        </div>
    )
};

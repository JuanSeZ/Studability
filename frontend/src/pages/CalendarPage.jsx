import React from 'react';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendarDesign.css';
import MyNavbar from "../components/MyNavbar";
import MyCalendarPage from "../components/MyCalendarPage";


export default function CalendarPage() {
    return (
        <div>
            <MyNavbar/>
            <MyCalendarPage/>
        </div>
    )
};

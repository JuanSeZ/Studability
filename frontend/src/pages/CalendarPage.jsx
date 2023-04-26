import React, {useEffect, useState} from 'react';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendarDesign.css';
import MyNavbar from "../components/MyNavbar";
import MyCalendarPage from "../components/MyCalendarPage";

/* TODO fix date bug
and make array of events ordered
 */

export default function CalendarPage() {
    return (
        <div>
            <MyNavbar/>
            <MyCalendarPage/>
        </div>
    )
};

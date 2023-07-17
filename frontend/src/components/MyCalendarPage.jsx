import ClickAwayListener from "react-click-away-listener";
import DatePicker from "react-date-picker";
import React, { useEffect, useState } from "react";
import { useStudability } from "../service/Studability";
import { useAuthProvider } from "../auth/auth";
import CalendarEvent from "./CalendarEvent";
import Swal from "sweetalert2";
import { Button, Form, Modal } from "react-bootstrap";

export default function MyCalendarPage() {
    const [dateValue, setDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [errorMsg, setErrorMsg] = useState(undefined);
    const studability = useStudability();
    const auth = useAuthProvider();
    const token = auth.getToken();
    const [events, setEvents] = useState([]);
    const [description, setDescription] = useState("");

    useEffect(() => {
        studability.listEvents(
            token,
            (events) => setEvents(events.sort(fullSorter)),
            (msg) => console.log(msg)
        );
    }, []);

    const fullSorter = (a, b) => {
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        const [hoursA, minutesA] = a.time.split(":");
        const [hoursB, minutesB] = b.time.split(":");

        const timeA = parseInt(hoursA || 0) * 60 + parseInt(minutesA || 0);
        const timeB = parseInt(hoursB || 0) * 60 + parseInt(minutesB || 0);

        if (dateA.getTime() === dateB.getTime()) {
            return timeA - timeB;
        }

        return dateA.getTime() - dateB.getTime();
    };

    const changeNameEvent = (event) => {
        setTitle(event.target.value);
    };

    const changeDescriptionEvent = (event) => {
        setDescription(event.target.value);
    };

    function changeTimeEvent(event) {
        setTime(event.target.value);
    }

    const resetForm = () => {
        setTitle("");
        setDate(new Date());
        setDescription("");
        setTime("");
    };

    function addEvent(eventForm) {
        addEventToBackEnd(eventForm);
        resetForm();
    }

    function addEventToBackEnd(event) {
        studability.addEvent(
            event,
            token,
            (addedEvent) => addEventToCalendar(addedEvent),
            () => {
                setErrorMsg("Event already exists");
                resetForm();
            }
        );
    }

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split("/");
        return new Date(year, month - 1, day);
    };

    function addEventToCalendar(addedEvent) {
        setEvents(events.concat(addedEvent).sort(fullSorter));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !dateValue) {
            setErrorMsg("Please fill out all required fields");
            return;
        }

        if (!isValidTime(time)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Time",
                text: "Please enter a valid time in 24-hour format (HH:MM)",
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        addEvent({
            title: title,
            dateValue: parseDateToString(dateValue),
            description: description,
            time: time,
        });

        setShowModal(false);
        await Swal.fire({
            icon: "success",
            title: "Event added to Calendar!",
            timer: 1500,
            showConfirmButton: false,
        });
    };


    function parseDateToString(date) {
        const month = ["01", "02", "03", "04", "05", "06", "07", "08", "10", "12"];
        // month is 0 based, January == 0, february == 1,, ...
        return (
            date.getDate() + "/" + month[date.getMonth()] + "/" + date.getFullYear()
        );
    }

    function deleteEvent(event) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#adb5bd",
            confirmButtonText: "Yes, delete it!",
            reverseButtons: true,
            allowEnterKey: true,
        }).then((result) => {
            if (result.isConfirmed) {
                let eventIdToDelete = event.target.getAttribute("id");
                studability.deleteEvent(
                    eventIdToDelete,
                    token,
                    (eventDeleted) => handleDelete(eventDeleted),
                    () => setErrorMsg("Could not delete")
                );
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your event has been deleted",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    }

    function modifyEvent(event, newName, newDateValue, newDescription, newTime) {
        studability.modifyEvent(
            event.id,
            {
                dateValue: parseDateToString(newDateValue),
                title: newName,
                description: newDescription,
                time: newTime,
            },
            token,
            (events) => setEvents(events),
            (msg) => setErrorMsg(msg)
        );

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Event modified!",
            showConfirmButton: false,
            timer: 1200,
        }).then(() => {
            window.location.reload();
        });
    }

    function handleDelete(eventDeleted) {
        const newEvents = events.filter((event) => eventDeleted.id !== event.id);
        setEvents(newEvents);
    }

    // Function to check if the entered time is valid
    function isValidTime(time) {
        const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;
        return timeRegex.test(time);
    }

    return (
        <div>
            <br />

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h1 className="header">
                    <header>My Calendar</header>
                </h1>
            </div>

            <br />

            <div id="addEventButton">
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        + Add Event
                    </button>
                </div>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title className="modalTitle">Add Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <form onSubmit={handleSubmit}>
                            <div className="text-center mt-4">
                                <label>Pick Event's Date:</label>
                                <text> </text>
                                <DatePicker
                                    className="datePicker"
                                    required
                                    onChange={setDate}
                                    value={dateValue}
                                />
                            </div>
                            <div className="mt-3 mb-3 text-center">
                                <label>Event's Time:</label>
                                <text> </text>
                                <input
                                    className="mt-1 border border-2 rounded border-dark text-center"
                                    placeholder="Event's Time. 24 hours format (HH:MM)"
                                    required
                                    value={time}
                                    onChange={changeTimeEvent}
                                />
                            </div>
                            <div className="changeEventName">
                                <label>Event's Name:</label>
                                <text> </text>
                                <input
                                    className="mt-1 border rounded border-2 border-dark text-center"
                                    placeholder="Event's Name"
                                    required
                                    value={title}
                                    onChange={changeNameEvent}
                                />
                            </div>
                            <div className="mt-3 mb-3 text-center">
                                <label>Event's Description:</label>
                                <text> </text>
                                <input
                                    className="mt-1 border border-2 rounded border-dark text-center"
                                    placeholder="Event's Description (Optional)"
                                    value={description}
                                    onChange={changeDescriptionEvent}
                                />
                            </div>
                            <div className="text-center mt-4">
                                <Button variant="danger" className="mr-2" onClick={() => setShowModal(false)}>
                                    Close
                                </Button>
                                <Button variant="success" type="submit">
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>

            <br />

            <div style={{ height: 510, overflowY: "auto" }}>
                {Array.isArray(events) && events.length > 0 ? (
                    <table className="table" name="table" className="center">
                        <thead>
                        <tr>
                            <th scope="row" className="text-center">
                                Date
                            </th>
                            <th scope="row" className="text-center">
                                Time
                            </th>
                            <th scope="row" className="text-center">
                                Event
                            </th>
                            <th scope="row" className="text-center">
                                Description
                            </th>
                            <th scope="row" className="text-center">
                                Edit
                            </th>
                            <th scope="row" className="text-center">
                                Delete
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {events.map((event) => (
                            <CalendarEvent
                                modifyEvent={modifyEvent}
                                event={event}
                                parser={parseDate}
                                deleteEvent={deleteEvent}
                            ></CalendarEvent>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p
                        style={{
                            justifyContent: "center",
                            textAlign: "center",
                            fontSize: 20,
                            fontFamily: "sans-serif",
                            marginTop: 10,
                            color: "gray",
                        }}
                    >
                        No upcoming events.
                    </p>
                )}
            </div>
        </div>
    );
}


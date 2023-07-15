import React, { useState } from "react";
import { PencilSquare } from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DatePicker from "react-date-picker";

export default function CalendarEvent(props) {
    const { event, deleteEvent, modifyEvent, parser } = props;
    const [showModal, setShowModal] = useState(false);
    const [eventsNewName, setEventsNewName] = useState(event.title);
    const [eventsNewDescription, setEventsNewDescription] = useState(
        event.description
    );
    const [eventsNewDate, setEventNewDate] = useState(parser(event.date));

    function deleteEventFn(event) {
        deleteEvent(event);
    }

    function modifyEventFn() {
        if (eventsNewName.length !== 0) {
            setEventsNewName(eventsNewName);
        }
        if (eventsNewDescription.length !== 0) {
            setEventsNewDescription(eventsNewDescription);
        }
        if (eventsNewDate !== event.date) {
            setEventNewDate(eventsNewDate);
        }
        modifyEvent(event, eventsNewName, eventsNewDate, eventsNewDescription);
    }

    const handleSaveChanges = (event) => {
        event.preventDefault(); // Prevent form submission
        modifyEventFn();
        setShowModal(false); // Close the modal after saving changes
    };

    return (
        <tr key={event.dateValue}>
            <td align="center">{event.date}</td>
            <td align="center">{event.title}</td>
            <td align="center">{event.description.length > 0 ? event.description : "-"}</td>
            <td align="center" style={{ width: "auto" }}>
                <button
                    className="modifyButton mb-2"
                    onClick={() => setShowModal(true)}
                >
                    <PencilSquare />
                </button>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title className="modalTitle">Edit Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <form onSubmit={handleSaveChanges}>
                            <div className="changeEventName">
                                <label>New Name:</label><text> </text>
                                <input
                                    className="mt-1 border rounded border-2 border-dark text-center"
                                    placeholder="Event's new Name"
                                    required
                                    value={eventsNewName}
                                    onChange={(event) => setEventsNewName(event.target.value)}
                                />
                            </div>
                            <div className="mt-3 mb-3 text-center">
                                <label>New Description:</label><text> </text>
                                <input
                                    className="mt-1 border border-2 rounded border-dark text-center"
                                    placeholder="Event's new Description (Optional)"
                                    value={eventsNewDescription}
                                    onChange={(event) =>
                                        setEventsNewDescription(event.target.value)
                                    }
                                />
                            </div>
                            <div className="text-center mt-4">
                                <label>New Date:</label><text> </text>
                                <DatePicker
                                    className="datePicker"
                                    required
                                    onChange={setEventNewDate}
                                    value={eventsNewDate}
                                />
                            </div>
                            <div className="text-center mt-4">
                                <Button variant="danger" className="mr-2"
                                        onClick={() => setShowModal(false)}>
                                    Close
                                </Button>
                                <Button variant="success"
                                        type="submit">
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </td>
            <td>
                <button
                    type="button"
                    id={event.id}
                    className="btn btn-danger"
                    onClick={deleteEventFn}
                >
                    X
                </button>
            </td>
        </tr>
    );
}

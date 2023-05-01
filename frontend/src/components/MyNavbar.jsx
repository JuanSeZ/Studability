import { Navbar, Button, Offcanvas } from 'react-bootstrap';
import {Calendar, People, Folder, Clock, BoxArrowRight, List} from 'react-bootstrap-icons';
import logo from '../images/StudabilityLogo.png';
import {useState} from "react";
import {useNavigate} from "react-router";
import {useAuthProvider} from "../auth/auth";
import {useStudability} from "../service/Studability";


export default function MyNavbar() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const navigate = useNavigate();
    const studability = useStudability();
    const auth = useAuthProvider();

    function logout() {
        let userToken;
        userToken = auth.getToken();
        studability.logout(userToken,
            () => {
                auth.removeToken(userToken)
                navigate("/", {replace: true});
            },
            (msg) => console.log(msg))
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/home">
                    <img src={logo} height="50" alt="Logo" />
                    Studability
                </Navbar.Brand>
                <Button variant="outline-primary" onClick={() => setShowOffcanvas(true)} className="ms-auto">
                    <List />
                </Button>
            </Navbar>

            <Offcanvas placement="end" show={showOffcanvas} onHide={() => setShowOffcanvas(false)}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <List />
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a href="home/calendar" className="nav-link" onClick={() => setShowOffcanvas(false)}>
                                <Calendar /> Calendar
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link" onClick={() => setShowOffcanvas(false)}>
                                <People /> Friends
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link" onClick={() => setShowOffcanvas(false)}>
                                <Folder /> Files
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="home/study-time" className="nav-link" onClick={() => setShowOffcanvas(false)}>
                                <Clock /> Study Time
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link text-danger"  onClick={() => {
                                setShowOffcanvas(false);
                                logout()
                            }
                            }>
                                <BoxArrowRight /> Logout
                            </a>
                        </li>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

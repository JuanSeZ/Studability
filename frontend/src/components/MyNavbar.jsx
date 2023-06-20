import {Navbar, Button, Offcanvas, NavLink} from 'react-bootstrap';
import {Calendar, People, Folder, Clock, BoxArrowRight, List, Person} from 'react-bootstrap-icons';
import logo from '../images/StudabilityLogo.png';
import {useState} from "react";
import {useNavigate} from "react-router";
import {useAuthProvider} from "../auth/auth";
import {useStudability} from "../service/Studability";
import {Link} from "react-router-dom";
import '../styles/NavBarStyle.css';

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
                    <img src={logo} height="50" alt="Logo" className="logo"/>
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
                            <Link to="/home/calendar" className="nav-link" onClick={() => setShowOffcanvas(false)}>
                                <Calendar /> Calendar
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/home/friends" className="nav-link" onClick={() => setShowOffcanvas(false)}>
                                <People /> Friends
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/home/files" className="nav-link" onClick={() => setShowOffcanvas(false)}>
                                <Folder /> Files
                            </a>
                        </li>
                        <li className="nav-item">
                            <Link to="/home/study-time" className="nav-link" onClick={() => setShowOffcanvas(false)}>
                                <Clock /> Study Time
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/home/editProfile" className="nav-link" onClick={() => setShowOffcanvas(false)}>
                                <Person /> My Profile
                            </a>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link text-danger"  onClick={() => {
                                setShowOffcanvas(false);
                                logout()
                            }
                            }>
                                <BoxArrowRight /> Logout
                            </Link>
                        </li>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

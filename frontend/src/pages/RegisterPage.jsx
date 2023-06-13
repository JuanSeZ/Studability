import * as React from 'react'
import {Link} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router";
import {useStudability} from "../service/Studability";
import "../styles/RegisterStyle.css"

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [career, setCareer] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState(undefined)
    const navigate = useNavigate();
    const studability = useStudability();

    const handleSubmit = async e => {
        e.preventDefault();
        registerUser({
            name: name,
            surname: surname,
            career: career,
            email: email,
            password: password
        })
    }

    const resetForm = () => {
        setName('')
        setSurname('')
        setCareer('')
        setEmail('')
        setPassword('')
    }

    const registerUser = (mail) => {
        studability.register(
            mail,
            () => navigate("/login?ok=true"),
            () => {
                setErrorMsg('User with that e-mail already exists!')
                resetForm();
            }
        )
    }

    const nameChange = (event) => {
        setName(event.target.value)
    }

    const surnameChange = (event) => {
        setSurname(event.target.value)
    }

    const emailChange = (event) => {
        setEmail(event.target.value)
    }

    const passwordChange = (event) => {
        setPassword(event.target.value)
    }

    const careerChange = (event) => {
        setCareer(event.target.value)
    }

    function validateNotNull(value) {
        if (value == null) {
            return "All fields must be filled"
        }
    }

    return (
        <div>
            {errorMsg && <div className="alert alert-danger" role="alert">{errorMsg}</div>}
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95vh'}}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="col-md-12 text-center">
                            <h1>Register</h1>
                        </div>
                    </div>

                    <br/>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Name</span>
                        <input type="name" required
                               className="form-control"
                               placeholder="Enter your name here"
                               value={name}
                               name="name"
                               onChange={nameChange}/>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Surname</span>
                        <input type="surname" required
                               className="form-control"
                               placeholder="Enter your surname here"
                               value={surname}
                               name="surname"
                               onChange={surnameChange}/>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Career</span>
                        <input type="career" required
                               className="form-control"
                               placeholder="Enter your career here"
                               value={career}
                               name="career"
                               onChange={careerChange}/>
                    </div>


                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">e-mail</span>
                        <input type="email" required
                               className="form-control"
                               placeholder="name@example.com"
                               value={email}
                               name="email"
                               onChange={emailChange}/>
                    </div>


                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Password</span>
                        <input type="password" required
                               className="form-control"
                               id="floatingPassword"
                               placeholder="Password"
                               name="password"
                               value={password}
                               onChange={passwordChange}/>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Link to="/">
                            <button type="button" className="btn btn-outline-secondary backButton">Back</button>
                        </Link>
                        <button type="submit" className="btn btn-outline-success registerButton">Register</button>

                    </div>

                </form>
            </div>
        </div>
    )
}
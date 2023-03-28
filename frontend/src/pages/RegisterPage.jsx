import * as React from 'react'
import {Link} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router";
import {useStudability} from "../service/Studability";

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

    return (
        <div>
            {errorMsg && <div className="alert alert-danger" role="alert">{errorMsg}</div>}
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="col-md-12 text-center">
                            <h1>Register</h1>
                        </div>
                    </div>

                    <div className="input-group">
                        <span className="input-group-text">Full Name</span>
                        <input type="name"
                               aria-label="First name"
                               className="form-control"
                               placeholder="Firstname"
                               value={name}
                               name="name"
                               onChange={nameChange}
                        ></input>
                        <input type="surname"
                               aria-label="Surname"
                               className="form-control"
                               placeholder="Surname"
                               value={surname}
                               name="surname"
                               onChange={surnameChange}
                        ></input>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Career</span>
                        <input type="career"
                               className="form-control"
                               placeholder="Enter your career here"
                               value={career}
                               name="career"
                               onChange={careerChange}/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">e-mail</span>
                        <input type="email"
                               className="form-control"
                               placeholder="name@example.com"
                               value={email}
                               name="email"
                               onChange={emailChange}/>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Password</span>
                        <input type="password"
                               className="form-control"
                               id="floatingPassword"
                               placeholder="Password"
                               name="password"
                               value={password}
                               onChange={passwordChange}/>
                    </div>

                    <div>
                        <button type="submit">Register</button>
                    </div>

                    <div>
                        <Link to="/">Back</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
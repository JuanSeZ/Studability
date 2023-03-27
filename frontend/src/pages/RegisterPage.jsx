import * as React from 'react'
import {Link} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router";
import {useStudability} from "../service/Studability";

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [lastName, setLastname] = useState('')
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
            lastName: lastName,
            career: career,
            email: email,
            password: password
        })
    }

    const resetForm = () => {
        setName('')
        setLastname('')
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

    const lastnameChange = (event) => {
        setLastname(event.target.value)
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
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '80vh'}}>
            {errorMsg && <div className="alert alert-danger" role="alert">{errorMsg}</div>}
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
                    <input type="lastname"
                           aria-label="Last name"
                           className="form-control"
                           placeholder="Lastname"
                           value={lastName}
                           name="lastname"
                           onChange={lastnameChange}
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

                <div>
                    <input type="email"
                           placeholder="name@example.com"
                           value={email}
                           name="email"
                           onChange={emailChange}/>
                </div>

                <div>
                    <input type="password"
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
    )
}
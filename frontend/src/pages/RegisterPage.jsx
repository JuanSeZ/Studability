import * as React from 'react'
import {Link} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router";
import {useStudability} from "../service/Studability";


export const RegisterPage = () => {
    const [name, setName] = useState('')
    const [lastName, setLastname] = useState('')
    const [career, setCareer] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState(undefined)
    const navigate = useNavigate();
    const myStudability = useStudability();

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
        myStudability.register(
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
        <div>
            {errorMsg && <div className="alert alert-danger" role="alert">{errorMsg}</div>}
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div>
                    <input type="name"
                           placeholder="Name"
                           value={name}
                           name="name"
                           onChange={nameChange}/>
                </div>

                <div>
                    <input type="lastname"
                           placeholder="Lastname"
                           value={lastName}
                           name="lastname"
                           onChange={lastnameChange}/>
                </div>

                <div>
                    <input type="career"
                           placeholder="Career"
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

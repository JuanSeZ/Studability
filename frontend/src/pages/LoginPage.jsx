import * as React from 'react'
import {useState} from 'react'
import {Link, useSearchParams} from "react-router-dom";
import {useNavigate} from "react-router";
import {useStudability} from "../service/Studability";
import StudabilityLogo from "../images/StudabilityLogo.png";

function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState(undefined)
    const navigate = useNavigate()
    const studability = useStudability()
    const [searchParams, setSearchParams] = useSearchParams();
    const isOk = searchParams.get("ok")

    function loginUser(credentials) {
        studability.login(
            credentials,
            (token) => {
                setToken(token)
                navigate("/home", {replace: true});
            },
            (msg) => {
                setErrorMsg(msg)
                setEmail('')
                setPassword('')
            })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        await loginUser({
            email: email,
            password: password
        })
    }

    const usernameChange = (event) => {
        setEmail(event.target.value)
    }

    const passwordChange = (event) => {
        setPassword(event.target.value)
    }

    return (
        <div>
            {isOk && <div className="alert alert-success" role="alert">User created successfully!</div>}
            {errorMsg && <div className="alert alert-warning" role="alert">{errorMsg}</div>}

            <br/>
            <br/>

            <div style={{display: 'flex', marginLeft: 525, height: '0vh'}}>
                <img style={{width: 200, height: 200}} src={StudabilityLogo} className="logo" alt=""/>
            </div>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <form onSubmit={handleSubmit}>
                    <div style={{height: 200}}>
                        <div className="form-group">
                            <div className="col-md-12 text-center">
                                <h1>Log in</h1>
                            </div>

                            <br/>

                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email"
                                   value={email}
                                   onChange={usernameChange}
                                   className="form-control"
                                   id="exampleInputEmail1"
                                   aria-describedby="emailHelp"
                                   placeholder="Enter email"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password"
                                   value={password}
                                   onChange={passwordChange}
                                   className="form-control"
                                   id="exampleInputPassword1"
                                   placeholder="Password"/>
                        </div>
                    </div>

                    <br/>

                    <div className="col-md-12 text-center">
                        <div style={{height: 60}}>
                            <Link to="/">
                                <button type="button" className="btn btn-outline-secondary">Back</button>
                            </Link>
                            <button type="submit" className="btn btn-outline-primary">Log In</button>
                        </div>
                    </div>

                    <div className="col-md-12 text-center">
                        <h1 style={{fontSize: 14}}>
                            Don't have an account yet?
                        </h1>
                        <Link to="/register">
                            <button type="button" className="btn btn-outline-success">Register</button>
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    )
}

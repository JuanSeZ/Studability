import * as React from "react";
import {useStudability} from "../service/Studability";
import {useEffect, useState} from "react";
import {useAuthProvider} from "../auth/auth";
import "../styles/EditProfileStyle.css";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

export default function EditProfile() {

    const studability = useStudability();
    const auth = useAuthProvider();
    const token = auth.getToken();
    const [user, setUser] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [career, setCareer] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState(undefined)
    const [id, setId] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setName(user.name)
        setSurname(user.surname)
        setPassword(user.password)
        setCareer(user.career)
    }, [user])

    useEffect(() => {
        studability.getUser(token,
            (user) => setUser(user),
            () => setErrorMsg("Couldn't get user"))
    }, [])

    const changeName = (name) => {
        setName(name.target.value)
    }

    const changeSurname = (surname) => {
        setSurname(surname.target.value)
    }

    const changeCareer = (career) => {
        setCareer(career.target.value)
    }

    const changePassword = (password) => {
        setPassword(password.target.value)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    function getUserId() {
        return new Promise((resolve, reject) => {
            studability.getUserIdByToken(
                token,
                (userId) => resolve(userId),
                (msg) => reject(msg)
            );
        });
    }

    async function handleSubmit() {
        try {
            const userId = await getUserId();
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                confirmButtonText: 'Save',
                denyButtonText: 'Cancel',
                reverseButtons: true,
                confirmButtonColor: '#198754',
            }).then((result) => {
                if (result.isConfirmed) {
                    studability.setUser(
                        {
                            name: name,
                            surname: surname,
                            email: userId,
                            career: career,
                            password: password,
                        },
                        userId,
                        token,
                        () => showSavedBanner(),
                        () => setErrorMsg("There was a problem saving changes")
                    );
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    function showSavedBanner() {
        Swal.fire({
            title: 'Changes saved!',
            icon: 'success',
            confirmButtonColor: "#87CEFAFF"
        })
    }

    return (
        <div>
            <div style={{justifyContent: "center", alignContent: "center", display: "flex", marginTop: 20}}>
                <h1 className="header">
                    <header>Profile Information</header>
                </h1>
            </div>

            <div className="profile-description">
                <text>To edit your profile, write over your data.</text>
            </div>

            <div className="profile-description" style={{marginBottom: 20}}>
                <text>Then, click "Save Changes" or press Enter</text>
            </div>

            <div className="user-form">
                <form>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Name</span>
                        <input type="name" required
                               className="form-control"
                               placeholder={"Enter your new name"}
                               value={name}
                               name="name"
                               onChange={changeName}
                               style={{width: 250}}/>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Surname</span>
                        <input type="surname" required
                               className="form-control"
                               placeholder="Enter your new surname"
                               value={surname}
                               onChange={changeSurname}/>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Career</span>
                        <input type="career" required
                               className="form-control"
                               placeholder={"Enter your new career"}
                               value={career}
                               name="career"
                               onChange={changeCareer}/>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">
                          Password
                        </span>
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            className="form-control"
                            placeholder="Enter your new password"
                            value={password}
                            name="password"
                            onChange={changePassword}
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <button type="button"
                                className="btn btn-outline-success"
                                onClick={handleSubmit}>
                            Save Changes
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}
import {Link} from "react-router-dom";
import {useStudability} from "../service/Studability";
import {useState} from "react";
import {useNavigate} from "react-router";
import {useAuthProvider} from "../auth/auth"


export default function HomePage() {
    const auth = useAuthProvider()
    const studability = useStudability()
    const [errorMsg, setErrorMsg] = useState(undefined)
    const navigate = useNavigate()

    function logout() {
        let userToken;
        userToken = auth.getToken();
        studability.logout(userToken,
            () => {
                auth.removeToken(userToken)
                navigate("/", {replace: true});
            },
            (msg) => {
                setErrorMsg(msg)
            })
    }


    return (
        <div style={{justifyContent: "center"}}>

            <h1>Studability, study smart</h1>

            <button type="button" onClick={logout} className="btn btn-outline-danger">Log Out</button>
</div>

)
}
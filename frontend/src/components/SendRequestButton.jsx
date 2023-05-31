import React, {useState} from 'react'
import button from "bootstrap/js/src/button";

export default function SendRequestButton({ sendRequest, email}) {
    const [clicked, setClicked] = useState(false)

    const sent = 'Request Sent'
    const notSent = 'Send Request'


return (
    <button
        className={clicked ? "btn btn-outline-success" : "btn btn-outline-primary"}
        style={{marginLeft: 5, marginTop: 5}}
        onClick={() => {
            setClicked(true)
            sendRequest(email).catch(
                () => setClicked(false)
            )
        }}>
        {clicked ? sent : notSent}
    </button>
)
}
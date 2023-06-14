import {LayoutThreeColumns} from "react-bootstrap-icons";
import {Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useStudability} from "../service/Studability";
import {useAuthProvider} from "../auth/auth";
import FileCard from "./FileCard";

export default function Feed (){

    const [files, setFiles] = useState([])
    const studability = useStudability();
    const auth = useAuthProvider()
    const token = auth.getToken();

    useEffect(() => {
        studability.listFriendsFiles(
            token,
            (files) =>
                setFiles(
                    files.length === 0 ? (
                        <p style={{justifyContent: "center", textAlign:"center", fontSize:20, fontFamily: "sans-serif", marginTop:10, color:"gray"}}>No files uploaded by friends</p>
                    ) : (
                        files.map((file) => (
                            <FileCard title={file[1]} author={file[0]} />
                        ))
                    )
                ),
            (msg) => console.log(msg)
        );
    }, []);

    return (
        <Row>
            {files}
        </Row>
    );

}
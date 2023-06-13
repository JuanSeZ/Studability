import FileUpload from "./FileUpload";
import FileCard from "./FileCard";
import {useEffect, useState} from "react";
import {useStudability} from "../service/Studability";
import {useAuthProvider} from "../auth/auth";
import {Container, Row} from "react-bootstrap";

export default function MyFilePage ()  {
    const [files, setFiles] = useState([])
    const studability = useStudability();
    const auth = useAuthProvider()
    const token = auth.getToken();

    useEffect((children, func) => {
        studability.listUploadedFiles(token,(files) => setFiles(files.map(file => <FileCard title={file[1]} author={file[0]}/> )), (msg) => console.log(msg));
    }, [])


    return (
        <>
            <FileUpload/>
                <Row>
                    {files}
                </Row>
    </> );
};

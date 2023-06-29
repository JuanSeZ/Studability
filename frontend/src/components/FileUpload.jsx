import React, { useState } from "react";
import Spinner  from "react-bootstrap/Spinner";
import Form from 'react-bootstrap/Form';
import Swal from "sweetalert2";
import Button from 'react-bootstrap/Button';
import {useAuthProvider} from "../auth/auth";
import {useStudability} from "../service/Studability";
import "../styles/FilePageStyle.css";

export default function FileUpload ()  {

    const maxSize = 1048576; // 1 MB
    // const maxSize = 50 * 1024; // 50 KB
    const [isLoading, setIsLoading] = useState(false);
    const studability = useStudability();
    const auth = useAuthProvider();
    // actual file selected
    const [file, setFile] = useState(null);

    async function handleFileUpload(event) {
        event.preventDefault();
        const fileSize = file.target.files[0].size;
        if (fileSize > maxSize) {
            Swal.fire({
                    title: "File size exceeds the maximum limit of 1 MB",
                    icon: "warning",
                    confirmButtonColor: '#87CEFAFF',
                }
            )
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", file.target.files[0]);

        studability.uploadFile(formData, auth.getToken(),
            () => {
            setIsLoading(false);
            Swal.fire({
                title: "File uploaded successfully",
                timer: 1200,
                confirmButtonColor: "#87CEFAFF"
            }).then(() => window.open("/home/files", "_self"));
        },
            (error) => {
            setIsLoading(false);
            Swal.fire(`An ${error} error occurred`).then(() => window.open("/home/files", "_self"));
        });
    }

    return (
        <div className="file-upload-form-container">
            <Form>
                <Form.Group>
                    <text style={{fontFamily: "sans-serif", justifyContent: "center", alignContent: "center", display: "flex"}}>Maximum size: 1MB</text>
                    <Form.Control
                        type={"file"}
                        id="file-upload-input"
                        label="Upload a file"
                        onChange={setFile}
                        style={{marginTop: 10}}
                    />
                    <div className="text-center">
                        <Button
                            className="mt-3"
                            type="submit"
                            variant="primary"
                            onClick={handleFileUpload}
                            disabled={isLoading || file === null}
                        >
                            {isLoading ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                "Upload"
                            )}
                        </Button>
                    </div>
                </Form.Group>
            </Form>
        </div>
    );
};



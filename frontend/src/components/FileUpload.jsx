import React, { useState } from "react";
import Spinner  from "react-bootstrap/Spinner";
import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import {useAuthProvider} from "../auth/auth";
import {useStudability} from "../service/Studability";
import "../styles/FilePageStyle.css";

export default function FileUpload ()  {

    const [isLoading, setIsLoading] = useState(false);
    const studability = useStudability();
    const auth = useAuthProvider();
    // actual file selected
    const [file, setFile] = useState(null);

    function handleFileUpload(event)  {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", file.target.files[0]);

        studability.uploadFile(formData, auth.getToken(), () => {
            setIsLoading(false);
            alert("File uploaded successfully");
        }, (error) => {
            setIsLoading(false);
            alert(`Error uploading file: ${error.message}`);
        });
        window.open("/home/files", "_self")
    }


    return (
        <div className="file-upload-form-container">
            <Form>
                <Form.Group>
                    <Form.Control
                        type={"file"}
                        id="file-upload-input"
                        label="Upload a file"
                        onChange={setFile}
                    />
                    <div className="text-center">
                        <Button
                            className="mt-3"
                            type="submit"
                            variant="primary"
                            onClick={handleFileUpload}
                            disabled={isLoading}
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


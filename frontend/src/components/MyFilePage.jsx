import FileUpload from "./FileUpload";
import FileCard from "./FileCard";
import React, {useEffect, useState} from "react";
import {useStudability} from "../service/Studability";
import {useAuthProvider} from "../auth/auth";
import {Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

export default function MyFilePage() {
    const [files, setFiles] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [zipName, setZipName] = useState('')
    const [showInput, setShowInput] = useState(false)
    const studability = useStudability();
    const auth = useAuthProvider()
    const token = auth.getToken();

    useEffect((children, func) => {
        studability.listUploadedFiles(token,
            (files) => setFiles(files.map((file) => ({title: file[1], author: file[0]}))),
            (msg) => console.log(msg));
    }, []);

    const [fileCards, setFileCards] = useState([]);

    useEffect(() => {
        setFileCards(
            files.map((file) => (
                <FileCard
                    key={file.title}
                    title={file.title}
                    author={file.author}
                    onSelect={handleFileSelect}
                />
            ))
        );
    }, [files]);

    const handleFileSelect = (title, isSelected) => {
        if (isSelected) {
            setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, title]);
        } else {
            setSelectedFiles((prevSelectedFiles) =>
                prevSelectedFiles.filter((file) => file !== title)
            );
        }
    };

    const handleDownloadSelected = () => {
        Swal.fire({
            title: "Enter Zip File Name",
            input: "text",
            inputPlaceholder: "Enter zip file name",
            showCancelButton: true,
            confirmButtonText: "Download",
            cancelButtonText: "Cancel",
            reverseButtons: true,
            confirmButtonColor: "#87CEFAFF",
            inputValidator: (value) => {
                if (!value) {
                    return "Please enter a valid zip file name";
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const zipFileName = result.value;
                studability.handleDownloadSelectedFiles(selectedFiles, token, zipFileName);
            }
        });
    };

    const handleDeleteSelected = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#adb5bd',
            confirmButtonText: 'Yes, delete them!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                studability.deleteSelectedFiles(selectedFiles, token);
            }
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your files have been deleted',
                showConfirmButton: false,
                timer: 1500
            }).then(() => window.location.reload())
        })
    }

    function showDeleteAndDownloadSelected() {
        return selectedFiles.length > 1;
    }

    return (
        <>
            <br/>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <h1 className="header">
                    <header>My Files</header>
                </h1>
            </div>
            <FileUpload/>
            {showDeleteAndDownloadSelected() && (
                <Col style={{alignItems: "center", display: "flex", justifyContent: "center"}}>
                    <Button
                        className="mt-3 mr-2"
                        type="button"
                        variant="outline-primary"
                        onClick={handleDownloadSelected}>
                        Download Selected
                    </Button>
                    <Button
                        className="mt-3 ml-2"
                        type="button"
                        variant="outline-danger"
                        onClick={handleDeleteSelected}
                    >
                        Delete Selected
                    </Button>
                </Col>
            )}
            <Row>
                <div className="files">
                    {fileCards}
                </div>
            </Row>
        </>);
};

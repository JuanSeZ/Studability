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
    const [fileCards, setFileCards] = useState([]);

    useEffect((children, func) => {
        studability.listUploadedFiles(token,
            (files) => setFiles(files.map((file) => ({title: file[1], author: file[0]}))),
            (msg) => console.log(msg));
    }, []);


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
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your files have been deleted',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => window.location.reload());
            }
        });
    };


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
            <div>
                {showDeleteAndDownloadSelected() && (
                    <div style={{display: "flex", justifyContent: "center", marginBottom: 5}}>
                        <Button
                            className="mr-2"
                            type="button"
                            variant="outline-primary"
                            onClick={handleDownloadSelected}
                        >
                            Download Selected
                        </Button>
                        <Button
                            className="ml-2"
                            type="button"
                            variant="outline-danger"
                            onClick={handleDeleteSelected}
                        >
                            Delete Selected
                        </Button>
                    </div>
                )}
            </div>
            <div>
                {fileCards.length > 0 ? (
                    <div className="files" style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        height: selectedFiles.length > 1 ? 350 : 400,
                        overflowY: "auto"
                    }}>
                        {fileCards}
                    </div>) : (<text style={{
                    justifyContent: "center",
                    textAlign: "center",
                    display: "flex",
                    fontSize: 20,
                    fontFamily: "sans-serif",
                    marginTop: 10,
                    color: "gray"
                }}>No files uploaded</text>)}
            </div>
        </>

    );

};

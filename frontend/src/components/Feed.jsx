import {LayoutThreeColumns} from "react-bootstrap-icons";
import {Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useStudability} from "../service/Studability";
import {useAuthProvider} from "../auth/auth";
import FriendsFileCard from "./FriendsFileCard";
import Swal from "sweetalert2";

export default function Feed() {

    const [files, setFiles] = useState([])
    const studability = useStudability();
    const auth = useAuthProvider()
    const token = auth.getToken();
    const [selectedFiles, setSelectedFiles] = useState([]);

    useEffect(() => {
        studability.listFriendsFiles(
            token,
            (files) =>
                setFiles(
                    files.length === 0 ? (
                        <p
                            style={{
                                justifyContent: 'center',
                                textAlign: 'center',
                                fontSize: 20,
                                fontFamily: 'sans-serif',
                                marginTop: 10,
                                color: 'gray',
                                marginRight: 25,
                            }}
                        >
                            No files uploaded by friends
                        </p>
                    ) : (
                        files.map((file) => (
                            <FriendsFileCard
                                key={`${file[0]}-${file[1]}`}
                                title={file[1]}
                                author={file[0]}
                                onToggle={handleFileToggle}
                            />
                        ))
                    )
                ),
            (msg) => console.log(msg)
        );
    }, []);

    const handleFileToggle = (title, author, isChecked) => {
        if (isChecked) {
            setSelectedFiles((prevSelectedFiles) => [
                ...prevSelectedFiles,
                {title, author},
            ]);
        } else {
            setSelectedFiles((prevSelectedFiles) =>
                prevSelectedFiles.filter(
                    (file) => file.title !== title && file.author !== author
                )
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
                studability.handleDownloadSelectedFilesFriend(selectedFiles, token, zipFileName);
            }
        });
    };

    useEffect(() => {
        studability.listFriendsFiles(
            token,
            (files) =>
                setFiles(
                    files.length === 0 ? (
                        <p style={{
                            justifyContent: "center",
                            textAlign: "center",
                            fontSize: 20,
                            fontFamily: "sans-serif",
                            marginTop: 10,
                            color: "gray",
                            marginRight: 25
                        }}>
                            No files uploaded by friends</p>
                    ) : (
                        files.map((file) => (
                            <FriendsFileCard title={file[1]} author={file[0]} onToggle={handleFileToggle}/>
                        ))
                    )
                ),
            (msg) => console.log(msg)
        );
    }, []);

    return (
        <div>
            <div style={{marginBottom: 10, position: "sticky"}}>
                {selectedFiles.length > 1 ? (
                        <button className="btn btn-outline-primary" style={{marginLeft: 460}}
                                onClick={handleDownloadSelected}>Download Selected</button>) :
                    <text style={{marginLeft: 360, fontFamily: "sans-serif"}}>Select two or more files to download them
                        in a zip</text>}
            </div>
            <div style={{height: 570, width: 1100, overflowY: "scroll"}}>
                {files}
            </div>
        </div>
    );

}
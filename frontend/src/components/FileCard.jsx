import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../styles/FileCardStyle.css';
import {useStudability} from "../service/Studability";
import {useAuthProvider} from "../auth/auth";
import Swal from "sweetalert2";

function FileCard({title, author, onSelect}) {

    const [isSelected, setIsSelected] = useState(false);

    const handleCheckboxChange = () => {
        setIsSelected(!isSelected);
        onSelect(title, !isSelected);
    };

    const studability = useStudability();
    const auth = useAuthProvider();

    const handleDownload = () => {
        fetch(`http://localhost:4321/file/${author}/${title}/${auth.getToken()}`)
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', title);
                link.click();
            });
    };

    function handleDelete() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#adb5bd',
            confirmButtonText: 'Yes, delete it!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                studability.deleteFile(
                    title,
                    auth.getToken(),
                    () => console.log("ok"),
                    () => console.log("error")
                )
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your file has been deleted',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => window.location.reload())
            }
        })
    }

    return (
        <Card className="file-card">
            <label className="checkbox-label" title="Select file">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleCheckboxChange}
                />
                <span className="checkbox-custom"></span>
            </label>
            <Card.Body className="text-center">
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
                <div className="button-container">
                    <Button
                        variant="primary"
                        className="mr-2"
                        href={`http://localhost:4321/file/${author}/${title}/${auth.getToken()}`}
                        target="_blank"
                    >View
                    </Button>
                    <Button onClick={handleDownload}>Download</Button>
                    <Button className="delete-button" variant="danger" onClick={handleDelete}>Delete</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default FileCard;

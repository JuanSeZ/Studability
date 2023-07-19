import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../styles/FileCardStyle.css';
import {useStudability} from "../service/Studability";
import {useAuthProvider} from "../auth/auth";
function FriendsFileCard({title, author, onToggle}) {

    const studability = useStudability();
    const auth = useAuthProvider();
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        onToggle(title, author, !isChecked);
    };


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

    return (
        <Card className="friend-file-card">
            <label className="checkbox-label" title="Select file">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={isChecked}
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
                </div>
            </Card.Body>
        </Card>
    );
}

export default FriendsFileCard;

import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function FileCard  ({title,author})  {

    return (
        <Card>
            <Card.Body className="text-center">
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>

                <div className="mb-3">
                    <Button variant="primary" className="mr-2" href= {"http://localhost:4321/file/" + author + "/" + title} target= "_blank" name={title}>
                        View File
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default FileCard;

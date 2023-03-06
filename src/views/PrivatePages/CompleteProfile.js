import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const CompleteProfile = () => {

    const fullNameRef = useRef(null);
    const profilePhotoUrlRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const token = localStorage.getItem('token')
            const enteredName = fullNameRef.current.value;
            const enteredPhotoUrl = profilePhotoUrlRef.current.value;
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDMDLGHFhbo5zks5z75xyYouKUnd1pG7R0', {
                method: 'POST',
                body: JSON.stringify({
                    idToken: JSON.parse(token),
                    displayName: enteredName,
                    photoUrl: enteredPhotoUrl,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.ok) {
                alert('User Updated Succesfully');
                enteredName.current.value = '';
                enteredPhotoUrl.current.value = '';
            } else {
                const err = await res.json();
                alert(err.error.message)

            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const token = localStorage.getItem('token')
                const res = await fetch(
                    "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDMDLGHFhbo5zks5z75xyYouKUnd1pG7R0",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            idToken: JSON.parse(token),
                            returnSecureToken: true,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (res.ok) {
                    const data = await res.json();
                    fullNameRef.current.value = data.users[0].displayName;
                    profilePhotoUrlRef.current.value = data.users[0].photoUrl;
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchdata();
    }, []);

    const handleCancel = () => {
        navigate('/');
    }

    return (
        <Container className="m-5 p-5 card">
            <Row>
                <Col xs="12" sm="8">
                    <h3>Contact Details</h3>
                </Col>
                <Col xs="12" sm="4" className="text-right">
                    <Button color="danger" style={{ float: 'right' }} onClick={handleCancel}>Cancel</Button>
                </Col>
            </Row>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col xs="6" sm="6">
                        <FormGroup>
                            <Label for="fullName">Full Name</Label>
                            <Input type="text" name="fullName" id="fullName" placeholder="Enter your full name" innerRef={fullNameRef} />
                        </FormGroup>
                    </Col>
                    <Col xs="6" sm="6">
                        <FormGroup>
                            <Label for="profilePhotoUrl">Profile Photo URL</Label>
                            <Input type="text" name="profilePhotoUrl" id="profilePhotoUrl" placeholder="Enter your profile photo URL" innerRef={profilePhotoUrlRef} />
                        </FormGroup>
                    </Col>
                </Row>
                <Button color="primary" type="submit">Update</Button>
            </Form>
        </Container>
    )
}

export default CompleteProfile
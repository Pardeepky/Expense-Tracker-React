import React from 'react'
import { Button } from 'reactstrap'

const VerifyUser = () => {

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDMDLGHFhbo5zks5z75xyYouKUnd1pG7R0', {
                method: "POST",
                body: JSON.stringify({
                    requestType: "VERIFY_EMAIL",
                    idToken: JSON.parse(token),
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                alert("verification code sent");
            } else {
                const err = await res.json();
                alert(err.error.message)
            }

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className='d-flex justify-content-center'>
                <Button color="primary" onClick={handleSubmit}>Verify Email</Button>
            </div>
        </>
    )
}

export default VerifyUser
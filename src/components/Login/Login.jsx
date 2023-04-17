import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogIn = event => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);

        //validation
        setError('');

        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('Add at least two uppercase');
            return;
        }
        else if (!/(?=.*[!@#$&*])/.test(password)) {
            setError('add at least one special case letter');
            return;
        }
        else if (password.length < 6) {
            setError('add at least six values');
            return;
        }


    }




    return (
        <div className="d-flex align-items-center justify-content-center login-container">
            <Form onSubmit={handleLogIn} className="login-form">
                <h4 className="text-center mt-4">Log In</h4>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" required />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>

                <Button variant="primary" type="submit" className="submit-btn mt-2">
                    Log In
                </Button>
                <p className='text-danger'>{error}</p>
                <p className='text-success'>{success}</p>
            </Form>

        </div>
    );
};

export default Login;
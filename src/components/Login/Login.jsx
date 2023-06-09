import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import app from '../../Firebase/Firebase.config';
import { Link } from 'react-router-dom';


const auth = getAuth(app);


const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();

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

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                if (!loggedUser.emailVerified) {
                    alert('email is not verified yet')
                }
                setSuccess('Logged in successfully')
                setError('');
                console.log(loggedUser);
            })
            .catch(error => {
                setError(error.message);
            })


    }
    const handleResetPassword = (event) => {
        const email = emailRef.current.value;
        if (!email) {
            alert('Please provide your email to reset password');
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Please check your email');
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
            })
    }



    return (
        <div className="d-flex align-items-center justify-content-center login-container">
            <Form onSubmit={handleLogIn} className="login-form">
                <h4 className="text-center mt-4">Log In</h4>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' ref={emailRef} placeholder="Enter email" required />
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
                <p><small>Forget password? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset password</button></small></p>
                <p><small>New to this website? Please <Link to='/register'>Register</Link></small></p>
            </Form>

        </div>
    );
};

export default Login;
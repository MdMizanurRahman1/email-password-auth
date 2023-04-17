import React, { useState } from 'react';
import './Register.css'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from '../../Firebase/Firebase.config';




const auth = getAuth(app);

const Register = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess('');
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);

        //validation check

        if (!/(?=.*[A-Z])/.test(password)) {
            setError('Please at least add one Uppercase');
            return;
        } else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setError('Please add at least two numbers');
            return;
        }
        else if (password.length < 6) {
            setError('Please add at least six characters');
            return;
        }



        // create user firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setError('');
                event.target.reset();
                setSuccess('User has created successfully')
            })
            .catch(error => {
                console.error(error.message);
                setError(error.message)
            })
    }

    const handleEmailChange = (event) => {
        // console.log(event.target.value);
        setEmail(event.target.value)
    }

    const handlePasswordBlur = (event) => {
        // console.log(event.target.value);
    }

    return (
        <div className='email w-50 mx-auto mt-4'>
            <h4>Please Register</h4>
            <form onSubmit={handleSubmit} className='email-p'>
                <input onChange={handleEmailChange} type='email' name='email' id='email' placeholder='Your email' className='email-p' required />
                <br />
                <input onBlur={handlePasswordBlur} type='password' name='password' id='password' placeholder='Your password' className='email-p' required />
                <br />

                <input type='submit' value='Register' />
            </form>
            <p className='text-danger'> {error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;
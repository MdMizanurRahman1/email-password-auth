import React, { useState } from 'react';
import './Register.css'

const Register = () => {
    const [email, setEmail] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
    }

    const handleEmailChange = (event) => {
        // console.log(event.target.value);
        setEmail(event.target.value)
    }

    const handlePasswordBlur = (event) => {
        // console.log(event.target.value);
    }

    return (
        <div className='email'>
            <h4>Please Register</h4>
            <form onSubmit={handleSubmit} className='email-p'>
                <input onChange={handleEmailChange} type='email' name='email' id='email' placeholder='Your email' className='email-p' />
                <br />
                <input onBlur={handlePasswordBlur} type='password' name='password' id='password' placeholder='Your password' className='email-p' />
                <br />

                <input type='submit' value='Register' />
            </form>
        </div>
    );
};

export default Register;
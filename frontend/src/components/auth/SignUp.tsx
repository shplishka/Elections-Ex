import React, {useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {AuthContext} from "../../shared/context/auth-context";
import './SignUp.css'

interface FormData {
    firstName: string,
    lastName: string,
    idNumber: number,
    email: string,
    password: string,
    password_confirmation: string,
}

export default function SignUp() {
    const {register, handleSubmit} = useForm<FormData>();
    const auth = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('')
    const sendFormData = handleSubmit(({firstName, lastName, idNumber, email, password, password_confirmation}) => {
        axios
            .post(`http://localhost:5000/api/users/signUp`, {
                firstName: firstName,
                lastName: lastName,
                idNumber: idNumber,
                email: email,
                password: password,
                password_confirmation: password_confirmation
            })
            .then(res => {
                auth.login();
            }).catch(err => {
            setErrorMessage(err.response.data.error)
        });
    });
    return (
        <div className="form-container sign-up-container">
            <form onSubmit={sendFormData}>
                <h1 className="form-title">Hello, Friend!</h1>
                <input name="firstName" placeholder="First Name" ref={register}/>
                <input name="lastName" placeholder="Last Name" ref={register}/>
                <input name="email" placeholder="Email" ref={register}/>
                <input name="idNumber" placeholder="Id Number" ref={register}/>
                <input name="password" type="password" placeholder="Password" ref={register}/>
                <input name="password_confirmation" type="password" placeholder="Conform Password"
                       ref={register}
                />
                <button className="form-button" type="submit">sign up</button>
                <p>{errorMessage}</p>
            </form>
        </div>
    );
}


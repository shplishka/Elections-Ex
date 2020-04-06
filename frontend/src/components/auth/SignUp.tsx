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
    password2: string,
}

interface UserFormResponse {
    idNumber: number,
    password: string,
    email: string,
    createAt: Date,
    updateAt: Date
}

interface ResponseData {
    user: UserFormResponse
}

export default function SignUp() {
    const {register, setValue, handleSubmit, errors} = useForm<FormData>();
    const auth = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('')
    const sendFormData = handleSubmit(({firstName, lastName, idNumber, email, password, password2}) => {
        axios
            .post<FormData, ResponseData>(`http://localhost:5000/signUp`, {
                firstName: firstName,
                lastName: lastName,
                idNumber: idNumber,
                email: email,
                password: password,
                password2: password2
            })
            .then(res => {
                console.log(res);
                auth.login();
            }).catch(err => {
            setErrorMessage(JSON.stringify(err.response.data))
        });
    });
    return (
        <div className="form-container sign-up-container">
            <form onSubmit={sendFormData}>
                <h1 className="form-title">Hello, Friend!</h1>
                <input name="firstName" type="text" placeholder="First Name" ref={register}/>
                <input name="lastName" type="text" placeholder="Last Name" ref={register}/>
                <input name="email" type="email" placeholder="Email" ref={register}/>
                <input name="idNumber" type="number" placeholder="Id Number" ref={register}/>
                <input name="password" type="password" placeholder="Password" ref={register}/>
                <input name="password2" type="password" placeholder="Conform Password" ref={register}/>
                <button className="form-button" type="submit">sign up</button>
                <div className={'error-message'}>{errorMessage}</div>
            </form>
        </div>
    );
}


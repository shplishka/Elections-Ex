import React, {useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {AuthContext} from "../../shared/context/auth-context";

type FormData = {
    idNumber: number;
    password: string;

};

export default function Login() {
    const auth = useContext(AuthContext);
    const {register, handleSubmit} = useForm<FormData>();
    const [errorMessage, setErrorMessage] = useState('')
    const onSubmit = handleSubmit(({idNumber, password}) => {
        axios
            .post(`http://localhost:5000/api/users/login`, {
                idNumber: idNumber,
                password: password,
            })
            .then(res => {
                console.log(res)
                if (res.data.userInstance.idNumber === 11112222) {
                    auth.adminLogin()
                } else auth.login()
            }).catch(err => {
            setErrorMessage(err.response.data.error)
        });
    });
    return (
        <div className="form-container sign-in-container">
            <form onSubmit={onSubmit}>
                <h1 className="form-title">Welcome Back!</h1>
                <input name="idNumber" placeholder="Id Number" ref={register}/>
                <input name="password" type="password" placeholder="Password" ref={register}/>
                <button className="form-button" type="submit">sign in</button>
                <p>{errorMessage}</p>
            </form>
        </div>
    );
}
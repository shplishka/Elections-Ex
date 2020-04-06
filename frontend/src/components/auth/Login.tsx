import React, {useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {AuthContext} from "../../shared/context/auth-context";

type FormData = {
    idNumber: number;
    password: string;

};

interface ServerResponse {
    data: ServerData
}

interface ServerData {
    user: userData
}

interface userData {
    idNumber: number;
    password: string;

}

export default function Login() {
    const auth = useContext(AuthContext);
    const {register, setValue, handleSubmit, errors} = useForm<FormData>();
    const [errorMessage, setErrorMessage] = useState('')
    const onSubmit = handleSubmit(({idNumber, password}) => {
        axios
            .post<string, ServerResponse>(`http://localhost:5000/login`, {
                idNumber: idNumber,
                password: password,
            })
            .then(res => {
                console.log(res);
                auth.login();
                if(res.data.user.idNumber === 11112222){
                    auth.adminLogin()
                }
            }).catch(err => {
            setErrorMessage(JSON.stringify(err.response.data))
        });
    });
    return (
        <div className="form-container sign-in-container">
            <form onSubmit={onSubmit}>
                <h1 className="form-title">Welcome Back!</h1>
                <input name="idNumber" type="number" placeholder="Id Number" ref={register}/>
                <input name="password" type="password" placeholder="Password" ref={register}/>
                <button className="form-button" type="submit">sign in</button>
                <div className={'error-message'}>{errorMessage}</div>
            </form>
        </div>
    );
}
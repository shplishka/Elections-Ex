import React, {Component, useEffect, useState} from "react";
import './PickParty.css'
import {useForm} from "react-hook-form";
import axios from "axios";

type FormData = {
    idNumber: number;
    miflaga: string;
};


let inputs = [{

    "name": "FirstName",
    "logo": ""

}, {

    "name": "Surname",
    "logo": ""

}];

interface ServerResponse {
    data: ServerData
}

interface ServerData {
    result: miflagaData[]
}

interface miflagaData {
    name: string;
    logo: string;
}

export default function PickParty() {
    const [miflagot, setLoadedMiflagot] = useState(inputs);
    const {register, setValue, handleSubmit, errors} = useForm<FormData>();
    const onSubmit = handleSubmit(({idNumber, miflaga}) => {
        console.log(register)
        axios
            .post(`http://localhost:5000/api/choosers/choose`, {
                idNumber: idNumber,
                miflaga: miflaga,
            })
            .then(res => {
                console.log(res);
            }).catch(err => {
            console.log(err);
        });
    });
    const fetchMiflagot = async () => {
        axios
            .get<string, ServerResponse>(`http://localhost:5000/getAll`)
            .then(res => {
                setLoadedMiflagot(res.data.result)
            }).catch(err => {
            console.log(err);
        });
    };

    return (
        <div className='miflagot-container'>
            <div className="row">
                {miflagot.map((miflaga) => (
                    <div className="miflagaCard">
                        <div className="content">
                            <div className="front" style={{
                                backgroundImage: "url(" + miflaga.logo + ")",
                                backgroundPosition: 'center',
                                backgroundSize: '300px 100px',
                                backgroundRepeat: 'no-repeat'
                            }}>
                            </div>
                            <input className="back" name='miflaga' type="radio" value={miflaga.name} ref={register}/>
                        </div>
                    </div>))}
            </div>
            <form className="submit-form-container" onSubmit={onSubmit}>
                <input name="idNumber" type="number" placeholder="id Number" ref={register}/>
                <button className="form-button" type="submit">submit</button>
            </form>
            <button className="form-button" onClick={fetchMiflagot}>update parties</button>
        </div>
    );
}


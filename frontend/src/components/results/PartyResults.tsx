import React, {Component, useEffect, useState} from "react";
import './PartyResults.css'
import {useForm} from "react-hook-form";
import axios from "axios";

type FormData = {
    idNumber: number;
    miflaga: string;
};

let inputs = [{

    "miflaga": "",
    "countOfChooser": ""

}]

interface ServerResponse {
    data: ServerData
}

interface ServerData {
    result: miflagaData[]
}

interface miflagaData {
    miflaga: string;
    countOfChooser: string;
}

export default function Elections() {
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
            .get<string, ServerResponse>(`http://localhost:5000/results`)
            .then(res => {
                setLoadedMiflagot(res.data.result)
            }).catch(err => {
            console.log(err);
        });
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    {miflagot.map((miflaga) => (
                        <div>
                            <div>
                                <h2>{miflaga.miflaga}</h2>
                                <h3 className={"center"}>Number of choosers: {miflaga.countOfChooser}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className="form-button" onClick={fetchMiflagot}>update results</button>
        </div>
    );
}


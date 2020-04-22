import React, {useState} from "react";
import './PickParty.css'
import {useForm} from "react-hook-form";
import axios from "axios";

type FormData = {
    idNumber: number;
    party: string;
};


let inputs = [{

    "name": "",
    "urlLogo": ""

}]

export default function PickParty() {
    const [parties, setLoadedParties] = useState(inputs);
    const [userMessage, setMessage] = useState('')
    const {register, handleSubmit} = useForm<FormData>();
    const onSubmit = handleSubmit(({idNumber, party}) => {
        axios
            .post(`http://localhost:5000/api/choosers/choose`, {
                idNumber: idNumber,
                party: party,
            })
            .then(res => {
                setMessage('congratulations!')
            }).catch(err => {
            setMessage(err.response.data.error)

        });
    });
    const fetchParties = async () => {
        axios
            .get(`http://localhost:5000/api/parties/getAll`)
            .then(res => {
                if (res.data.result.length === 0) {
                    setMessage('there is any parties')
                }
                setLoadedParties(res.data.result)
            }).catch(err => {
            setMessage(err.response.data.error)
        });
    };

    return (
        <div className="container">
            <form className="form-container" onSubmit={onSubmit}>
                <div>
                    {parties.map((party) => (
                        <div>
                            <section className="card">
                                <input name='party' type="radio" value={party.name} ref={register}/>
                                <div className="avatar">
                                    <img className="thumbnail image-size"
                                         src={party.urlLogo}
                                    />

                                </div>
                                <h3 className="user-name">{party.name}</h3>
                            </section>
                        </div>
                    ))}
                </div>
                <input name="idNumber" placeholder="id Number" ref={register}/>
                <button className="button" type="submit">submit</button>
                <p>{userMessage}</p>
                <button className="button" onClick={fetchParties}>update parties</button>
            </form>
        </div>
    );
}


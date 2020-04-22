import React, {useState} from "react";
import './PartyResults.css'
import axios from "axios";

let inputs = [{

    "party": "",
    "countOfChooser": ""

}]


export default function Elections() {
    const [parties, setLoadedParties] = useState(inputs);
    const fetchParties = async () => {
        axios
            .get(`http://localhost:5000/api/choosers/results`)
            .then(res => {
                setLoadedParties(res.data.result)
            }).catch(err => {
            console.log(err);
        });
    };

    return (
        <div>
            <div >
                <div >
                    {parties.map((party) => (
                        <div >
                            <div>
                                <h2>{party.party}</h2>
                                <h3>Number of choosers: {party.countOfChooser}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className="form-button" onClick={fetchParties}>update results</button>
        </div>
    );
}


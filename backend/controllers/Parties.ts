import * as express from 'express'
import Controller from '../interfaces/Controller'
import partiesTable from '../models/Parties'

class Parties implements Controller {
    public router = express.Router();

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get("/getAll", this.getParties);
        this.router.post("/add", this.addParty);
    }

    async getParties(req, res) {
        console.log(req.body);
        partiesTable.findAll({
            attributes: ['name', 'logo'],
        }).then(result => {
            res.json({result})
        }).catch(err => {
            res.send("error: " + err)
        });
    };

    async addParty(req, res) {
        const {name, logoUrl} = req.body;
        const partyData = {
            name: name,
            logoUrl: logoUrl
        };

        partiesTable.findOne({
            where: {
                name: name
            }
        })
            .then(party => {
                    if (!party) {
                        partiesTable.create(partyData)
                            .then(miflaga => {
                                res.json({miflaga});
                            })
                            .catch(err => {
                                res.send("error: " + err);
                            });
                    } else {
                        res.json({error: name + " User already exist"});
                    }
                }
            )
            .catch(err => {
                res.send("error: " + err);
            });
    };

}

export default Parties
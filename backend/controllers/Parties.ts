import Controller from './Controller'
import {Request, Response} from "express";

import partiesTable, {Party} from '../models/Party'
import {addPartyScheme,removePartyScheme} from "../validation/ValidationsSchemas";


export default class Parties extends Controller {

    constructor() {
        super();
        this.path = '/parties'
    }

    public initRoutes() {
        this.router.get("/getAll", this.getParties);
        this.router.post("/addParty", this.requestValidator.validateBody(addPartyScheme), this.addParty);
        this.router.post("/removeParty", this.requestValidator.validateBody(removePartyScheme), this.removeParty);
    }

    private async getParties(req: Request,res: Response) {
        partiesTable.findAll({
            attributes: ['name', 'urlLogo'],
        }).then(result => {
            res.json({result})
        }).catch(err => {
            res.status(400).json("error: " + err)
        });
    };

    private async addParty(req: Request, res: Response) {
        const partyData: Party = req.body;

        partiesTable.findOne({
            where: {
                name: partyData.name
            }
        })
            .then(partyInstance => {
                    if (!partyInstance) {
                        partiesTable.create(partyData)
                            .then(party => {
                                res.json({party});
                            })
                            .catch(err => {
                                res.send("error: " + err);
                            });
                    } else {
                        res.status(400).json({error: name + " Party already exist"});
                    }
                }
            )
            .catch(err => {
                res.status(400).json("error: " + err);
            });
    };

    private async removeParty(req: Request, res: Response) {
        const partyData: Party = req.body;

        partiesTable.findOne({
            where: {
                name: partyData.name
            }
        })
            .then(partyInstance => {
                    if (partyInstance) {
                        partyInstance.destroy()
                            .then(party => {
                                res.json({party});
                            })
                            .catch(err => {
                                res.send("error: " + err);
                            });
                    } else {
                        res.status(400).json({error: name + " Party not exist"});
                    }
                }
            )
            .catch(err => {
                res.status(400).json("error: " + err);
            });
    };

}

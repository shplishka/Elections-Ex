import * as express from 'express'
import choosersTable from '../models/chooser'

import Controller from '../interfaces/Controller'
import {Sequelize} from "sequelize-typescript";

class Choosers implements Controller {
    public router = express.Router();

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post("/choose", this.choose);
        this.router.get("/results", this.getResults);
    }

    async choose(req, res) {
        const {idNumber, party} = req.body;
        const chooseData = {
            idNumber: idNumber,
            party: party
        };
        choosersTable.findOne({
            where: {
                idNumber: idNumber
            }
        })
            .then(chooser => {
                if (!chooser) {
                    choosersTable.create(chooseData)
                        .then(chooser => {
                            res.json({chooser});
                        })
                        .catch(err => {
                            res.send("error: " + err);
                        });
                } else {
                    res.json({error: idNumber + " User already choose"});
                }
            })
            .catch(err => {
                res.send("error: " + err);
            });
    };

    async getResults(req, res) {
        choosersTable.findAll({
            attributes: ['party', [Sequelize.fn('COUNT', 'idNumber'), 'countOfChooser']],
            group: ['party']
        }).then(result => {
            res.json({result})
        }).catch(err => {
            res.send("error: " + err);
        });

    }

}

export default Choosers
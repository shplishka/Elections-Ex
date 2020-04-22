import Controller from './Controller'
import {Sequelize} from "sequelize-typescript";
import {Request, Response} from "express";

import choosersTable,{Chooser} from '../models/choosers'
import {chooserScheme} from "../validation/ValidationsSchemas";

export default class Choosers extends Controller {
    constructor() {
        super();
        this.path = '/choosers'
    }

    public initRoutes() {
        this.router.post("/choose",this.requestValidator.validateBody(chooserScheme), this.choose);
        this.router.get("/results", this.getResults);
    }

    private async choose(req: Request, res: Response) {
        const chooserData: Chooser = req.body;
        console.log(req.body)

        choosersTable.findOne({
            where: {
                idNumber: chooserData.idNumber
            }
        })
            .then(chooserInstance => {
                console.log(chooserInstance)
                if (!chooserInstance) {
                    choosersTable.create(chooserData)
                        .then(newChooser => {
                            res.json({newChooser});
                        })
                        .catch(err => {
                            res.status(400).json("error: " + err);
                        });
                } else {
                    res.status(400).json({error: chooserData.idNumber + " User already choose"});
                }
            })
            .catch(err => {
                res.status(400).json("error: " + err);
            });
    };

    private async getResults(req: Request, res: Response) {
        choosersTable.findAll({
            attributes: ['party', [Sequelize.fn('COUNT', 'idNumber'), 'countOfChooser']],
            group: ['party']
        }).then(result => {
            res.json({result})
        }).catch(err => {
            res.status(400).json("error: " + err);
        });

    }

}


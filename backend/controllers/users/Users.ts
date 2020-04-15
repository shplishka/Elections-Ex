import {Request, Response} from "express";
import Controller from '../Controller'

import * as bcrypt from 'bcrypt'
import UsersTable from '../../models/users'
import UserSignUpFormData from "./UserSignUpFormData";
import {loginSchema, signUpSchema} from "../../validation/ValidationsSchemas";
import UserLoginFormData from "./UserLoginFormData";

export default class Users extends Controller {
    constructor() {
        super();
        this.path = '/users'
    }

    public initRoutes() {
        this.router.post("/signUp", this.requestValidator.validateBody(signUpSchema), this.signUp);
        this.router.post("/login", this.requestValidator.validateBody(loginSchema), this.login);
    }

    private async signUp(req: Request, res: Response) {
        const userSignUpFormData: UserSignUpFormData = req.body;
        UsersTable.findOne({
            where: {
                idNumber: userSignUpFormData.idNumber
            }
        })
            .then(userInstance => {
                if (!userInstance) {
                    bcrypt.hash(userSignUpFormData.password, 10, (err, hash) => {
                        userSignUpFormData.password = hash;
                        UsersTable.create(userSignUpFormData)
                            .then(user => {
                                res.send({user});
                            })
                            .catch(err => {
                                res.status(401).json("error: " + err);
                            });
                    });
                } else {
                    res.status(401).json({error: userSignUpFormData.idNumber + " User already exist"});
                }
            })
            .catch(err => {
                res.status(401).json("error: " + err);
            });
    };

    private async login(req: Request, res: Response) {
        const userLoginFormData: UserLoginFormData = req.body;

        UsersTable.findOne({
            where: {
                idNumber: userLoginFormData.idNumber
            }
        })
            .then(userInstance => {
                if (userInstance) {
                    if (bcrypt.compareSync(userLoginFormData.password, userInstance.password)) {
                        res.send({userInstance});
                    } else {
                        res.status(401).json({error: "wrong password"});
                    }
                } else {
                    res.status(401).json({error: " User does not exist"});
                }
            })
            .catch(err => {
                res.status(400).json("error: " + err);
            });
    };
}


import * as express from 'express'
import Controller from '../interfaces/Controller'
import * as bcrypt from 'bcrypt'
import {check} from 'express-validator'

import UsersTable from '../models/users'

interface UserLoginData {
    idNumber: number,
    password: string,
}


class Users implements Controller {
    public router = express.Router();

    constructor() {
        this.initRoutes()
    }
    public initRoutes() {
        this.router.post(
            "/register",
            [
                check("firstName")
                    .not()
                    .isEmpty(),
                check("lastName")
                    .not()
                    .isEmpty(),
                check("email")
                    .normalizeEmail()
                    .isEmail(),
                check("password").isLength({ min: 6 }),
                check("password2").isLength({ min: 6 }),
                check("idNumber").isLength({ max: 13 })
            ],
            this.signUp
        );
        this.router.post(
            "/login",
            [
                check("email")
                    .normalizeEmail()
                    .isEmail(),
                check("password").isLength({ min: 6 }),
                check("idNumber").isLength({ max: 13 })
            ],
            this.login
        );    }

    async signUp(req, res) {
        const { firstName, lastName, email,idNumber, password, password2 } = req.body;
        const userData = {
            lastName: lastName,
            firstName: firstName,
            idNumber: idNumber,
            email: email,
            password: password,
            password2: password2
        };

        UsersTable.findOne({
            where: {
                idNumber: idNumber
            }
        })
            .then(user => {
                if (!user) {
                    bcrypt.hash(password, 10, (err, hash) => {
                        userData.password = hash;
                        UsersTable.create(userData)
                            .then(user => {
                                res.json({ user });
                            })
                            .catch(err => {
                                res.send("error: " + err);
                            });
                    });
                } else {
                    res.json({ error: idNumber + " User already exist" });
                }
            })
            .catch(err => {
                res.send("error: " + err);
            });
    };

    async login(req, res) {
        const { idNumber, password } = req.body;

        UsersTable.findOne({
            where: {
                idNumber: idNumber
            }
        })
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        res.json({ user });
                    } else {
                        res.json({ error: "wrong password" });
                    }
                } else {
                    res.json({ error: " User does not exist" });
                }
            })
            .catch(err => {
                res.send("error: " + err);
            });
    };
}

export default Users
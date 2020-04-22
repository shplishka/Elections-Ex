import * as express from "express";
import RequestValidator from "../validation/RequestValidator";

export default abstract class Controller {
    protected requestValidator: RequestValidator = new RequestValidator();

    protected constructor() {
        this.initRoutes()
    }

    public router = express.Router();
    public path: string = '/'

    abstract initRoutes(): void;

}
import * as express from 'express'
import {database} from './util/database'

import {Application} from 'express'
import Controller from "./controllers/Controller";

class App {
    public app: Application;
    public port: number;

    constructor(appInit: { port: number; middleWares: any; controllers: Controller[]; }) {
        this.app = express();
        this.port = appInit.port;

        this.middlewares(appInit.middleWares);
        this.routes(appInit.controllers)
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private routes(controllers: { forEach: (arg0: (controller: Controller) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/api' + controller.path, controller.router)
        })
    }

    private dbConnection() {
        database.sync()
            .then(result => {
                console.log(`DB up and running`)
            })
            .catch(err => {
                console.log(err);
            });
    }

    public init() {
        this.dbConnection()
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
}

export default App
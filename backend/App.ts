import * as express from 'express'
import {database} from './util/database'

import { Application } from 'express'

class App {
    public app: Application;
    public port: number;

    constructor(appInit: { port: number; middleWares: any; controllers: any; }) {
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

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }
    private HttpResReq(){
        this.app.use((error, req, res, next) => {
            if (res.headerSent) {
                return next(error);
            }
            res.status(error.code || 500);
            res.json({ message: error.message || 'An unknown error occurred!' });
        });
    }

    private  connectToDB(){
        database.sync()
            .then(result => {
                console.log(`DB up and running`)
            })
            .catch(err => {
                console.log(err);
            });

    }

    public init() {
        this.HttpResReq();
        this.connectToDB();
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
}

export default App
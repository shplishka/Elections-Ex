import App from './App'

import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import loggerMiddleware from './middleware/logger'


import  Users from './controllers/Users'
import  Choosers from './controllers/Choosers'
import  Parties from './controllers/Parties'

const app = new App({
    port: 5000,
    controllers: [
        new Users(),
        new Choosers(),
        new Parties()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        cors(),
        loggerMiddleware
    ]
})

app.init()
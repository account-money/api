import "reflect-metadata"
import './config/module-alias'
import express, { Request, Response } from 'express';
import {env} from '@/config/env';
import cors from 'cors';
import { AppDataSource } from './infra/database/data-source';
import { routerUser } from "./routes";

const app = express();
app.use(cors({
	origin: '*'
}))
app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
    origin: '*'
}));

app.use('/api/user', routerUser)

AppDataSource.initialize()
    .then(() => {
        app.listen(env.port, ()=>console.log(`Server running on: http://localhost:${env.port}`))    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })


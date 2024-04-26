import express, { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import { dbConfig } from './config/databaseConfig'
import Logging from './library/logging'
import cors from 'cors'
import placeRouter from './route/placeRoute'

const app = express()

mongoose.connect(dbConfig.mongo.url)
    .then(() => {
        Logging.info('MongoDB connected')
        /** start server only when database is connected */
        startServer()
    })
    .catch(error => {
        Logging.error(error)
    })

const startServer = () => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        Logging.info(`Incoming -> [${req.method}] - Url [${req.url}]`)

        res.on('finish', () => {
            Logging.info(`Done -> [${req.method}] - Status [${res.statusCode}]`)
        })
        next();
    })

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    /** test */
    app.get('/ping', (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json({ message: 'ping success' })
    })

    /** routes */
    app.use('/api/v1/place', placeRouter)

    /** url not found error handler */
    app.use((req: Request, res: Response, next: NextFunction) => {
        const error = new Error('Url not found')
        Logging.error(error)
        return res.status(404).json({ message: error.message })
    })

    /** test cors */
    app.use(cors())

    /** start server */
    app.listen(dbConfig.server.port, () => {
        Logging.info(`Server is running on port ${dbConfig.server.port}`)
    })
}






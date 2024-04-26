import { Request, Response } from 'express';
import placeModel, { IPlace } from '../model/placeModel';
import Logging from '../library/logging';

const createPlace = async (req: Request, res: Response) => {
    try {
        const { name, description, location, openHours } = req.body
        if (!name || !description || !location || !openHours) {
            Logging.info('parameter insufficient before error')
            return res.status(400).json({ message: 'Insufficient requests passed' })
        }
        if (!req.file) {
            Logging.info('Image parameter insufficient before error')
            return res.status(400).json({ message: 'Insufficient requests passed' })
        }

        const imageUrl: string = req.file?.path || ''

        const newPlace: IPlace = {
            name: req.body.name,
            description: req.body.description,
            location: req.body.location,
            openHours: req.body.openHours,
            image: imageUrl,
        };
        const createdPlace = await placeModel.create(newPlace)
        return res.status(201).json(createdPlace)
    } catch (error) {
        Logging.error(error)
    }
};

export default {
    createPlace
}
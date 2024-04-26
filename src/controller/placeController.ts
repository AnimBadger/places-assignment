import { Request, Response } from 'express';
import placeModel, { IPlace } from '../model/placeModel';
import Logging from '../library/logging';
import { v4 as uuidv4 } from 'uuid'

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

        const placeId: string = uuidv4();

        const newPlace: IPlace = {
            placeId,
            name,
            description,
            location,
            openHours,
            image: imageUrl,
        };

        const createdPlace = await placeModel.create(newPlace)
        return res.status(201).json(createdPlace)
    } catch (error) {
        Logging.error(error)
    }
};

const getAllPlaces = async (req: Request, res: Response) => {
    try {
        Logging.info('about to find all places')
        const places = await placeModel.find();
        Logging.info('returning places found')
        res.status(200).json({ places });
    } catch (error) {
        Logging.error(error);
        res.status(500).json({ error });
    }
}

const getPlace = async (req: Request, res: Response) => {
    const placeId = req.params.placeId
    Logging.info(`place passed to query ${placeId}`)
    try {
        const place = await placeModel.findOne({ placeId: placeId });
        Logging.info(`Place found ${place}`)
        place
            ? res.status(200).json({ place })
            : res.status(404).json({ message: 'Resource not found' });
    } catch (error) {
        Logging.error(error);
        res.status(500).json(error);
    }
}

const dropPlace = async (req: Request, res: Response) => {
    const placeId = req.params.placeId
    try {
        const place = await placeModel.findOneAndDelete({ placeId: placeId });
        place
            ? res.status(404).json()
            : res.status(404).json({ message: 'Resource not found' });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const updatePlace = async (req: Request, res: Response) => {
    try {
        const placeId = req.params.placeId
        const { name, description, location, openHours, image } = req.body

        /** read on patch instead of updating all */

        if (!name || !description || !location || !openHours) {
            Logging.info('parameter insufficient before error')
            return res.status(400).json({ message: 'Insufficient requests passed' })
        }
        if (!req.file) {
            Logging.info('Image parameter insufficient before error')
            return res.status(400).json({ message: 'Insufficient requests passed' })
        }

        const imageUrl: string = req.file?.path || ''

        const updateData: IPlace = {
            placeId,
            name,
            description,
            location,
            openHours,
            image: imageUrl,
        };

        const newPlace = await placeModel.findOneAndUpdate({ placeId: placeId }, updateData, { new: true, runValidators: true })
        newPlace
            ? res.status(202).json({ newPlace })
            : res.status(404).json({ message: 'Resource not found' })
    } catch (error) {
        res.status(500).json({ error })
    }


}

export default {
    createPlace,
    getAllPlaces,
    getPlace,
    dropPlace,
    updatePlace
}
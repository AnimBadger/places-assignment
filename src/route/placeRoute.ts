import express from 'express'
import upload from '../config/multaConfig'
import controller from '../controller/placeController'

const router = express.Router()

router.post('/', upload.single('image'), controller.createPlace)
/**
 * @swagger
 * /api/v1/place:
 *   get:
 *      description: Test
 */
router.get('/', controller.getAllPlaces)
router.get('/:placeId', controller.getPlace)
router.delete('/:placeId', controller.dropPlace)
router.put('/:placeId', controller.updatePlace)

export = router;

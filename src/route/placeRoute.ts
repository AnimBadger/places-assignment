import express from 'express'
import upload from '../config/multaConfig'
import controller from '../controller/placeController'

const router = express.Router()

router.post('/', upload.single('image'), controller.createPlace)

export = router;

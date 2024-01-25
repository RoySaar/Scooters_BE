import express from 'express';
import {
    getAllParkings,
    createParking,
    deleteParking,
    updateParking,
    getAvailableSpots, getParkingAvailability
} from '../controllers/parkingController';

const router = express.Router();

router.get('/', getAllParkings);
router.post('/', createParking);
router.put('/', updateParking);
router.delete('/', deleteParking);
router.get('/available', getAvailableSpots);
router.get('/available', getParkingAvailability);
export default router;
import express from 'express';
import {
    createScooter,
    deleteScooter,
    getAllScooters,
    getScootersByStatus,
    updateScooter
} from '../controllers/scooterConroller';

const router = express.Router();

router.get('/', getAllScooters);
router.post('/', createScooter);
router.put('/', updateScooter);
router.delete('/', deleteScooter);
router.get('/status', getScootersByStatus);

export default router;
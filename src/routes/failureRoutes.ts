import express from 'express';
import {
    getAllFailures,
    createFailure,
    updateFailure,
    deleteFailure,
} from '../controllers/failureController';

const router = express.Router();

router.get('/failure', getAllFailures);
router.post('/failure', createFailure);
router.put('/failure/:id', updateFailure);
router.delete('/failure/:id', deleteFailure);

export default router;
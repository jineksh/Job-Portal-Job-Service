import express from 'express';
import authenticateToken from '../../../middleware/authentic.js'
import { createJob,updateJob } from '../../../controller/jobController.js';

const router = express.Router();

router.post('/', authenticateToken,createJob);
router.patch('/:id',authenticateToken,updateJob);

export default router;
import express from 'express';
import authenticateToken from '../../../middleware/authentic.js'
import { createJob,updateJob,getSingleJob, getAllActiveJobs } from '../../../controller/jobController.js';

const router = express.Router();

router.post('/', authenticateToken,createJob);
router.patch('/:id',authenticateToken,updateJob);
router.get('/:jobid',authenticateToken,getSingleJob);
router.get('/',authenticateToken,getAllActiveJobs);

export default router;
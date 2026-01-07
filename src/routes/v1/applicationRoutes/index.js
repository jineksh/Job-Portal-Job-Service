import express from 'express';
import authenticateToken from '../../../middleware/authentic.js';
import { createApplication , getAllUserApplication,getAllJobApplication,updateApplication} from '../../../controller/application.js';


const router = express.Router();

router.post('/',authenticateToken,createApplication);
router.get('/me',authenticateToken,getAllUserApplication);
router.get('/:jobid',authenticateToken,getAllJobApplication);
router.patch('/:applicationid',authenticateToken,updateApplication);

export default router;
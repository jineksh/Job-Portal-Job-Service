import express from 'express';
import authenticateToken from '../../../middleware/authentic.js';
import { createApplication , getAllUserApplication} from '../../../controller/application.js';


const router = express.Router();

router.post('/',authenticateToken,createApplication);
router.get('/me',authenticateToken,getAllUserApplication);

export default router;
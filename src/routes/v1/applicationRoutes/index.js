import express from 'express';
import authenticateToken from '../../../middleware/authentic.js';
import { createApplication } from '../../../controller/application.js';


const router = express.Router();

router.post('/',authenticateToken,createApplication);

export default router;
import express from 'express';
import testRoute from './testRoutes/index.js';
import companyRoutes from './companyRoutes/index.js';
import jobRoutes from './jobRoutes/index.js';

const router = express.Router();

router.use('/test', testRoute);
router.use('/company',companyRoutes);
router.use('/job',jobRoutes);

export default router;
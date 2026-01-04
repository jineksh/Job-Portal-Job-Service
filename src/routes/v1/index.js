import express from 'express';
import testRoute from './testRoutes/index.js';
import companyRoutes from './companyRoutes/index.js';
import jobRoutes from './jobRoutes/index.js';
import applicationRoutes from './applicationRoutes/index.js'
const router = express.Router();

router.use('/test', testRoute);
router.use('/company',companyRoutes);
router.use('/job',jobRoutes);
router.use('/application',applicationRoutes);

export default router;
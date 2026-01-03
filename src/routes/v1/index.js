import express from 'express';
import testRoute from './testRoutes/index.js';
import companyRoutes from './companyRoutes/index.js';

const router = express.Router();

router.use('/test', testRoute);
router.use('/company',companyRoutes);
export default router;
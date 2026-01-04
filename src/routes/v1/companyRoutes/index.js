import express from 'express';
import { createCompany,deleteCompany,getCompanyDetails,AllCompanies} from '../../../controller/companyController.js';
import { singleUpload } from '../../../middleware/multer.js';
import authenticateToken from '../../../middleware/authentic.js'

const router = express.Router();

router.post('/', authenticateToken,singleUpload,createCompany);
router.get('/:id',authenticateToken,getCompanyDetails);
router.get('/',authenticateToken,AllCompanies);
router.delete('/:id',authenticateToken,deleteCompany);

export default router;
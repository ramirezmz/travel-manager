import { Router } from 'express';
import CheckController from '../controllers/CheckController';
import limiter from '../middlewares/rateLimit';

const router = Router();
const API_VERSION = '/api/v1';

router.get(`${API_VERSION}/health`, limiter, CheckController.healthCheck);

export default router
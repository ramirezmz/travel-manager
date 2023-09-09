import { Router } from 'express';
import CheckController from '../controllers/CheckController';

const router = Router();
const API_VERSION = '/api/v1';

router.get(`${API_VERSION}/health`, CheckController.healthCheck);

export default router
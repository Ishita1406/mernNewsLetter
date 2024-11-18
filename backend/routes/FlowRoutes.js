import express from 'express';
import { startFlow, updateFlowState } from '../controller/FlowController.js';

const router = express.Router();

router.post('/start', startFlow);

router.post('/update/:flowId', updateFlowState);

export default router;
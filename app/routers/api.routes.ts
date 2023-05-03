import { Router } from 'express';
import {
  importCustomer
} from '../controllers/api.controller';

const router = Router();

router.get('/all', importCustomer);


export default router;

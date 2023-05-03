import { Router } from 'express';
import {
  getUserList
} from '../controllers/front.controller';


const router = Router();
router.get('/', getUserList);


export default router;

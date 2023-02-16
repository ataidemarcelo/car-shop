import { Router } from 'express';

import MotorcycleController from '../Controllers/MotorcycleController';

const router: Router = Router();

router.post(
  '/', 
  (req, res, next) => new MotorcycleController(req, res, next).create(),
);

export default router;

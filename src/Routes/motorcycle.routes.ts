import { Router } from 'express';

import MotorcycleController from '../Controllers/MotorcycleController';

const router: Router = Router();

router.post(
  '/', 
  (req, res, next) => new MotorcycleController(req, res, next).create(),
);

router.get(
  '/', 
  (req, res, next) => new MotorcycleController(req, res, next).getAll(),
);

router.get(
  '/:id', 
  (req, res, next) => new MotorcycleController(req, res, next).getById(),
);

export default router;

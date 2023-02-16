import { Router } from 'express';

import CarController from '../Controllers/CarController';

const router: Router = Router();

router.post(
  '/', 
  (req, res, next) => new CarController(req, res, next).create(),
);

router.get(
  '/', 
  (req, res, next) => new CarController(req, res, next).getAll(),
);

router.get(
  '/:id', 
  (req, res, next) => new CarController(req, res, next).getById(),
);

router.put(
  '/:id', 
  (req, res, next) => new CarController(req, res, next).update(),
);

export default router;

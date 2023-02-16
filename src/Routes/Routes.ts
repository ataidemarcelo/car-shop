import express from 'express';

import carRouter from './car.routes';
import motorcycleRouter from './motorcycle.routes';

const routes = express();

routes.use('/cars', carRouter);
routes.use('/motorcycles', motorcycleRouter);

export default routes;

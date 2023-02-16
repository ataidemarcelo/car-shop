import express from 'express';

import carRouter from './car.routes';

const routes = express();

routes.use('/cars', carRouter);

export default routes;

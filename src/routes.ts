import { Express, Request, Response } from 'express';
import { createUserHandler } from './controller/user.controller';
import validateResours from './middleware/validateResours';
import { creatUserSchema } from './schema/user.schema';

function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.post('/api/users', validateResours(creatUserSchema), createUserHandler);
}

export default routes;

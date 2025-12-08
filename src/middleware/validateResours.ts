import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

const validate =
  (schema: ZodType<any, any, any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
    } catch (err: any) {
      return res.status(400).send(err.errors);
    }
  };

export default validate;

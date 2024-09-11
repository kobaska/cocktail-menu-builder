import { CustomError } from '@cocktail-menu-builder/helpers/error-handlers';
import { NextFunction, Request, Response } from 'express';

export function errorHandler(error: Error, _req: Request, res: Response, _next: NextFunction): void {
  if (error instanceof CustomError) {
    res.status(error.status).send(error.message);
    return;
  }
  
  console.log('Internal Error', error);
  res.status(500).json({ error: 'Internal Server Error' });
};

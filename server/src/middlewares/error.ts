import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const statusCode = response.statusCode ? response.statusCode : 500;

  response.status(statusCode);

  response.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  });
};

export { errorHandler };

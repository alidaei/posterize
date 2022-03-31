import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import { userModel } from '../models/user';

const protect = asyncHandler(
  async (request: any, response: Response, next: NextFunction) => {
    let token;

    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // get token from headers
        token = request.headers.authorization.split(' ')[1];

        // verify the token
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

        // get the user from token
        // @ts-ignore: at decoded.id
        request.user = await userModel.findById(decoded.id).select('-password');

        next();
      } catch (error) {
        console.log(error);
        response.status(401);
        throw new Error('Not authorized');
      }
    }

    if (!token) {
      response.status(401);
      throw new Error('Not authorized, no token');
    }
  }
);

export { protect };

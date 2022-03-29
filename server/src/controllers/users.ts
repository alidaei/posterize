import { Request, Response } from 'express';

import asyncHandler from 'express-async-handler';
import { userModel } from '../models/user';

// @desc      register a user
// @route     POST /api/users
// @access    public
const registerUser = asyncHandler(
  async (request: Request, response: Response) => {
    response.status(200).json({ message: 'user registered' });
  }
);

// @desc      authenticate/login a user
// @route     POST /api/users/login
// @access    public
const loginUser = asyncHandler(async (request: Request, response: Response) => {
  response.status(200).json({ message: 'login registered' });
});

// @desc      get user data
// @route     GET /api/users/me
// @access    public
const getMe = asyncHandler(async (request: Request, response: Response) => {
  response.status(200).json({ message: 'display the logged in user data' });
});

export { registerUser, loginUser, getMe };

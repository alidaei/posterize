import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';

import { userModel } from '../models/user';

// @desc      register a user
// @route     POST /api/users
// @access    public
const registerUser = asyncHandler(
  async (request: Request, response: Response) => {
    const { username, email, password } = request.body;

    if (!username || !email || !password) {
      response.status(400);
      throw new Error('please add all fields');
    }

    // check if user already exists
    const userExists = await userModel.findOne({ email });

    if (userExists) {
      response.status(400);
      throw new Error('user already exists');
    }

    // generating the salt and hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      response.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      response.status(400);
      throw new Error('invalid user data');
    }
  }
);

// @desc      authenticate/login a user
// @route     POST /api/users/login
// @access    public
const loginUser = asyncHandler(async (request: Request, response: Response) => {
  const { email, password } = request.body;

  // check for user email
  const user = await userModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    response.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    response.status(400);
    throw new Error('invalid credentials');
  }
});

// @desc      get user data
// @route     GET /api/users/me
// @access    private
const getMe = asyncHandler(async (request: Request, response: Response) => {
  response.status(200).json({ message: 'display the logged in user data' });
});

// generating jwt token
const generateToken = (id: any) => {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: '30d',
  });
};

export { registerUser, loginUser, getMe };

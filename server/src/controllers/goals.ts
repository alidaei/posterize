import { Request, Response } from 'express';

import asyncHandler from 'express-async-handler';
import { goalModel } from '../models/goal';
import { userModel } from '../models/user';

// @desc      get goals
// @route     GET /api/goals
// @access    private
const getGoals = asyncHandler(async (request: any, response: Response) => {
  const goals = await goalModel.find({ user: request.user.id });
  response.status(200).json(goals);
});

// @desc      set goal
// @route     POST /api/goals
// @access    private
const setGoal = asyncHandler(async (request: any, response: Response) => {
  if (!request.body.text) {
    response.status(400);
    throw new Error('please add a text field');
  }

  const goal = await goalModel.create({
    text: request.body.text,
    user: request.user.id,
  });

  response.status(200).json(goal);
});

// @desc      update goal
// @route     PUT /api/goals/:id
// @access    private
const updateGoal = asyncHandler(async (request: any, response: Response) => {
  const goal = await goalModel.findById(request.params.id);

  if (!goal) {
    response.status(400);
    throw new Error('goal not found');
  }

  // check for user
  const user = await userModel.findById(request.user.id);

  if (!user) {
    response.status(401);
    throw new Error('user not found');
  }

  // make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    response.status(401);
    throw new Error('user not authorized');
  }

  const updatedGoal = await goalModel.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );

  response.status(200).json(updatedGoal);
});

// @desc      delete goal
// @route     DELETE /api/goals/:id
// @access    private
const deleteGoal = asyncHandler(async (request: any, response: Response) => {
  const goal = await goalModel.findById(request.params.id);

  if (!goal) {
    response.status(400);
    throw new Error('goal not found');
  }

  // check for user
  const user = await userModel.findById(request.user.id);

  if (!user) {
    response.status(401);
    throw new Error('user not found');
  }

  // make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    response.status(401);
    throw new Error('user not authorized');
  }

  await goal.remove();

  response.status(200).json({ id: request.params.id });
});

export { getGoals, setGoal, updateGoal, deleteGoal };

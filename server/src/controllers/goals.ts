import { Request, Response } from 'express';

import asyncHandler from 'express-async-handler';

// @desc      get goals
// @route     GET /api/goals
// @access    private
const getGoals = asyncHandler(async (request: Request, response: Response) => {
  response.status(200).json({ message: 'get goals' });
});

// @desc      set goal
// @route     POST /api/goals
// @access    private
const setGoal = asyncHandler(async (request: Request, response: Response) => {
  if (!request.body.text) {
    response.status(400);
    throw new Error('please add a text field');
  }
  response.status(200).json({ message: 'set goal' });
});

// @desc      update goal
// @route     PUT /api/goals/:id
// @access    private
const updateGoal = asyncHandler(
  async (request: Request, response: Response) => {
    response.status(200).json({ message: `update goal ${request.params.id}` });
  }
);

// @desc      delete goal
// @route     DELETE /api/goals/:id
// @access    private
const deleteGoal = asyncHandler(
  async (request: Request, response: Response) => {
    response.status(200).json({ message: `delete goal ${request.params.id}` });
  }
);

export { getGoals, setGoal, updateGoal, deleteGoal };

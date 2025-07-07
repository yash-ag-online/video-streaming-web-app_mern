import { Router } from 'express';
import ApiResponse from './utils/ApiResponse.js';
import { asyncHandler } from './utils/AsyncHandler.js';
import { HTTP_STATUS } from './constants/http-status.js';

// Routes

// Global Router
const router = Router();

router.get(
  '/health',
  asyncHandler(async (_req, res, _next) => {
    res.json(new ApiResponse(HTTP_STATUS.OK, null, 'Health OK'));
  }),
);

export default router;

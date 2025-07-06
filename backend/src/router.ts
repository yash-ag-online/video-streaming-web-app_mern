import { Router } from 'express';
import ApiResponse from './utils/ApiResponse';
import { asyncHandler } from './utils/AsyncHandler';
import { HTTP_STATUS } from './constants/http-status';

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

import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { type Application, json, urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import corsOptions from '../config/cors';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';
import { asyncHandler } from '../utils/AsyncHandler';
import { HTTP_STATUS } from '../constants/http-status';

// Global Middlewares
export const registerGlobalMiddleware = (app: Application) => {
  // Common middlewares
  app.use(cors(corsOptions));
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(cookieParser());

  // custom global middlewares
};

// Not-Found Handler
export const notFoundHandler = asyncHandler(async (req: Request, res: Response) => {
  res
    .status(HTTP_STATUS.NOT_FOUND)
    .json(new ApiResponse(HTTP_STATUS.NOT_FOUND, null, `Route ${req.originalUrl} not found`));
});

// Error Handler
export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json(err);
  } else {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    const stack = err instanceof Error ? err.stack : undefined;
    const internalError = new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, message, stack);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(internalError);
  }
};

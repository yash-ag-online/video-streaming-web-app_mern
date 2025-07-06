import express from 'express';
import router from './router';
import { errorHandler, notFoundHandler, registerGlobalMiddleware } from './middlewares';
import ApiResponse from './utils/ApiResponse';
import { HTTP_STATUS } from './constants/http-status';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Global middleware
registerGlobalMiddleware(app);

app.get('/', (_req, res) => {
  res.json(new ApiResponse(HTTP_STATUS.OK, null, 'Hello from Bun + Express!'));
});

// Api Router
app.use('/api', router);

// Not-Found Handler
app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

// Dev Server
if (process.env.NODE_ENV === 'development') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

export default app;

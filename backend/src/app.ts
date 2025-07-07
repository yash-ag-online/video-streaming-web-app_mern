import express from 'express';
import router from './router.js';
import { errorHandler, notFoundHandler, registerGlobalMiddleware } from './middlewares/index.js';
import ApiResponse from './utils/ApiResponse.js';
import { HTTP_STATUS } from './constants/http-status.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Global middleware
registerGlobalMiddleware(app);

app.get('/', (_req, res) => {
  res.json(new ApiResponse(HTTP_STATUS.OK, null, 'Hello from Bun + Express!'));
});

app.use('/api', router);
app.use(notFoundHandler);
app.use(errorHandler);

if (process.env.NODE_ENV === 'development') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

export default app;

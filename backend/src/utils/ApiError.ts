import env from '../config/env';

class ApiError extends Error {
  public statusCode: number;
  public success: boolean;

  constructor(statusCode: number, message: string, stack?: string) {
    super(message);

    this.statusCode = statusCode;
    this.success = false;
    this.name = this.constructor.name;

    // Make `message` enumerable
    Object.defineProperty(this, 'message', {
      value: message,
      enumerable: true,
      configurable: true,
      writable: true,
    });

    // Make `stack` enumerable in development
    if (env.Node_Env === 'development') {
      Object.defineProperty(this, 'stack', {
        value: stack || new Error().stack,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    }

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default ApiError;

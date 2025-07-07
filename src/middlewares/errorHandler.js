import { HttpError } from 'http-errors';

export const errorHandler = (err, _, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }

  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  res.status(status).json({
    status,
    message,
  });
};

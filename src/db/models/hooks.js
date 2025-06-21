export const saveErrorHandler = (error, doc, next) => {
  error.status = 400;
  next();
};

/**
 * Centralized error-handling middleware.
 * Must have 4 parameters so Express recognises it as an error handler.
 *
 * Handles:
 *  - SyntaxError thrown by express.json() for malformed JSON bodies
 *  - Generic errors forwarded via next(err)
 *
 * Never exposes a stack trace in production.
 */
const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const isDev = process.env.NODE_ENV === 'development';

  // express.json() throws SyntaxError on malformed JSON
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: 'Malformed JSON — check your request body.',
    });
  }

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    // Only expose the stack trace during local development
    ...(isDev && { stack: err.stack }),
  });
};

export default errorHandler;

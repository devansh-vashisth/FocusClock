/**
 * 404 handler — catches any request that didn't match a registered route.
 * Placed after all route registrations in app.js.
 */
const notFound = (req, res, next) => {
  const err = new Error(`Not Found — ${req.method} ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
};

export default notFound;

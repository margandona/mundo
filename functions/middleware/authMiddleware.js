const authMiddleware = (req, res, next) => {
  // Lógica de autenticación
  next();
};

module.exports = authMiddleware;

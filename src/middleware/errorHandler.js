const logger = require('../utils/logger')


const errorHandler = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Internal server error'

  logger.error(`${status} - ${message} - ${req.originalUrl} - ${req.method}`)

  res.status(status).json({
    error: message,
    status
  })
}


module.exports = errorHandler
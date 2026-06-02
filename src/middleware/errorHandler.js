const logger = require('../utils/logger')

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Internal server error'

  // Zalogování chyby do konzole i do souboru (Winston to vyřeší podle našeho nastavení transports)
  logger.error(`${status} - ${message} - ${req.originalUrl} - ${req.method}`)

  res.status(status).json({
    error: message,
    status
  })
}

module.exports = errorHandler
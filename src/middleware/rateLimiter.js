const rateLimit = require('express-rate-limit')
const logger = require('../utils/logger')


const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Časové okno: 15 minut
  max: 100,
  message: {
    error: 'Too many requests from this IP, please try again after 15 minutes',
    status: 429
  },
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res, next, options) => {
    logger.warn(`429 - Too many requests - ${req.originalUrl} - IP: ${req.ip}`)
    
    res.status(options.statusCode).json(options.message)
  }
})


module.exports = apiLimiter
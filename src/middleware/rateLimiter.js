const rateLimit = require('express-rate-limit')
const logger = require('../utils/logger')


const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Časové okno: 15 minut
  max: 100, // Maximální počet requestů z jedné IP adresy za dané okno
  message: {
    error: 'Too many requests from this IP, please try again after 15 minutes',
    status: 429
  },
  standardHeaders: true, // Vrátí rate limit info v hlavičkách `RateLimit-*`
  legacyHeaders: false, // Vypne staré `X-RateLimit-*` hlavičky

  handler: (req, res, next, options) => {
    // Zalogujeme to jako 'warn' (varování), protože to není interní chyba našeho serveru
    logger.warn(`429 - Too many requests - ${req.originalUrl} - IP: ${req.ip}`)
    
    // Odešleme odpověď klientovi, jak to knihovna dělá normálně
    res.status(options.statusCode).json(options.message)
  }
})


module.exports = apiLimiter
require('dotenv').config()

const express = require('express');

const config = require('./config')
const logger = require('./utils/logger')
const routes = require('./routes')
const apiLimiter = require('./middleware/rateLimiter')
const errorHandler = require('./middleware/errorHandler')

const app = express();
const port = config.port


app.use(express.json())


app.use('/api', apiLimiter)

app.use('/api', routes)


app.use(errorHandler)


app.listen(port, ()=> {
    logger.info(`Server running on port ${port}`)
})

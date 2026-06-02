require('dotenv').config()
const express = require('express');
const app = express();
const config = require('./config')
const port = config.port
const logger = require('./utils/logger')
const apiLimiter = require('./middleware/rateLimiter')

app.use(express.json())


const routes = require('./routes')


app.use('/api', apiLimiter)


app.use('/api', routes)


const errorHandler = require('./middleware/errorHandler')
app.use(errorHandler)


app.listen(port, ()=> {
    logger.info(`Server running on port ${port}`)
})
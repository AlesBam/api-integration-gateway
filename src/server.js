require('dotenv').config()
const express = require('express');
const app = express();
const config = require('./config')
const port = config.port

app.use(express.json())


const routes = require('./routes')


app.use('/api', routes)


const errorHandler = require('./middleware/errorHandler')
app.use(errorHandler)


app.listen(port, ()=> {
    console.log(`Server running on port ${port}`) 
})
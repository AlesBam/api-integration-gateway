const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })



module.exports = {
  port: process.env.PORT || 3000,
  openWeather: {
    apiKey: process.env.OPENWEATHER_API_KEY,
    baseUrl: 'https://api.openweathermap.org/data/2.5'
  },
  github: {
    token: process.env.GITHUB_TOKEN,
    baseUrl: 'https://api.github.com'
  },
  json: {
    baseUrl: 'https://jsonplaceholder.typicode.com/posts'
  }
}
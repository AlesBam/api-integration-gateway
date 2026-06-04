const axios = require('axios')
const axiosRetry = require('axios-retry').default || require('axios-retry')
const config = require ('../config')


axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return error.response?.status >= 500 || !error.response
  }
})


const getWeather = async (city) => {
  try {
    const response = await axios.get(`${config.openWeather.baseUrl}/weather`, {
      params: {
        q: city,
        appid: config.openWeather.apiKey,
        units: 'metric'
      },
      timeout: config.openWeather.timeout      
    })
    return transform(response.data)
  } catch (error) {
    const status = error.response?.status || 500
    const message = status === 404 ? 'City not found' : 'Weather service error'
    const err = new Error(message)
    err.status = status
    throw err
  }
}


const transform = (data) => {
  return {
    source: 'openweathermap',
    city: data.name,
    country: data.sys.country,
    temperature: data.main.temp,
    feels_like: data.main.feels_like,
    humidity: data.main.humidity,
    description: data.weather[0].description
  }
}


module.exports = { getWeather }
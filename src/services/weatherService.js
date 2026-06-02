const axios = require('axios')
const axiosRetry = require('axios-retry').default || require('axios-retry')
const config = require ('../config')

axiosRetry(axios, { 
  retries: 3, // Kolikrát to zkusí znovu, když to spadne
  retryDelay: axiosRetry.exponentialDelay // Pauza mezi pokusy se bude prodlužovat (např. 1s, pak 2s, pak 4s...)
})

const getWeather = async (city) => {
  try {
    const response = await axios.get(`${config.openWeather.baseUrl}/weather`, {
      params: {
        q: city,
        appid: config.openWeather.apiKey,
        units: 'metric'
      },
      timeout: 5000 // Limit 5000 milisekund (5 vteřin)
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
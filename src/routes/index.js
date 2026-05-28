const express = require('express')
const router = express.Router()
const weatherService = require('../services/weatherService')
const postsService = require('../services/postsService')
const githubService = require('../services/githubService')


router.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})


router.get('/weather/:city', async (req, res, next) => {
  try {
    const data = await weatherService.getWeather(req.params.city)
    res.json(data)
  } catch (error) {
    next(error)
  }
})


router.get('/posts', async (req, res) => {
  try {
    const data = await postsService.getPosts()
    res.json(data)
  } catch (error) {
    next(error)
  }
})


router.get('/repos/:username', async (req, res) => {
  try {
    const data = await githubService.getRepos(req.params.username)
    res.json(data)
  } catch (error) {
    next(error)
  }
})
  

module.exports = router
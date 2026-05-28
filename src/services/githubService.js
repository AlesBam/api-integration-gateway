const axios = require('axios')
const config = require ('../config')

const getRepos = async (username) => {
    const response = await axios.get(`${config.github.baseUrl}/users/${username}/repos` , {
    headers: {
      Authorization: `Bearer ${config.github.token}`
    }
  })

  return response.data.map(repo => transform(repo))
}

const transform = (data) => {
    return {
    source: 'githubAPI',
    id: data.id,
    name: data.name,
    description: data.description,
    url: data.html_url,
    stars: data.stargazers_count
  }
}

module.exports = { getRepos }
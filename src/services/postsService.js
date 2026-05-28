const axios = require('axios')
const config = require ('../config')

const getPosts = async () => {
    const response = await axios.get(`${config.json.baseUrl}`, {
    })

    return response.data.map(post => transform(post))
}

const transform = (data)=> {
    return {
        source: 'jsonplaceholder',
        id: data.id,
        body: data.body,
        title: data.title
    }
}

module.exports = { getPosts }
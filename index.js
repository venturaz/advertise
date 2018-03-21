const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const PORT = 1337
const database = {}

const extractPageNameFromURL = (url) => {
    if(url && typeof url === 'string'){
        const suffix = url.lastIndexOf('.html')
        const slash = url.lastIndexOf('/') + 1
        return url.substring(slash, suffix)
    } else {
        return ''
    }
}

app.use(cookieParser());

app.use('/', express.static(__dirname + '/'));

app.use((request, response, next) => {
    console.log(request.headers)
    next()
})

app.get('/advertisement', (request, response) => {
    const clientId = request.cookies['clientId'] || Math.random().toString()
    if (!database[clientId]){
        database[clientId] = ''
    }
    database[clientId] += extractPageNameFromURL(request.headers.referer) + ','
    response.cookie('clientId',clientId)
    response.json({data: database[clientId]})
})

app.listen(PORT)

console.log("ad server started on port " + PORT)
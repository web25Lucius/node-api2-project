const express = require("express")
const posts = require('./posts/posts-model')
const postsRouter = require('./posts/posts-router')
const server = express()

// = express.server()

server.use(express.json()) //< --must include to parse from JSON
server.use(postsRouter)

server.get("/", (req, res) => {
    res.json({ message: "Yo Api2 project!", })
})

module.exports = server
// implement your server here
// require your posts router and connect it here

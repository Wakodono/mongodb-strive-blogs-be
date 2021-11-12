import express from "express"
import listEndpoints from "express-list-endpoints"
import mongoose from "mongoose"
import cors from "cors"
import { notFoundHandler, badRequestHandler, genericErrorHandler } from "./errorHandlers.js"

import blogPostsRouter from "./services/blogposts/index.js"
const server = express()

const port = process.env.PORT || 3001

//MIDDLEWARES

server.use(cors())
server.use(express.json())

//ENDPOINTS

server.use("/blogposts", blogPostsRouter)

//ERROR HANDLERS

server.use(notFoundHandler)
server.use(badRequestHandler)
server.use(genericErrorHandler)

mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () => {
  console.log("Mongo Connected!")

  server.listen(port, () => {
    console.table(listEndpoints(server))

    console.log(`Server running on port ${port}`)
  })
})

server.on("error", (error) =>
  console.log(`❌ Server is not running due to : ${error}`)
);

mongoose.connection.on("error", err => {
  console.log(err)
})
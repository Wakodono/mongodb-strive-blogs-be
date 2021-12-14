import express from "express"
import listEndpoints from "express-list-endpoints"
import mongoose from "mongoose"
import cors from "cors"
import blogPostsRouter from "./services/blogposts/index.js"
import usersRouter from "./services/users/index.js"
import { notFoundHandler, badRequestHandler, genericErrorHandler } from "./errorHandlers.js"

const server = express()

const port = process.env.PORT || 3001

//MIDDLEWARES

server.use(cors())
server.use(express.json())

//ENDPOINTS

server.use("/blogposts", blogPostsRouter)
server.use("/users", usersRouter)

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
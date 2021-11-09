import express from "express"
import createHttpError from "http-errors"

import BlogPostModel from "./schema.js"

const blogPostsRouter = express.Router()

blogPostsRouter.post("/", async (req, res, next) => {
    try {
        const newBlogPost = new BlogPostModel(req.body)
        const { _id } = await newBlogPost.save()
        res.status(201).send({ _id })
    } catch (error) {
        next(error)
    }
})

blogPostsRouter.get("/", async (req, res, next) => {
    try {
        const blogPosts = await BlogPostModel.find()
        res.send(blogPosts)
    } catch (error) {
        next(error)
    }
})

blogPostsRouter.get("/:blogPostId", async (req, res, next) => {
    try {
        const id = req.params.blogPostId

        const blogPost = await BlogPostModel.findById(id)
        if (blogPost) {
            res.send(blogPost)
        } else {
            next(createHttpError(404, `Blog post with id ${id} not found!`))
        }
    } catch (error) {
        
    }
})

blogPostsRouter.put("/:blogPostId", async (req, res, next) => {
    try {
        const id = req.params.blogPostId
        const updatedBlogPost = await BlogPostModel.findByIdAndUpdate(id, req.body, { new: true })

        if (updatedBlogPost) {
            res.send(updatedBlogPost)
        } else {
            next(createHttpError(404, `Blog post with id ${id} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

blogPostsRouter.delete("/:blogPostId", async (req, res, next) => {
    try {
        const id = req.params.blogPostId

        const deletedBlogPost = await BlogPostModel.findByIdAndDelete(id)
        if (deletedBlogPost) {
            res.status(204).send()
        } else {
            next(createHttpError(404, `Blog post with the id ${id} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

export default blogPostsRouter
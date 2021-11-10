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

// GET /blogPosts/:id/comments => returns all the comments for the specified blog post

blogPostsRouter.get("/blogPostId/comments", async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
})

// GET /blogPosts/:id/comments/:commentId=> returns a single comment for the specified blog post

blogPostsRouter.get("/blogPostId/comments/:commentId", async (req, res, next) => {
    try {
        const blogPost = await BlogPostModel.findById(req.params.commentId)
        if (blogPost) {
            res.send(blogPost.comments)
        } else {
            next(createHttpError(404, `Blog post with id ${req.params.blogPostId} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

// POST /blogPosts/:id => adds a new comment for the specified blog post

blogPostsRouter.post("/blogPostId/", async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
})

// PUT /blogPosts/:id/comment/:commentId => edit the comment belonging to the specified blog post

blogPostsRouter.put("/blogPostId/comment/:commentId", async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
})

// DELETE /blogPosts/:id/comment/:commentId=> delete the comment belonging to the specified blog post

blogPostsRouter.delete("/blogPostId/comment/:commentId", async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
})



export default blogPostsRouter
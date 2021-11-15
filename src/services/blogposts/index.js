import express from "express"
import createHttpError from "http-errors"
import q2m from "query-to-mongo"

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

// GET /blogposts/:blogPostId/comments => returns all the comments for the specified blog post

blogPostsRouter.get("/:blogPostId/comments", async (req, res, next) => {
    try {
        const id = req.params.blogPostId
        const blogPost = await BlogPostModel.findById(id)
        
        if (blogPost) {
            res.send(blogPost.comments)
        } else {
            next(createHttpError(404, `Blog post with id ${req.params.blogPostId} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

// GET /blogPosts/:id/comments/:commentId=> returns a single comment for the specified blog post

blogPostsRouter.get("/:blogPostId/comments/:commentId", async (req, res, next) => {
    try {
        const id = await req.params.blogPostId
        const commentId = req.params.commentId

        const blogPost = await productModel.findById(id)
        if (blogPost) {
            const comment = blogPost.comments.find(commentId)
            if (comment) {
                res.send(comment)
            } else {
                next(createHttpError(404, `Comment with id ${req.params.commentId} not found!`))
            }
        } else {
            next(createHttpError(404, `Blog post with id ${req.params.blogPostId} not found!`))

        }
    } catch (error) {
        next(error)
    }
})

// POST /blogPosts/:id => adds a new comment for the specified blog post

blogPostsRouter.post("/:blogPostId/comments", async (req, res, next) => {
    //It's always good practice to wrap things in a try catch when inside an asynchronous func
    try {
        const id = req.params.blogPostId //find the id of the target blog in the parameters of our http request and store it in a variable
        const newComment = req.body //The comment we want to add to the blogpost comes from the body of our POST request

        const blogPost = await BlogPostModel.findById(id) // create a variable to store the target blogpost as we will need to use it later

        if (blogPost) {
            //if the blogpost with the specified id exists proceed

            //The following implements the $push method which is simply an array method desinged to add a new item 
            const updatedBlogPost = await BlogPostModel.findByIdAndUpdate(
                id,
                {
                    $push: {
                        comments: newComment
                    }
                },
                { new: true }
            )
            if(updatedBlogPost) {
                res.send(updatedBlogPost)
            }
        } else {
            next(createHttpError(404, `Blog post with id ${req.params.id} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

// PUT /blogPosts/:id/comment/:commentId => edit the comment belonging to the specified blog post

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

// DELETE /blogPosts/:id/comment/:commentId=> delete the comment belonging to the specified blog post

blogPostsRouter.delete("/:blogPostId/comments/:commentId", async (req, res, next) => {
    try {
        const modifiedBlogPost = await BlogPostModel.findByAndUpdate(
            req.params.blogPostId,
            { $pull: { comments: { _id: req.params.commentId }}},
            { new: true }
        )
        if (modifiedBlogPost) {
            res.send(modifiedBlogPost)
        } else {
            next(createHttpError(404, `Blog post with id ${req.params.blogPostId} not found!`))
        }
    } catch (error) {
        next(error)
    }
})



export default blogPostsRouter
import express from "express"
import UserModel from "./schema.js"

const usersRouter = express.Router()

usersRouter.post("/", async (req, res, next) => {
    try {
        const newUser = new UserModel(req.body)
        const { _id } = await newUser.save()
        res.send({ _id })
    } catch (error) {
        next(error)
    }
})

usersRouter.get("/", async (req, res, next) => {
    try {
        const users = await UserModel.find()
        res.send(users)
    } catch (error) {
        next(error)
    }
})

usersRouter.get("/:id", async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id)
        res.send(user) 
    } catch (error) {
        next(error)
    }
})

usersRouter.put("/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true })

        if (updatedUser) {
            res.send(updatedUser)
        } else {
            next(createHttpError(404, `User with id ${id} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

usersRouter.delete("/:id", async (req, res, next) => {
    try {
       const id = req.params.id
       const deletedUser = await UserModel.deleteOne({ _id: id })
       if (deletedUser) {
           res.status(204).send(`User with id: ${id} has been deleted`)
       } 
    } catch (error) {
        next(error)
    }
})

// usersRouter.delete("/:id", async (req, res, next) => {
//     try {
//        await req.user.deleteOne()
//        res.status(204).send()
//     } catch (error) {
//         next(error)
//     }
// })

export default usersRouter
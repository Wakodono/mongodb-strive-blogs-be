import express from "express"
import passport from "passport"
import UserModel from "./schema.js"
import { adminOnlyMiddleware } from "../../auth/admin.js"
import { basicAuthMiddleware } from "../../auth/basic.js"
import { JWTAuthMiddleware } from "../../auth/token.js"

const usersRouter = express.Router()

usersRouter.post("/", JWTAuthMiddleware, async (req, res, next) => {
    try {
        const newUser = new UserModel(req.body)
        const { _id } = await newUser.save()
        res.send({ _id })
    } catch (error) {
        next(error)
    }
})

usersRouter.get("/", JWTAuthMiddleware, async (req, res, next) => {
    try {
        const users = await UserModel.find()
        res.send(users)
    } catch (error) {
        next(error)
    }
})

usersRouter.get("/me", JWTAuthMiddleware, async (req, res, next) => {
    try {
      res.send(req.user)
    } catch (error) {
      next(error)
    }
  })

usersRouter.get("/googleLogin", async (req, res, next) => {})

usersRouter.get("/googleRedirect", async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
})

usersRouter.get("/:id", JWTAuthMiddleware, async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id)
        res.send(user) 
    } catch (error) {
        next(error)
    }
})

usersRouter.put("/me", JWTAuthMiddleware, async (req, res, next) => {
    try {
        req.user.name = "Wako"
        await req.user.save()
        res.send()
    } catch (error) {
      next(error)
    }
  })

usersRouter.put("/:id", JWTAuthMiddleware, adminOnlyMiddleware, async (req, res, next) => {
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

usersRouter.delete("/me", JWTAuthMiddleware, async (req, res, next) => {
  try {
    await req.user.deleteOne()
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

usersRouter.delete("/:id", JWTAuthMiddleware, adminOnlyMiddleware, async (req, res, next) => {
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


  usersRouter.post("/login", async (req, res, next) => {
    try {
      // 1. Get credentials from req.body
      const { email, password } = req.body
  
      // 2. Verify credentials
      const user = await UserModel.checkCredentials(email, password)
  
      if (user) {
        // 3. If credentials are fine we are going to generate an access token
        const accessToken = await JWTAuthenticate(user)
        res.send({ accessToken })
      } else {
        // 4. If not --> error (401)
        next(createHttpError(401, "Credentials not ok!"))
      }
    } catch (error) {
      next(error)
    }
  })

  usersRouter.post("/refreshToken", async (req, res, next) => {
      try {
    // 1. Receive the current refresh token from req.body
    const { currentRefreshToken } = req.body
    // 2. Check the validity of that (check if it is not expired, check if it hasn't been compromised, check if it is in db)
    const { accessToken, refreshToken } = await verifyRefreshAndGenerateTokens(currentRefreshToken)
    // 3. If everything is fine --> generate a new pair of tokens (accessToken and refreshToken)
    // 4. Send tokens back as a response
    res.send({ accessToken, refreshToken })
      } catch (error) {
          next(error)
      }
  })

export default usersRouter
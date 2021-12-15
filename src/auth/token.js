import createHttpError from "http-errors"
import UserModel from "../services/users/schema.js"
import { verifyJWT } from "./tools.js"

export const JWTAuthMiddleware = async (req, res, next) => {
    // 1. Check if Authorization header is recieved
    if (!req.headers.authorization) {
        next(createHttpError(401, "Please provide a token in Authorization header"))
    } else {
        try {
         //2. If Authorization header, extract token from it
         const token = req.headers.authorization.replace("Bearer ", "")
         
         // 3. Verify token and if everything is ok we should get the payload of the token ({_id: "ojieojrojsgr23"}), otherwise jwt library thorws an error for us 
         const decodedToken = await verifyJWT(token)

        // 4. If token is valid we are going to attach the user to request object
        const user = await UserModel.findById(decodedToken._id)
        if (user) {
            req.user = user
            next()
      } else {
        next(createHttpError(404, "User not found"))
      }
        } catch (error) {
        // 5. In case of an error --> 401
        next(createHttpError(401, "Invalid Token!"))
        }
    }
}
import jwt from "jsonwebtoken"


const generateJWTToken = (payload) =>
new Promise((resolve, reject) =>
jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" }, (err, token) => {
    if (err) reject(err)
    else resolve(token)
    })
    )
    
export const JWTAuthenticate = async (user) => {
      // 1. takes the user as a parameter and generates token
      const accessToken = await generateJWTToken({ _id: user._id })
      return accessToken
    }
    
export const verifyJWT = (token) =>
  new Promise((res, rej) =>
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) rej(err)
      else res(decodedToken)
    })
  )
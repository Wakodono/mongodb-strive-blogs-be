import mongoose from "mongoose"

const { Schema, model } = mongoose

const UserSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "User", enum: ["User", "Admin"] },
})

export default model("User", UserSchema)
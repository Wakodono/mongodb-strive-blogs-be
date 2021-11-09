import mongoose from "mongoose";

const { Schema, model } = mongoose;

/* {
    "_id": "MONGO GENERATED ID",
    "category": "ARTICLE CATEGORY",
    "title": "ARTICLE TITLE",
    "cover":"ARTICLE COVER (IMAGE LINK)",
    "readTime": {
      "value": Number,
      "unit": "minute"
    },
    "author": {
      "name": "AUTHOR NAME",
      "avatar":"AUTHOR AVATAR LINK"
    },
    "content": "HTML",
    "createdAt": "DATE",
  "updatedAt": "DATE"           
} */
const blogPostsSchema = new Schema(
  {
    category: String,
    title: String,
    cover: String,
    readTime: {
      value: Number,
      unit: String,
    },
    author: {
      name: String,
      avatar: String,
    },
    content: String,
  },
  {
    timestamps: true,
  }
);

export default model("BlogPost", blogPostsSchema)

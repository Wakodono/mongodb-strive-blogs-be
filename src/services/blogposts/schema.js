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
    comments: [
      {
        title: {type: String, required: true},
        content: {type: String, required: true},
        rating: {
          type: Number,
          min: [1, "Rating must be at least 1"],
          max: [5, "Rating must be a maximum of 5"],
          default: 5,
           required:true
          },
        user: {
          name: {type: String, required: true },
          avatar: { type: String, required: true },
        }
      }
    ]
  },
  {
    timestamps: true,
  }
);

export default model("BlogPost", blogPostsSchema)

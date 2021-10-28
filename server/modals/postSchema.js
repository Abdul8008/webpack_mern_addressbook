const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

// firstName, lastName, birthDate, description, email, phone

const schema =  mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDate: {
    type: String,
    required: true
  },  
  description: {
    type: String,
    required: true
  },  
  email: {
    type: String,
    required: true
  },  
  phone: {
    type: String,
    required: true
  },  
  postedBy: {
      type: ObjectId,
      ref: "User"
  }
}, { timestamps: true } )

const PostSchema = mongoose.model('Post', schema)

module.exports = PostSchema
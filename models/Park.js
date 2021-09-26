const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Pass through props to the results. 

const parkSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    images: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    addresses: {
        type: String,
        required: true
    },
    url: {
        type: String
    }
})

module.exports = mongoose.model("Park", parkSchema)
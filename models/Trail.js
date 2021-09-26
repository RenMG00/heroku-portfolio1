const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Pass through props to the results. 

const trailSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    parkId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: true
    },
    length: {
        type: String,
        required: true
    }, 
    elevationChange: {
        type: Number,
        required: true
    },
    routeType: {
        type: String,
        required: true
    }, 
    reviews: {
        type: String
    }

})

module.exports = mongoose.model("Trail", trailSchema)
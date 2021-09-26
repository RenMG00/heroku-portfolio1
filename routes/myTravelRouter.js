const express = require('express')
const myTravelRouter = express.Router()
const Park = require("../models/Park.js")

//Get Parks
myTravelRouter.get("/", (req, res, next) => {
    Park.find((err, parks) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(parks)
    })
})

myTravelRouter.get('/user', (req, res, next) => {
    Park.find({ user: req.user._id }, (err, parks ) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      return res.status(200).send(parks)
    })
  })
  myTravelRouter.get("/user/:userId", (req, res, next) => {
    Park.find(
      { user: req.params.userId },
      (err, parks) => {
        if (err) {
          res.status(500)
          return next(err)
        }
        return res.status(200).send(parks)
      })
  })
  
  //get a park by the id
  myTravelRouter.get('/:id', (req, res, next) => {
    Park.findById(req.params.id, (err, park) => {
      if (err) {
        res.status(500)
        return next(err)
      } else if (!park) {
        res.status(404)
        return next(new Error('No post item has been found.'))
      }
      return res.send(park)
    })
  })

// Post Park
myTravelRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id
    const newPark = new Park(req.body)
    newPark.save((err, savedPark) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(savedPark)
    })
})

// Delete Park
myTravelRouter.delete("/:id", (req, res, next) => {
    Park.findOneAndDelete({ _id: req.params.id },
        (err, deletedItem) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted ${deletedItem._id} from the database`)
        })
})


module.exports = myTravelRouter
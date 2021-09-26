const express = require('express')
const commentRouter = express.Router()
const Comment = require("../models/Comment.js")


//get comment for a specific park.
commentRouter.get("/:id", (req, res, next) => {
    Comment.find(
        { id: req.params.id },
        (err, comments) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            res.status(200).send(comments)
        }
    )
})

//get comment for a specific trail.
commentRouter.get("/:parkId", (req, res, next) => {
    Comment.find(
        { parkId: req.params.parkId },
        (err, comments) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            res.status(200).send(comments)
        }
    )
})
//comment, userId, username, parkId
commentRouter.post('/:parkId', (req, res, next) => {
    req.body.userId = req.user._id
    req.body.username = req.user.username
    req.body.parkId = req.params.parkId
    const newComment = new Comment(req.body)
    newComment.save(
        (err, comment) => {
            if (err) {
                res.status(500)
                next(err)
            }
            return res.status(201).send(comment)
        }
    )
})
//comment, userId, username, id
commentRouter.post('/:id', (req, res, next) => {
    req.body.userId = req.user._id
    req.body.username = req.user.username
    req.body.id = req.params.id
    const newComment = new Comment(req.body)
    newComment.save(
        (err, comment) => {
            if (err) {
                res.status(500)
                next(err)
            }
            return res.status(201).send(comment)
        }
    )
})
commentRouter.put('/:parkId', (req, res, next) => {
    Comment.findByIdAndUpdate(
        { _id: req.params.parkId, user: req.user._id },
        req.body,
        { new: true },
        (err, comment) => {
            if (err) {
                console.log("Error")
                res.status(500)
                return next(err)
            }
            return res.send(comment)
        }
    )
})

commentRouter.delete('/:commentId', (req, res, next) => {
    Comment.findByIdAndDelete({
        _id: req.params.commentId,
        user: req.user._id},
        (err, deletedComment) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.send(deletedComment)
        })
})


module.exports = commentRouter;
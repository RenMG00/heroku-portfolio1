const express = require('express')
const app = express()
require("dotenv").config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressjwt = require("express-jwt")
const path = require("path")

const port = process.env.PORT || 9000;
const secret = process.env.SECRET || "plants space fang twizzler"

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "build")))

  mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/parks-guide")
    .then(()=>{
      console.log('con to db established')
   })
   .catch(err=>{
      console.log(`db err: ${err.message}`);
      process.exit(-1)
   }) 

app.use('/auth', require('./routes/authRouter.js'))
app.use('/api', expressjwt({ secret: secret, algorithms: ['HS256'] }))
app.use('/api/mytravel', require('./routes/myTravelRouter.js'))
app.use("/api/users", require("./routes/usersRouter.js"))

app.use((err, req, res, next) => {
  console.log(err)
  return res.send({ errMsg: err.message })
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on local port 9000`)
})
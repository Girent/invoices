const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const walletOperationRouter = require('./routes/walletOperationRouter')

require('dotenv').config()

const app = express()

mongoose.connect(process.env.DB)
.then(() => console.log('mongoDB Connected'))
.catch(error => console.log(error))

app.use(express.json())
app.use(cors())

app.use('/api', walletOperationRouter)

module.exports = app
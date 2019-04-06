const express = require('express')
const app = express()
const PORT = process.env.PORT


app.get('/', (req, res) => {    res.json({message: 'Hello' })})

app.listen(PORT)

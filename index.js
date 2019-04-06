const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;


app.get('/', (req, res) => {    res.json({message: 'Hello' })});

app.listen(PORT, function() {   console.log("Listening on port: " + PORT)});

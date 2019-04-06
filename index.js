const express = require('express');
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 8080;


router.get('/', (req, res) => {    res.json({message: 'Hello' })});

app.use('/rest', router);

app.listen(PORT, function() {   console.log("Listening on port: " + PORT)});

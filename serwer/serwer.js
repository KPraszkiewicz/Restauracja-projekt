"use strict"
// lib
const express = require('express')
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express()
const port = 3000


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cors({origin:'*'}))

// moje
const routes = require("./routers/routes");


//
routes(app);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
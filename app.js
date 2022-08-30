const express = require("express");
var bodyParser = require('body-parser')
const app = express();
const v1Router = express.Router();
const {initPool} = require("./mysqlDB");

app.use(initPool);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

require("./apis/config")(v1Router);
app.use("/v1",v1Router);

app.use((err,req,res,next)=>{
    res.status(500).send(err)
})

module.exports = app;
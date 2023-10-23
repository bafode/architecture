const express = require("express");
const fs      = require("fs");
const path    = require("path");
const dotenv=require('dotenv') 
const colors =require('colors') 
const cors=require('cors')
const asyncHandler = require('express-async-handler')
const connectDB=require("./config/db")
const protect=require("./middlewares/authMiddleware")

dotenv.config()

connectDB()
const app=express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
function extractRoutes(str) {
    const routes = [];
    let currentRoute = {};
    const regex = /@url\s?=\s?(.*)|@method\s?=\s?(.*)|static\s(?:async\s)?(.*)\s?\(/g;
    let match;

    while ((match = regex.exec(str)) !== null) {
        const [_, url, method, action] = match;
        if (url !== undefined) currentRoute.url = url;
        if (method !== undefined) currentRoute.method = method.toLowerCase();
        if (action !== undefined) currentRoute.action = action;
        if (currentRoute.url && currentRoute.method && currentRoute.action) {
            routes.push(currentRoute);
            currentRoute = {};
        }
    }

    return routes;
}

const controller = require("./route")

for (const route of extractRoutes(controller.toString())) {
    console.log("Controller",controller.name, route.url+":"+route.method,route.action, "registered")
    app[route.method](route.url,protect,asyncHandler(controller[route.action]))
}



const PORT = process.env.PORT || 5001

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
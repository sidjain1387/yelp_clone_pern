require("dotenv").config();
const express = require ("express");
const morgan = require("morgan");

const app=express();
const port= process.env.PORT || 3001;

app.use(express.json());


//Get all Restaurants

app.get("/api/v1/restaurants",(req,res)=>{
    res.status(200);


})

//Get a Restaurant
app.get("/api/v1/restaurants/:id",(req,res)=>{
    res.status(200);

})

//Create a Restaurant
app.post("/api/v1/restaurants",(req,res)=>{
    res.status(200);

})

//Update a Restaurant
app.put("/api/v1/restaurants/:id",(req,res)=>{
    res.status(200);

})

//Delete a Restaurant
app.delete("/api/v1/restaurants/:id",(req,res)=>{
    res.status(200);

})





app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
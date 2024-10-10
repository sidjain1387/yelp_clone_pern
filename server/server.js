require("dotenv").config();
const pool = require("./db");
const express = require ("express");
const morgan = require("morgan");

const app=express();
const port= process.env.PORT || 3001;

app.use(express.json());


//Get all Restaurants

app.get("/api/v1/restaurants",async(req,res)=>{
    try {
        const result = await pool.query("SELECT * FROM restaurants");
        res.status(200).json(result.rows);    
    } catch (error) {
       console.error(error.message); 
    }


})

//Get a Restaurant
app.get("/api/v1/restaurants/:id",async(req,res)=>{
    try {
        const result=await pool.query("SELECT * FROM restaurants WHERE id=$1",[req.params.id]);
        res.status(200).json(result.rows[0]);
        
    } catch (error) {
        console.error(error.message);
        
    }

})

//Create a Restaurant
app.post("/api/v1/restaurants",async(req,res)=>{
    try {
        const {name,location,price_range}=req.body;
        const result=await pool.query("INSERT INTO restaurants (name,location,price_range) VALUES($1,$2,$3) RETURNING *",[name,location,price_range]);
        res.status(200).json(result.rows[0]);
        
    } catch (error) {
        console.error(error.message);
        
    }

})

//Update a Restaurant
app.put("/api/v1/restaurants/:id",async(req,res)=>{
    try {
        const {name,location,price_range}=req.body;
        const result=await pool.query("UPDATE restaurants SET name=$1,location=$2,price_range=$3 WHERE id=$4 returning *",[name,location,price_range,req.params.id]);
        res.status(200).json(result.rows[0]);
        
    } catch (error) {
        console.error(error.message);
        
    }

})

//Delete a Restaurant
app.delete("/api/v1/restaurants/:id",async(req,res)=>{
    try {
        const result=await pool.query("DELETE FROM restaurants WHERE id=$1",[req.params.id]);
        res.status(200).json(result.rows[0]);
        
    } catch (error) {
        console.error(error.message);
        
    }

})





app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
require("dotenv").config();
const cors = require('cors');

const pool = require("./db");
const express = require ("express");
const morgan = require("morgan");

const app=express();
const port= process.env.PORT || 3001;
app.use(cors());

app.use(express.json());


//Get all Restaurants

app.get("/api/v1/restaurants",async(req,res)=>{
    try {
        const result=await pool.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id,COUNT(*),TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id=reviews.restaurant_id");
        res.status(200).json(result.rows);    
    } catch (error) {
       console.error(error.message); 
    }
})

//Get a Restaurant
app.get("/api/v1/restaurants/:id",async(req,res)=>{
    try {
        const result=await pool.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id,COUNT(*),TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id=reviews.restaurant_id WHERE id=$1",[req.params.id]);
        const reviews=await pool.query("SELECT * FROM reviews WHERE restaurant_id=$1",[req.params.id]);

        res.status(200).json(
            {
                restaurant:result.rows[0],
                reviews:reviews.rows
            }
        );
        
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

app.post("/api/v1/restaurants/:id/addReview",async(req,res)=>{
    try {
        const {name,review,rating}=req.body;
        const result=await pool.query("INSERT INTO reviews (restaurant_id,name,review,rating) VALUES($1,$2,$3,$4) RETURNING *",[req.params.id,name,review,rating]);
        res.status(200).json(result.rows[0]);
        
    } catch (error) {
        console.error(error.message);
        
    }

})



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
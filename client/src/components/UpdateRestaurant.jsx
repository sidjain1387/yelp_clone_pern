import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';


const UpdateRestaurant = (props) => {
    const { id }=useParams();

    const [name,setName]=useState("");
    const [location,setLocation]=useState("");
    const [priceRange,setPriceRange]=useState("");
    let navigate=useNavigate();


    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const response=await RestaurantFinder.get(`/${id}`);
                setName(response.data.restaurant.name);
                setLocation(response.data.restaurant.location);
                setPriceRange(response.data.restaurant.price_range);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    },[]);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response=await RestaurantFinder.put(`/${id}`,{
                name,
                location,
                price_range:priceRange
            });
            navigate('/');
        } catch (error) {
            console.error(error.message);
        }
    }


  return (
    <div>
      <form action="">
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className='form-control' id='name'/>
        </div>
        <div className="form-group">
            <label htmlFor="location">Location</label>
            <input value={location} onChange={(e)=>setLocation(e.target.value)} type="text" className='form-control' id='location'/>
        </div>
        <div className="form-group">
            <label htmlFor="price_range">Price Range</label>
            <input type="number" className='form-control' id='price_range' value={priceRange} onChange={(e)=>setPriceRange(e.target.value)}/>
        </div>
        <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default UpdateRestaurant

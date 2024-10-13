import React, { useEffect,useContext } from 'react';
import RestaurantFinder from "../apis/RestaurantFinder.js";
import { RestaurantsContext } from '../context/RestaurantsContext.js';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating.jsx';

const RestaurantList = (props) => {
  const {restaurants,setRestaurants}=useContext(RestaurantsContext);

  let navigate=useNavigate();

  const handleUpdate=(e,id)=>{
    e.stopPropagation();
    navigate(`/restaurant/${id}/update`);
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);

  async function handleDelete(e,id){
    e.stopPropagation();
    try {
      const response=await RestaurantFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter(restaurant=>restaurant.id!==id));      
    } catch (error) {
      console.error(error.message);
      
    }
    
  }

  const renderRating=(restaurant)=>{
    if(!restaurant.count){
      return <span className='text-warning'>0 reviews</span>
    }
    else {

      return (
        <>
      <StarRating rating={restaurant.average_rating}/>
      <span className='text-warning ml-1'>({restaurant.count})</span>
      </>
    )
  }
  }

  const handleRestaurantSelect=(id)=>{
    navigate(`/restaurant/${id}`);
  }

  return (
    <div className='list-group'>
      <table className="table table-hover table-dark">
        <thead>
          <tr className='bg-primary'>
            <th scope='col'>Restaurant</th>
            <th scope='col'>Location</th>
            <th scope='col'>Price Range</th>
            <th scope='col'>Ratings</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => {
            return (
            <tr key={restaurant.id} onClick={()=>handleRestaurantSelect(restaurant.id)}>
              <td>{restaurant.name}</td>
              <td>{restaurant.location}</td>
              <td>{"$".repeat(restaurant.price_range)}</td>
              <td>{renderRating(restaurant)}</td>
              <td><button className='btn btn-warning' onClick={(e)=>handleUpdate(e,restaurant.id)}>Update</button></td>
              <td><button className='btn btn-danger' onClick={(e)=>handleDelete(e,restaurant.id)}>Delete</button></td>
            </tr>
          )})}  
        </tbody>
      </table>
    </div>
  )
}

export default RestaurantList

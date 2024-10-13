import React from 'react'
import { useContext } from 'react';
import { useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext.js';
import { useEffect } from 'react';
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews.jsx';
import AddReview from '../components/AddReview.jsx';

function Restaurantdetail(){
  const {id}=useParams();
  const {selectedRestaurant,setSelectedRestaurant}=useContext(RestaurantsContext);

  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const response=await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  },[]);

  return (
    <div>
      {selectedRestaurant && 
          (
            <>
            <h1 className='text-center display-1'>{selectedRestaurant.restaurant.name}</h1>
            <div className="text-center">
              <StarRating rating={selectedRestaurant.restaurant.average_rating}/>
              <span className="text-warning ml-1">
                {selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : "(0)"}
              </span>
            </div>
            <div className="mt-3">
              <Reviews reviews={selectedRestaurant.reviews}/>
              
            </div>
            <AddReview/>
            </>
          )
      }
    </div>
  )
}

export default Restaurantdetail

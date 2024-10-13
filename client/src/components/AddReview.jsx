import React, { useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { useParams } from 'react-router-dom';

const AddReview = () => {
    const {id}=useParams();

    const[name,setName]=useState('');
    const[rating,setRating]=useState('Rating');
    const[review,setReviewText]=useState('');

    const handleSubmitReview=async(e)=>{
        e.preventDefault();
        try {
            const response=await RestaurantFinder.post(`/${id}/addReview`,{name,review,rating});
            console.log(response);
            window.location.reload();

        } catch (error) {
            console.error(error.message);
        }
    }




  return (
    <div className='mb-2'>
      <form action="">
        <div className="form-row">
            <div className="form-gorup col-8">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder='name' className='form-control' value={name} onChange={e=>setName(e.target.value)}/>
            </div>
            <div className="form-gorup col-8">
                <label htmlFor="rating">Rating</label>
                <select id="rating" className="custom-select" value={rating} onChange={e=>setRating(e.target.value)}>
                    <option disabled>Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            
        </div>
        <div className="form-group">
            <label htmlFor="review">Review</label>
            <textarea id="review" className='form-control' value={review} onChange={e=>setReviewText(e.target.value)}></textarea>
        </div>
        <button type='submit' className='btn btn-primary' onClick={handleSubmitReview}>Submit</button>
      </form>
    </div>
  )
}

export default AddReview
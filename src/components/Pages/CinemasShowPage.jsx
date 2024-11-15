import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchShowDetailes } from '../../redux/reducer/showSlice';
const CinemasShowPage = () => {

    const dispatch =useDispatch();
    const { cinemas , movieDetailes ,loading} = useSelector((state)=>state.show);

    const {movie_id} = useParams();
    useEffect(()=>{

        const fetchShowsDetailesData = async (movie_id) =>{

            const result = await dispatch(
                fetchShowDetailes({ movieId: movie_id})
              );
        
              if (fetchShowDetailes.fulfilled.match(result)) {
                console.log("Fetch successful");
              } else {
                console.error("Fetch failed");
              }
        }

        fetchShowsDetailesData(movie_id);

    },[dispatch,movie_id]);


    if(loading)
    {
        return (<div className='text-center'>Loading</div>)
    }
  return (
    <div>CinemasShowPage</div>
  )
}

export default CinemasShowPage
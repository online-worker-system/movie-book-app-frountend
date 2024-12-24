import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";
import MovieCard from "../common/MovieCard";
import { getAllMoviesApi } from "../../redux/reducer/homeSlice";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import liveEventsArray from "../../utils/sliderTwoPcitures";
import Footer from "../common/Footer";
import SliderComponent from "../common/SliderComponent";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const dispatch = useDispatch();
  const { allMovies, isLoading } = useSelector((state) => state.home);

  // Tracks if animation has run
  const movieCardRef = useRef();
  const anotherRef = useRef();
  const pinnedContentRef = useRef();

  useLayoutEffect(() => {
    if (movieCardRef.current && anotherRef.current && allMovies.length) {
      const elements = anotherRef.current.querySelectorAll(".movieCard");

      if (elements.length) {
        gsap.from(elements, {
          opacity: 0,
          scrollTrigger: {
            trigger: anotherRef.current,
            start: "top 70%",
            end: "top -20%",
          },
        });
      }

      // Pin the content below the movie cards while the animation runs
      gsap.to(anotherRef.current, {
        x: "-115%",
        scrollTrigger: {
          trigger: movieCardRef.current,
          start: "top 5%",
          end: "top -10%",
          scrub: true,
          pin: true, // Pin the content below while the animation plays
        },
      });

      // Pin the content below the movie cards while the animation runs
      gsap.to(pinnedContentRef.current, {
        scrollTrigger: {
          trigger: movieCardRef.current,
          start: "top 5%",
          end: "top -10%",
          pin: true, // Pin the content until the movie card animation completes
        },
      });
    }
  }, [allMovies]);

  useEffect(() => {
    const fetchMovies = async () => {
      const resultAction = await dispatch(getAllMoviesApi());
      if (getAllMoviesApi.fulfilled.match(resultAction)) {
        console.log("Movies fetched successfully");
      } else {
        console.log("Error fetching movies", resultAction.payload || resultAction.error);
      }
    };
    fetchMovies();
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <HomeSlider />
      {isLoading ? (
        <div className="flex items-center justify-center w-screen h-[400px]">
          {/* Loader component can go here */}
        </div>
      ) : (
        <div ref={movieCardRef} className="overflow-x-hidden">
          <div ref={anotherRef} className="w-full mt-8 flex gap-5 p-3 mb-5">
            {allMovies.length ? (
              allMovies.map((movie) => <MovieCard movie={movie} key={movie._id} />)
            ) : (
              <p>No movies found</p>
            )}
          </div>
        </div>
      )}
      <div
        ref={pinnedContentRef}
        className="w-screen h-max p-2 flex mt-5 items-center justify-center"
      >
        <div className="w-[90%] flex flex-col items-start justify-center">
          <h1 className="text-[rgb(51,51,51)] font-[700] font-[roboto] text-[30px]">
            The Best Live Events
          </h1>
          <div className="w-[100%] h-max flex items-center justify-between">
            {liveEventsArray.map((elem, index) => (
              <img
                src={elem.img}
                className="w-[230px] h-[230px] rounded-md"
                key={index}
              />
            ))}
          </div>
        </div>
        
      </div>
      <div className="w-screen h-max p-18 mt-5 mb-5">
      <SliderComponent></SliderComponent>
      </div>
      <Footer />
    </div>
  );


};

export default Home;

"use client"
import React, { useState, useEffect } from 'react';


const PromotionCarousel = ({promotions}:any) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % promotions.length);
    }, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % promotions.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? promotions.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="relative bg-white border border-gray-200 rounded-lg p-6 w-full max-w-2xl mx-auto">
      {/* Promotions Tag */}
      <div className="absolute top-0 right-0 bg-black text-mainColor py-1 px-3 rounded-bl-lg rounded-tr-lg text-xs font-semibold">
        Promotions
      </div>

      {/* Content */}
      <div className="mb-6 transition-opacity duration-500 ease-in-out">
        <h2 className="text-xl font-bold">{promotions[currentSlide].title}</h2>
        <p className="text-gray-500 mt-2">
          {promotions[currentSlide].description}
        </p>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4">
        {promotions.length > 0 ? (promotions.map((_:any, index:number) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full mx-1 transition-colors duration-300 ${
              index === currentSlide ? 'bg-black' : 'bg-gray-300'
            }`}
          ></span>
        ))): <p>No Promotion</p>}
      </div>
    </div>
  );
};

export default PromotionCarousel;

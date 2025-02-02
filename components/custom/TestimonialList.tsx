"use client";

import React from "react";
import Testimony from "./Testimony";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/scrollbar";
import SwipperNavButtons from "./SwipperNavButtons";


function TestimonialsList() {
  const testimonials = [
    {
      name: "Amos Henry",
      image: "/assets/images/amos-henry.png",
      role: "Software Engineer",
      description:
        "I was skeptical at first, but after creating an account and completing my first task, I received my first product to review! Sharing my honest opinions has never been more rewarding.",
    },
  
    {
      name: "Brooklyn Simmons",
      image: "/assets/images/brooklyn-simmons.png",
      role: "IT Manager",
      description:
        "Performing tasks and receiving products to review has been a fantastic experience. This platform offers a great opportunity to voice my thoughts on products and earn rewards for doing so!",
    },
    
    {
      name: "Dr. Maria Fernandez",
      image: "/assets/images/dr-maria-fernandez.png",
      role: "Product Analyst",
      description:
        "The platform’s straightforward process of reviewing products is highly satisfying. I love that I get to try new products while providing detailed feedback that matters.",
    },
    
    {
      name: "Officer James Liu",
      image: "/assets/images/officer-james-liu.png",
      role: "Customer Relations Specialist",
      description:
        "As soon as I completed a few tasks, I started receiving products to test. It's an amazing feeling knowing my reviews are helping improve these items.",
    },
    
    {
      name: "Sophie Williams",
      image: "/assets/images/sophie-williams.png",
      role: "Marketing Specialist",
      description:
        "Sharing my honest opinions on the products I receive is both fun and fulfilling. The process is seamless, and it's great to know that my feedback is valued.",
    },
    
    {
      name: "Michael Chen",
      image: "/assets/images/michael-chen.png",
      role: "Business Owner",
      description:
        "This platform has allowed me to engage with products in a way I never thought possible. The tasks are easy to follow, and reviewing products is both exciting and profitable.",
    },
  
    {
      name: "Dr. Emily Thompson",
      image: "/assets/images/dr-emily-thompson.png",
      role: "Professor of Marketing",
      description:
        "The opportunity to perform tasks and review products has expanded my knowledge of consumer goods. The platform is easy to use, and I enjoy sharing detailed reviews.",
    },
  
    {
      name: "Raj Patel",
      image: "/assets/images/raj-patel.png",
      role: "Retail Store Owner",
      description:
        "Since joining, I've enjoyed every task and product I’ve reviewed. It’s amazing to try new items and be part of improving their quality through my feedback.",
    },
  ];
  

  return (
    <div>
      <Swiper
        // centeredSlides={true}
        spaceBetween={30}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
        // slidesPerView={2}
        breakpoints={{
          380: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1536: { slidesPerView: 3.5 },
        }}
      >
        {testimonials.map((test, index) => (
          <SwiperSlide key={index}>
            <Testimony
              key={index}
              name={test.name}
              image={test.image}
              role={test.role}
              description={test.description}
            />
          </SwiperSlide>
        ))}
        <div className="mt-5 w-full flex justify-center items-center">
          <SwipperNavButtons />
        </div>
      </Swiper>
    </div>
  );
}

export default TestimonialsList;

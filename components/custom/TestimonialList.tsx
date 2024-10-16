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
        "Working with Interpol has been invaluable in enhancing our cyber security measures and protecting our systems.",
    },

    {
      name: "Brooklyn Simmons",
      image: "/assets/images/brooklyn-simmons.png",
      role: "IT Manager",
      description:
        "Interpol's expertise has been crucial in developing robust security protocols and training our team on best practices.",
    },
    {
      name: "Dr. Maria Fernandez",
      image: "/assets/images/dr-maria-fernandez.png",
      role: "Head of Cyber Security, Global Security Inc.",
      description:
        "Interpol's commitment to fighting cybercrime is unparalleled. Their collaborative approach and advanced intelligence have significantly enhanced our ability to prevent and respond to cyber threats.",
    },
    {
      name: "Officer James Liu",
      image: "/assets/images/officer-james-liu.png",
      role: "Cyber Crime Unit, New York Police Department",
      description:
        "Working with Interpol has provided us invaluable resources and support in combating international cybercrime. Their expertise and global network have greatly impacted our operations.",
    },
    {
      name: "Sophie Williams",
      image: "/assets/images/sophie-williams.png",
      role: "Director, CyberSafe Foundation",
      description:
        "Our collaboration with Interpol has been a game-changer in educating the public about cyber threats. Their resources and training programs have empowered our community significantly.",
    },
    {
      name: "Michael Chen",
      image: "/assets/images/michael-chen.png",
      role: "CEO, SecureTech Solutions",
      description:
        "Interpol's proactive stance on cybersecurity has provided us with the tools to protect our clients. Their support and strategies have been crucial for our success.",
    },
    {
      name: "Dr. Emily Thompson",
      image: "/assets/images/dr-emily-thompson.png",
      role: "Professor of Cyber Security, University of Technology",
      description:
        "Partnering with Interpol has enriched our research and provided real-world insights into global cyber threats. Their data and capabilities are invaluable.",
    },
    {
      name: "Raj Patel",
      image: "/assets/images/raj-patel.png",
      role: "Owner, Patel Electronics",
      description:
        "Interpol's support has been vital in safeguarding our online transactions. Their advice and resources have helped us implement robust security measures.",
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

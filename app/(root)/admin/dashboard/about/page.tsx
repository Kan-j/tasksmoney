import React from 'react';

const AboutUs = () => {
  return (
    <section className="flex flex-col  p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-extrabold mb-4">About Us</h1>

      <div className="space-y-4 text-gray-700 ">
        <p>
          At <span className="font-semibold">[Company Name]</span>, we believe that your opinions hold great value. Our mission is to create a platform where users can share their genuine experiences with products while getting rewarded for their time and feedback. We partner with businesses eager to learn from real consumers, ensuring that your voice is heard.
        </p>

        <p>
          Whether you're reviewing the latest tech gadgets, beauty products, or everyday household items, your reviews help companies improve and innovate. Our process is simple: <span className="font-semibold">test, review, and get paid.</span> We offer a variety of products for you to review, giving you the flexibility to choose what interests you the most.
        </p>

        <p>
          We’re committed to creating a transparent and trustworthy platform where users and businesses both benefit. By participating, you not only help shape the future of products but also earn real rewards for your contributions.
        </p>
      </div>

     
    </section>
  );
}

export default AboutUs;

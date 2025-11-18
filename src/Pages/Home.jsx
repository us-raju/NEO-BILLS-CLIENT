import React from "react";
import Hero from "../Component/Hero";
import Category from "../Component/Category";
import RecentBills from "../Component/RecentBills";
import HowItWork from "../Component/HowItWork";
import WhyChooseUs from "../Component/WhyChooseUs";


const Home = () => {
  return (
    <>
      <section className="w-11/12 md:w-10/12 mx-auto">
        <Hero></Hero>
      </section>
      <section className="w-11/12 md:w-10/12 my-12 mx-auto">
        <Category></Category>
      </section>
      <section className="w-11/12 md:w-10/12 my-12 mx-auto">
        <RecentBills></RecentBills>
      </section>
      <section className="w-11/12 md:w-10/12 my-12 mx-auto">
       <HowItWork></HowItWork>
      </section>
      <section className="w-11/12 md:w-10/12 my-12 mx-auto">
       <WhyChooseUs></WhyChooseUs>
      </section>
    </>
  );
};

export default Home;

import React from "react";
import Hero from "../Component/Hero";
import Category from "../Component/Category";


const Home = () => {
  return (
    <>
      <section className="w-11/12 md:w-10/12 mx-auto">
        <Hero></Hero>
      </section>
      <section className="w-11/12 md:w-10/12 my-12 mx-auto">
        <Category></Category>
      </section>
    </>
  );
};

export default Home;

import React from 'react';
import Home from '../Pages/Home';
import Navigation from '../Component/Navigation';
import { Outlet } from 'react-router';

const HomeLayout = () => {
    return <>
    <section className="w-11/12 md:w-10/12 mx-auto sticky top-0 z-50">
        <Navigation></Navigation>
      </section>
      <Outlet></Outlet>
    </>
};

export default HomeLayout;
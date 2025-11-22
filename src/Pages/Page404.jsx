import React from 'react';
import errorPage from "/page-404.jpg"
import { Link } from 'react-router';
import { AiOutlineHome } from 'react-icons/ai';
const Page404 = () => {
    return <>
    <div className='bg-center flex items-center justify-center bg-cover bg-no-repeat w-full min-h-screen'style={{backgroundImage:`url(${errorPage})`}}>
        <Link className='flex items-center bg-transparent text-primary font-[Inter] font-bold border border-primary rounded-2xl px-4 py-2 hover:bg-primary hover:text-white duration-200 mt-[300px]' to="/"><span className='mr-2'><AiOutlineHome /></span>Go Home</Link>
    </div>
    </>
};

export default Page404;
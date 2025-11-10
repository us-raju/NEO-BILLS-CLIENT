import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
    const [eye, setEye] = useState(true);
    const handleEyeToggle= ()=>{
        setEye(!eye)
    }

  return (
    <>
      <section className="w-11/12 md:w-10/12 mx-auto md:flex md:flex-col md:justify-center md:items-center min-h-screen">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="md:w-[50%] ">
            <form className="rounded-2xl p-5 shadow-2xl max-w-96 mx-auto">
              <h1 className="text-2xl font-bold font-[Inter] text-base-100">
                Register
              </h1>
              <div className="my-2">
                <label className="text-base-100 font-medium font-[Raleway] text-[18px]">
                  Name
                </label>
                <br />
                <input
                  className="pl-2.5 pr-7 py-1 w-full border border-primary rounded-[10px] text-base-content outline-0"
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  required
                />
              </div>
              <div className="my-2">
                <label className="text-base-100 font-medium font-[Raleway] text-[18px]">
                  Email
                </label>
                <br />
                <input
                  className="pl-2.5 pr-7 py-1 w-full border border-primary rounded-[10px] text-base-content outline-0"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  required
                />
              </div>
              <div className="my-2">
                <label className="text-base-100 font-medium font-[Raleway] text-[18px]">
                  Photo URL
                </label>
                <br />
                <input
                  className="pl-2.5 pr-7 py-1 w-full border border-primary rounded-[10px] text-base-content outline-0"
                  type="url"
                  placeholder="Enter your Photo URL"
                  name="Photo"
                  required
                />
              </div>
              <div className="my-2 relative">
                <label className="text-base-100 font-medium font-[Raleway] text-[18px]">
                  Password
                </label>
                <br />
                <input
                  className="pl-2.5 pr-7 py-1 w-full border border-primary rounded-[10px] text-base-content outline-0"
                  type={eye?"password":"text"}
                  placeholder="Enter your password"
                  name="password"
                  required
                />
                <span onClick={handleEyeToggle} className="absolute top-9 right-2.5 cursor-pointer">
                  {
                    eye?<FaRegEyeSlash />:<FaRegEye />
                  }
                </span>
              </div>
              <button
                type="submit"
                className="text-[20px] my-2 border border-primary w-full py-1 rounded-[10px] text-primary font-bold font-[Inter] cursor-pointer hover:bg-primary hover:text-white"
              >
                Register
              </button>
              <p>
                Already have an account?
                <Link className="text-primary underline" to="/login">
                  Login
                </Link>
              </p>
            </form>
          </div>
          <div className="md:w-[40%] md:min-w-60 my-10 md:ml-10 md:my-0">
            <h2 className="text-primary text-2xl font-bold font-[Inter]">
              NEO BILLS
            </h2>
            <p className="text-[18px] text-base-content font-medium mt-5">
              Easily manage and pay your utility bills such as Electricity, Gas,
              and Internet. Securely log in, Update bills, and download bill
              history as a PDF.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;

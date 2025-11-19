import React from "react";
import { FaRegUser } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { Link } from "react-router";
import useAuth from "../hook/useAuth";
import Swal from "sweetalert2";

const HowItWork = () => {
  const { user } = useAuth();
  return (
    <>
      <div>
        <h2 className="text-base-200 text-2xl font-[Inter] font-bold mb-5">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ">
          <Link
            to={user ? "#" : "/register"}
            onClick={(e) => {
              if (user) {
                e.preventDefault();

                Swal.fire({
                  title: "You already logged in",
                  icon: "info",
                  draggable: false,
                });
              }
            }}
            className="hover:border hover:border-primary rounded-2xl duration-200 border border-gray-300"
          >
            <div
              className={`bg-base-300 p-10 shadow-lg rounded-2xl flex flex-col justify-between`}
            >
              <div className="mb-5 flex items-center">
                <div className="bg-accent-content w-16 h-16 rounded-full flex justify-center items-center">
                  <span className="text-primary ">
                    <FaRegUser size={35} />
                  </span>
                </div>
                <div className="ml-5">
                  <h3 className="text-base-200 text-[18px] lg:text-[20px] font-semibold font-[Inter]">
                    Create an Account
                  </h3>
                </div>
              </div>
              <div>
                <p className="text-base-content">
                  Create your account and get instant access to all services.
                </p>
              </div>
            </div>
          </Link>
          <Link
            to="/bills"
            className="hover:border hover:border-primary rounded-2xl duration-200 border border-gray-300"
          >
            <div
              className={`bg-base-300 p-10 shadow-lg rounded-2xl flex flex-col justify-between`}
            >
              <div className="mb-5 flex items-center">
                <div className="bg-accent-content w-16 h-16 rounded-full flex justify-center items-center">
                  <span className="text-primary">
                    <RiBillLine size={35} />
                  </span>
                </div>
                <div className="ml-5">
                  <h3 className="text-base-200 text-[18px] lg:text-[20px] font-semibold font-[Inter]">
                    View & Filter Bills
                  </h3>
                </div>
              </div>
              <div>
                <p className="text-base-content">
                  Easily view, search, and filter your bills in one place.
                </p>
              </div>
            </div>
          </Link>
          <Link
            to="bills-details"
            className="hover:border hover:border-primary rounded-2xl duration-200 border border-gray-300"
          >
            <div
              className={`bg-base-300 p-10 shadow-lg rounded-2xl flex flex-col justify-between`}
            >
              <div className="mb-5 flex items-center">
                <div className="bg-accent-content w-16 h-16 rounded-full flex justify-center items-center">
                  <span className="text-primary">
                    <MdPayment size={35} />
                  </span>
                </div>
                <div className="ml-5">
                  <h3 className="text-base-200 text-[18px] lg:text-[20px] font-semibold font-[Inter]">
                    Pay Your Current Month Bill
                  </h3>
                </div>
              </div>
              <div>
                <p className="text-base-content">
                  Make secure online payments anytime, anywhere.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HowItWork;

import React from "react";
import { FaLock } from "react-icons/fa";
import { IoAccessibilitySharp, IoSettingsSharp } from "react-icons/io5";

const WhyChooseUs = () => {
  return (
    <>
      <div>
        <h2 className="text-base-100 text-2xl font-[Inter] font-bold mb-5">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ">
          <div
            className="rounded-2xl "
          >
            <div
              className={`bg-base-300 p-10 shadow-lg rounded-2xl flex flex-col justify-between`}
            >
              <div className="mb-5 flex items-center">
                <div className="bg-accent-content w-16 h-16 rounded-full flex justify-center items-center">
                  <span className="text-primary ">
                    <FaLock size={35} />
                  </span>
                </div>
                <div className="ml-5">
                  <h3 className="text-base-100 text-[18px] lg:text-[20px] font-semibold font-[Inter]">
                   Secure Transactions
                  </h3>
                </div>
              </div>
              <div>
                <p className="text-base-content">
                  Your payments are protected with advanced encryption.
                </p>
              </div>
            </div>
          </div>
          <div
            className="rounded-2xl "
          >
            <div
              className={`bg-base-300 p-10 shadow-lg rounded-2xl flex flex-col justify-between`}
            >
              <div className="mb-5 flex items-center">
                <div className="bg-accent-content w-16 h-16 rounded-full flex justify-center items-center">
                  <span className="text-primary">
                    <IoAccessibilitySharp size={35} />
                  </span>
                </div>
                <div className="ml-5">
                  <h3 className="text-base-100 text-[18px] lg:text-[20px] font-semibold font-[Inter]">
                    Easy Access Anywhere
                  </h3>
                </div>
              </div>
              <div>
                <p className="text-base-content">
                  Access your bill information anytime, from any device.
                </p>
              </div>
            </div>
          </div>
          <div
            className="rounded-2xl"
          >
            <div
              className={`bg-base-300 p-10 shadow-lg rounded-2xl flex flex-col justify-between`}
            >
              <div className="mb-5 flex items-center">
                <div className="bg-accent-content w-16 h-16 rounded-full flex justify-center items-center">
                  <span className="text-primary">
                    <IoSettingsSharp size={35} />
                  </span>
                </div>
                <div className="ml-5">
                  <h3 className="text-base-100 text-[18px] lg:text-[20px] font-semibold font-[Inter]">
                    Real-time Data Updates
                  </h3>
                </div>
              </div>
              <div>
                <p className="text-base-content">
                  Get instant updates on bill status and payment confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyChooseUs;

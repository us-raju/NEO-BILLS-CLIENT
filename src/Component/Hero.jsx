import React from "react";
import { Tooltip } from "react-tooltip";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import hero1 from "/hero-1.jpg";
import hero2 from "/hero-2.jpg";
import hero3 from "/hero-3.jpg";
import { Link } from "react-router";
const Hero = () => {
  return (
    <>
      <div className="w-full min-w-full">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          slidesPerView={1}
          navigation={false}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            0: { navigation: true },
            640: { navigation: false },
          }}
          className="md:h-[400px] h-[250px]"
        >
          <SwiperSlide>
            <div
              className="bg-cover bg-no-repeat bg-center h-full"
              style={{ backgroundImage: `url(${hero1})` }}
            >
              <div className="md:pt-10 md:pl-14 pt-5 pl-7">
                <h2 className="text-base-200 font-[Inter] font-bold md:text-2xl text-[18px]">
                  Manage Your Electricity Bills Easil
                </h2>
                <p className="text-base-content font-medium max-w-96 my-3 text-[14px] md:text-[16px]">
                  Track usage, calculate monthly cost, and pay your electricity
                  bills securely — all in one place.
                </p>

                <div>
                  <Tooltip id="my-tooltip"></Tooltip>
                  <Link
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Click to View all electricity bills"
                    data-tooltip-place="top"
                    className="border border-primary bg-primary hover:text-primary  mx-3 px-5 py-1.5 md:text-[18px] text-[14px] text-white hover:bg-white font-[Inter] font-medium duration-100 rounded-2xl cursor-pointer "
                    to={"/bills?catagory=Electricity"}
                  >
                    View Electricity Bills
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="bg-cover bg-no-repeat bg-center h-full"
              style={{ backgroundImage: `url(${hero2})` }}
            >
              <div className="md:pt-10 md:pl-14 pt-5 pl-7">
                <h2 className="text-base-200 font-[Inter] font-bold md:text-2xl text-[18px]">
                  Your Monthly Utility Reports <br />
                  At a Glance
                </h2>
                <p className="text-base-content font-medium max-w-96 my-3 text-[14px] md:text-[16px]">
                  Get detailed breakdowns of electricity, water, and gas
                  consumption with real bills and charts.
                </p>

                <div>
                  <Tooltip id="my-tooltip"></Tooltip>

                  <Link
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Click to download your pay bills"
                    data-tooltip-place="top"
                    className="border border-primary bg-primary hover:text-primary  mx-3 px-5 py-1.5 md:text-[18px] text-[14px] text-white hover:bg-white font-[Inter] font-medium duration-100 rounded-2xl cursor-pointer "
                    to={"/paybills"}
                  >
                    Download Bill
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="bg-cover bg-no-repeat bg-center h-full"
              style={{ backgroundImage: `url(${hero3})` }}
            >
              <div className="md:pt-10 md:pl-14 pt-5 pl-7">
                <h2 className="text-base-200 font-[Inter] font-bold md:text-2xl text-[18px]">
                  Pay Your Bills Instantly & Securely
                </h2>
                <p className="text-base-content font-medium max-w-96 my-3 text-[14px] md:text-[16px]">
                  Fast, secure, and hassle-free bill payments with multiple
                  payment methods.
                </p>

                <div>
                  <Tooltip id="my-tooltip"></Tooltip>

                  <Link
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Click to View all bills"
                    data-tooltip-place="top"
                    className="border border-primary bg-primary hover:text-primary  mx-3 px-5 py-1.5 md:text-[18px] text-[14px] text-white hover:bg-white font-[Inter] font-medium duration-100 rounded-2xl cursor-pointer "
                    to="/bills"
                  >
                    View All Bills
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Hero;

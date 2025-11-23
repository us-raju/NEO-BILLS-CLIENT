import React from "react";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <>
      <footer className="footer footer-horizontal footer-center bg-primary text-primary-content mt-10 p-10 h-[280px] w-11/12 md:w-10/12 mx-auto ">
        <aside>
          <div className="">
            <h2 className="text-[18px] lg:text-[24px] font-bold font-[Inter] mb-2">
              {" "}
              NEO BILL
            </h2>
            <p className="text-[14px] lg:text-[16px]">
              “NeoBills makes paying and tracking bills simple, fast, and
              secure. Manage all your payments in one place.”92
            </p>
          </div>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <Link to="https://www.facebook.com/" target="_blank">
              <FaFacebook size={25}/>
            </Link>

            <Link to="https://www.x.com/" target="_blank">
              <FaXTwitter size={25}/>
            </Link>

            <Link to="https://www.youtube.com/" target="_blank">
              <FaYoutube size={25}/>

            </Link>
          </div>
        </nav>
      </footer>
    </>
  );
};

export default Footer;

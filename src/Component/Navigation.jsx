import React from "react";
import { CgProfile } from "react-icons/cg";
import { Link, NavLink } from "react-router";
import useAuth from "../hook/useAuth";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";

const Navigation = () => {
  const { user, loading, LogOut } = useAuth();
  if (loading) {
    return <Loading></Loading>;
  }

  console.log(user)
  // Light and Dark mode

  // const toggleTheme = () => {
  //   const html = document.documentElement;
  //   const currentTheme = html.getAttribute("data-theme");
  //   html.setAttribute(
  //     "data-theme",
  //     currentTheme === "mytheme-light" ? "mytheme-dark" : "mytheme-light"
  //   );
  // };
  const handleLogOut = () => {
    LogOut()
      .then(() => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "LogOut Successfull",
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .catch((err) => {
        const errMessage = err.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errMessage,
        });
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          className="border border-primary hover:bg-primary hover:text-white  mx-3 px-5 py-1.5 text-[18px] text-primary font-[Inter] font-medium duration-100 rounded-2xl cursor-pointer "
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className="border border-primary hover:bg-primary hover:text-white  mx-3 px-5 py-1.5 text-[18px] text-primary font-[Inter] font-medium duration-100 rounded-2xl cursor-pointer "
          to="/bills"
        >
          Bills
        </NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink
              className="border border-primary hover:bg-primary hover:text-white  mx-3 px-5 py-1.5 text-[18px] text-primary font-[Inter] font-medium duration-100 rounded-2xl cursor-pointer "
              to="/paybills"
            >
              My Pay Bills
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink
              className="border border-primary hover:bg-primary hover:text-white  mx-3 px-5 py-1.5 text-[18px] text-primary font-[Inter] font-medium duration-100 rounded-2xl cursor-pointer "
              to="/login"
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              className="border border-primary hover:bg-primary hover:text-white  mx-3 px-5 py-1.5 text-[18px] text-primary font-[Inter] font-medium duration-100 rounded-2xl cursor-pointer "
              to="/register"
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const avtarLogout = (
    <>
      {user && user.photoURL ? (
        <NavLink
          className="w-[45px] h-[45px] border border-primary rounded-full cursor-pointer "
          to="/"
        >
          <img
            className="w-full h-full rounded-full"
            src={user.photoURL}
            alt=""
          />
        </NavLink>
      ) : (
        <span className="w-[45px] h-[45px]  cursor-pointer ">
          <CgProfile className="w-full h-full" />
        </span>
      )}

      <button
        onClick={handleLogOut}
        type="button"
        className="border border-primary bg-primary text-white  mx-3 px-5 py-1.5 text-[18px]  font-[Inter] font-medium  rounded-2xl cursor-pointer"
      >
        LogOut
      </button>
    </>
  );

  return (
    <>
      <div className="navbar shadow-sm bg-base-300">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content  rounded-box z-1 mt-3 w-52 p-2 shadow space-y-2 bg-base-300 "
            >
              {links}
            </ul>
          </div>
          <Link
            className="text-primary font-bold font-[Inter] text-[18px] md:text-2xl"
            to="/"
          >
            NEO BILLS
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal px-3">{links}</ul>
        </div>
        {user && (
          <div className="navbar-center hidden lg:flex">{avtarLogout}</div>
        )}
      </div>
    </>
  );
};

export default Navigation;

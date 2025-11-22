import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useAuth from "../hook/useAuth";
import Swal from "sweetalert2";
import { useLocation } from "react-router";
// import withReactContent from "sweetalert2-react-content";

const Login = () => {
  const { setUser, singIn, signInWithGoogle } = useAuth();
  const [eye, setEye] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const handleEyeToggle = () => {
    setEye(!eye);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    singIn(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        navigate(`${location.state ? location.state : "/"}`);
        form.reset();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Login Successfull",
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
  // signup with google
  const signUpWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        navigate("/");
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Login Successfull",
          showConfirmButton: false,
          timer: 1500,
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

  return (
    <>
    <title>Neobill-Login</title>
      <section className="w-11/12 md:w-10/12 mx-auto md:flex md:flex-col md:justify-center md:items-center min-h-screen">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="md:w-[50%] ">
            <div className="rounded-2xl p-5 shadow-2xl max-w-96 mx-auto">
              <form onSubmit={handleLogin}>
                <h1 className="text-2xl font-bold font-[Inter] text-base-200">
                  Login
                </h1>
                <div className="my-2">
                  <label className="text-base-200 font-medium font-[Raleway] text-[18px]">
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
                <div className="my-2 relative">
                  <label className="text-base-200 font-medium font-[Raleway] text-[18px]">
                    Password
                  </label>
                  <br />
                  <input
                    className="pl-2.5 pr-7 py-1 w-full border border-primary rounded-[10px] text-base-content outline-0"
                    type={eye ? "password" : "text"}
                    placeholder="Enter your password"
                    name="password"
                    required
                  />
                  <span
                    onClick={handleEyeToggle}
                    className="absolute top-9 right-2.5 cursor-pointer"
                  >
                    {eye ? <FaRegEyeSlash /> : <FaRegEye />}
                  </span>
                </div>
                <button
                  type="submit"
                  className="text-[20px] my-2 border border-primary w-full py-1 rounded-[10px] text-primary font-bold font-[Inter] cursor-pointer hover:bg-primary hover:text-white"
                >
                  Login
                </button>
              </form>
              <p className="text-center font-bold text-[18px]">OR</p>
              <button
                onClick={signUpWithGoogle}
                className="btn w-full border-primary rounded-[10px] text-base-content hover:bg-primary hover:text-white"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>
              <p>
                Create an account
                <Link className="ml-1 text-primary underline" to="/register">
                  Register
                </Link>
              </p>
            </div>
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

export default Login;

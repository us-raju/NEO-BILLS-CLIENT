import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import useAxios from "../hook/useAxios";
import Loading from "../Loading/Loading";
import useAuth from "../hook/useAuth";
import Swal from "sweetalert2";

const BillsDetails = () => {
  const { id } = useParams();
  const [bill, setBill] = useState(null);
  const [payBill, setPayBill] = useState(false);
  const [phone, setPhone] = useState(true);
  const [todayDate, setTodayDate] = useState("");
  const payBillRef = useRef(null);
  const { user } = useAuth();
  const axiosInstance = useAxios();
  useEffect(() => {
    axiosInstance
      .get(`/bills-details/${id}`)
      .then((bill) => setBill(bill.data));
  }, [axiosInstance, id]);

  //   month compare
  useEffect(() => {
    if (!bill) return;
    const currentMonth = new Date().getMonth();
    const billMonth = new Date(bill.date).getMonth();
    const compareMonth = currentMonth === billMonth;

    setPayBill(compareMonth);
  }, [bill]);

  // date functionlity
  useEffect(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = String(today.getFullYear());
    const formatedDate = `${year}-${month}-${day}`;
    setTodayDate(formatedDate);
  }, []);

  if (!bill || !payBill) {
    return <Loading></Loading>;
  }
  const paybillModal = () => {
    payBillRef.current.showModal();
  };
  // validate Phone number
  const validatePhone = (phone) => {
    const regex = /^[0-9]{11}$/;
    return regex.test(phone);
  };
  //   create pay bills
  const handlePayBillsForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = user.email;
    const bill_id = bill._id;
    const amount = bill.amount;
    const username = form.name.value;
    const address = form.address.value;
    const phone = form.phone.value;
    if (!validatePhone(phone)) {
      setPhone(false);
      return;
    }

    const newPayBill = {
      email: email,
      bill_id: bill_id,
      amount: amount,
      username: username,
      address: address,
      phone: phone,
    };

    axiosInstance
      .post("/pay-bills", newPayBill)
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: "Your bill pay successfully!",
        });
      })
      .catch((err) => {
        const error = err.message;
         Swal.fire({
          icon: "error",
          text: error,
        });
      });

    setPhone(true);
    console.log(email, bill_id, amount, username, address, phone);

    form.reset();
    if (payBillRef.current) {
      payBillRef.current.close();
    }
    console.log(newPayBill);
  };

  return (
    <>
      <section className="w-11/12 md:w-10/12 mx-auto">
        <div>
          <div className="lg:mt-10">
            <h2 className="text-base-200 text-2xl font-[Inter] font-bold mb-5">
              Bills Details
            </h2>
          </div>
          <div className="bill-details-container flex flex-col items-center justify-center lg:flex-row">
            <div className="bill-details-img flex justify-center mb-5 lg:mb-0 lg:w-[20%]">
              <img className="w-[60%] lg:w-full" src={bill.image} alt="" />
            </div>
            <div className="bill-details-content">
              <div className="lg:ml-10 ">
                <h3 className="text-base-200 text-[18px] lg:text-[24px] font-semibold font-[Inter]">
                  {bill.title}
                </h3>
                <h4 className="text-base-200 text-[16px] lg:text-[18px] lg: font-medium font-[Inter]">
                  Category: {bill.category}
                </h4>
                <h4 className="text-base-200 text-[16px] lg:text-[18px] lg: font-medium font-[Inter]">
                  Location:{" "}
                  <p className="text-[16px] lg:text-[18px] inline-block text-base-content">
                    {bill.location}
                  </p>
                </h4>
                <h4 className="text-base-200 text-[16px] lg:text-[18px] lg: font-medium font-[Inter]">
                  Date:{" "}
                  <p className="text-[16px] inline-block lg:text-[18px] text-base-content">
                    {bill.date}
                  </p>
                </h4>
                <h4 className="text-base-200 text-[16px] lg:text-[18px] lg: font-medium font-[Inter]">
                  Description:{" "}
                  <p className="text-[16px] inline-block lg:text-[18px] text-base-content">
                    {bill.description}
                  </p>
                </h4>
              </div>
              <div>
                <p className="text-[18px] text-primary font-bold my-2 text-center  px-7 py-1">
                  Amount: {bill.amount}
                </p>
              </div>
              <div className="text-center">
                <button
                  onClick={paybillModal}
                  to={``}
                  disabled={!payBill}
                  className=" inline-block py-2 px-3 rounded-2xl text-center text-[18px] font-semibold font-[Inter] text-primary bg-transparent border border-primary hover:bg-primary hover:text-white duration-200 cursor-pointer
                    "
                >
                  Pay Bill
                </button>
                {payBill ? (
                  ""
                ) : (
                  <p className="text-[18px] text-red-600 font-bold my-2 text-center  px-7 py-1">
                    You can only pay bills of the current month.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <dialog
          ref={payBillRef}
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-base-200 text-lg font-[Inter] text-center">
              Fill the Form!
            </h3>
            <form onSubmit={handlePayBillsForm} className="bg-base-100">
              <div>
                <label className="text-base-200 text-[16px] md:text-[18px] font-medium font-[Inter]">
                  Email
                </label>
                <br />
                <input
                  className="text-base-content text-[16px] md:text-[18px] border border-gary-300 px-2 py-1 w-full outline-primary rounded-[10px]"
                  defaultValue={user.email}
                  readOnly
                  type="email"
                />
              </div>
              <div>
                <label className="text-base-200 text-[16px] md:text-[18px] font-medium font-[Inter]">
                  Bill ID
                </label>
                <br />
                <input
                  className="text-base-content text-[16px] md:text-[18px] border border-gary-300 px-2 py-1 w-full outline-primary rounded-[10px]"
                  type="text"
                  defaultValue={bill._id}
                  readOnly
                />
              </div>
              <div>
                <label className="text-base-200 text-[16px] md:text-[18px] font-medium font-[Inter]">
                  Amount
                </label>
                <br />
                <input
                  className="text-base-content text-[16px] md:text-[18px] border border-gary-300 px-2 py-1 w-full outline-primary rounded-[10px]"
                  type="number"
                  defaultValue={bill.amount}
                  readOnly
                  name=""
                  id=""
                />
              </div>
              <div>
                <label className="text-base-200 text-[16px] md:text-[18px] font-medium font-[Inter]">
                  Username
                </label>
                <br />
                <input
                  required
                  name="name"
                  className="text-base-content text-[16px] md:text-[18px] border border-gary-300 px-2 py-1 w-full outline-primary rounded-[10px]"
                  type="text"
                  placeholder="Type your username"
                />
              </div>
              <div>
                <label className="text-base-200 text-[16px] md:text-[18px] font-medium font-[Inter]">
                  Address
                </label>
                <br />
                <input
                  required
                  name="address"
                  className="text-base-content text-[16px] md:text-[18px] border border-gary-300 px-2 py-1 w-full outline-primary rounded-[10px]"
                  type="text"
                  placeholder="Type your address"
                />
              </div>
              <div>
                <label className="text-base-200 text-[16px] md:text-[18px] font-medium font-[Inter]">
                  Phone
                </label>
                <br />
                <input
                  required
                  name="phone"
                  className="text-base-content text-[16px] md:text-[18px] border border-gary-300 px-2 py-1 w-full outline-primary rounded-[10px]"
                  type="tel"
                  placeholder="Type your phone number"
                />
                {phone ? (
                  ""
                ) : (
                  <p className="text-red-500 ">
                    Your phone number is invaild, Type a valid number
                  </p>
                )}
              </div>
              <div>
                <label className="text-base-200 text-[16px] md:text-[18px] font-medium font-[Inter]">
                  Date
                </label>
                <br />
                <input
                  name="date"
                  className="text-base-content text-[16px] md:text-[18px] border border-gary-300 px-2 py-1 w-full outline-primary rounded-[10px]"
                  type="date"
                  defaultValue={todayDate}
                  readOnly
                />
              </div>
              <div className="mt-5 text-center">
                <button
                  className=" inline-block  py-1 px-5 rounded-2xl text-center text-[18px] font-semibold font-[Inter] text-primary bg-transparent border border-primary hover:bg-primary hover:text-white duration-200 cursor-pointer"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="bg-primary text-white font-bold font-[Inter] px-3 py-1 rounded-2xl cursor-pointer">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </section>
    </>
  );
};

export default BillsDetails;

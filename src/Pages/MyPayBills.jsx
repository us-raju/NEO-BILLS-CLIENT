import React, { useEffect, useRef, useState } from "react";
import useAuth from "../hook/useAuth";
import useAxios from "../hook/useAxios";
import Swal from "sweetalert2";

const MyPayBills = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [payBills, setPayBills] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);
  const [phone, setPhone] = useState(true);
  const [todayDate, setTodayDate] = useState("");
  const payBillRef = useRef(null);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (user.email) {
      axiosInstance.get(`/pay-bills?email=${user.email}`).then((data) => {
        setPayBills(data.data);
      });
    }
  }, [axiosInstance, user?.email]);

  useEffect(() => {
    if ((payBills, length > 0)) {
      const amount = payBills.map((bill) => {
        return bill.amount;
      });
      const total = amount.reduce((acc, currentValue) => acc + currentValue, 0);
      setTotalAmount(total);
    } else {
      setTotalAmount(0);
    }
  }, [payBills]);

  // date functionlity
  useEffect(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = String(today.getFullYear());
    const formatedDate = `${year}-${month}-${day}`;
    setTodayDate(formatedDate);
  }, []);

  // validate Phone number
  const validatePhone = (phone) => {
    const regex = /^[0-9]{11}$/;
    return regex.test(phone);
  };

  const handlePayBillsForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = user.email;
    const bill_id = payBills._id;
    const amount = selected.amount;
    const username = form.name.value;
    const address = form.address.value;
    const phone = form.phone.value;
    const date = form.date.value;
    if (!validatePhone(phone)) {
      setPhone(false);
      return;
    }

    const upDateBill = {
      amount: amount,
      address: address,
      phone: phone,
      date: date,
    };

    axiosInstance
      .patch(`/pay-bills/${selected._id}`, upDateBill)
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: "Bill Update Successfull!",
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

    form.reset();
    if (payBillRef.current) {
      payBillRef.current.close();
    }
  };
  const handleUpdate = (payBill) => {
    setSelected(payBill);
    payBillRef.current.showModal();
  };
  const handleDelete = () => {};
  console.log(selected);
  return (
    <>
      <section className="w-11/12 md:w-10/12 mx-auto mt-10">
        <div className="flex justify-between items-center">
          <h2 className="text-base-200 text-2xl font-[Inter] font-bold mb-5">
            My Pay Bills
          </h2>
          <button
            type="button"
            className="border border-primary bg-primary text-white  mx-3 px-5 py-1.5 text-[18px]  font-[Inter] font-medium  rounded-2xl cursor-pointer hover:bg-transparent hover:text-primary"
          >
            Download Report
          </button>
        </div>

        <div className="mt-5">
          <div className="overflow-x-auto">
            <table className="table table-md border border-gray-300">
              <thead>
                <tr className="text-base-200 font-[Inter] font-semibold border border-gray-300">
                  <th>Username</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payBills.map((payBill) => (
                  <tr
                    key={payBill._id}
                    className="border border-gray-300 text-base-content font-[Railway] text-[16px]"
                  >
                    <th className="text-base-200 font-[Inter]">
                      {payBill.username}
                    </th>
                    <td>{payBill.email}</td>
                    <td>{payBill.amount}</td>
                    <td>{payBill.address}</td>
                    <td>{payBill.phone}</td>
                    <td>{payBill.date}</td>
                    <td>
                      <button
                        onClick={() => handleUpdate(payBill)}
                        className="mr-2 bg-primary text-white px-4 py-1.5 text-[14px]  font-[Inter] font-medium  rounded-[10px] cursor-pointer"
                      >
                        Update
                      </button>{" "}
                      <button
                        onClick={handleDelete}
                        className="mr-2 bg-red-500 text-white  px-4 py-1.5 text-[14px]  font-[Inter] font-medium  rounded-[10px] cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="text-base-200 font-[Inter] text-[16px]">
                  <th>Total Bill Paid: {payBills.length}</th>
                  <th>Total Amount: {totalAmount}</th>
                </tr>
              </tfoot>
            </table>
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
                  Phone
                </label>
                <br />
                <input
                  required
                  name="phone"
                  className="text-base-content text-[16px] md:text-[18px] border border-gary-300 px-2 py-1 w-full outline-primary rounded-[10px]"
                  defaultValue={selected.phone}
                  type="tel"
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
                  Address
                </label>
                <br />
                <input
                  required
                  name="address"
                  className="text-base-content text-[16px] md:text-[18px] border border-gary-300 px-2 py-1 w-full outline-primary rounded-[10px]"
                  type="text"
                  defaultValue={selected.address}
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
                  defaultValue={selected.amount}
                  required
                  name="amount"
                />
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
                  defaultValue={selected.date}
                />
              </div>
              <div className="mt-5 text-center">
                <button
                  className=" inline-block  py-1 px-5 rounded-2xl text-center text-[18px] font-semibold font-[Inter] text-primary bg-transparent border border-primary hover:bg-primary hover:text-white duration-200 cursor-pointer"
                  type="submit"
                >
                  Update
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

export default MyPayBills;

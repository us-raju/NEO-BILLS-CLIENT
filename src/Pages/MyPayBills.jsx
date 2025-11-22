import React, { useEffect, useRef, useState } from "react";
import useAuth from "../hook/useAuth";
import useAxios from "../hook/useAxios";
import Swal from "sweetalert2";
import { motion } from "motion/react";
import { Tooltip } from "react-tooltip";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const MyPayBills = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [payBills, setPayBills] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);
  const [phone, setPhone] = useState(true);
  const [todayDate, setTodayDate] = useState("");
  const payBillRef = useRef(null);
  const [selected, setSelected] = useState("");
  const [popup, setPopup] = useState(false);
  const [selectedBill, setSelectedBill] = useState("");
  const receiptRef = useRef();

  useEffect(() => {
    if (user.email) {
      axiosInstance.get(`/pay-bills?email=${user.email}`).then((data) => {
        setPayBills(data.data);
      });
    }
  }, [axiosInstance, user?.email]);

  useEffect(() => {
    if (payBills.length > 0) {
      const total = payBills.reduce((acc, bill) => {
        return acc + Number(bill.amount);
      }, 0);

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

    const amount = form.amount.value;

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
        setPayBills((prev) => {
          return prev.map((bill) =>
            bill._id === selected._id ? { ...bill, ...upDateBill } : bill
          );
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
  const handleDelete = (payBill) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axiosInstance.delete(`/pay-bills/${payBill._id}`).then((res) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your bill has been deleted.",
              icon: "success",
            });
          });
          setPayBills((prev) =>
            prev.filter((item) => item._id !== payBill._id)
          );
        }
      })
      .catch((err) => {
        const error = err.message;
        Swal.fire({
          icon: "error",
          text: error,
        });
      });
  };
  // download report button functionlity here
  const handleDownloadRoport = () => {
    setPopup(true);
  };

  // pdf download functionlity here
  const handleDownload =  (bill) => {
    setSelectedBill(bill);

    setTimeout(async () => {
      const receiptReferance = receiptRef.current;
      if(!receiptReferance) return
      const canvas = await html2canvas(receiptReferance, {
        scale: 2,
        useCORS: true,
      });
      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHight);
      pdf.save("receipt.pdf");
    }, 100);
  };

  // popup close functionlity here
  const closePopup = () => {
    setPopup(false);
  };

  return (
    <>
      <section className="w-11/12 md:w-10/12 mx-auto mt-10 relative">
        <title>Neobill-Pay Bills</title>
        <div className="flex justify-between">
          <div>
            <h2 className="text-base-200 text-[18px] md:text-2xl font-[Inter] font-bold mb-5">
              My Pay Bills
            </h2>
          </div>
          <div>
            <Tooltip className="z-30" id="my-tooltip"></Tooltip>
            <button
              data-tooltip-id="my-tooltip"
              data-tooltip-content={`Click to download your pay bills recipt`}
              data-tooltip-place="top"
              onClick={handleDownloadRoport}
              type="button"
              className="border border-primary bg-primary text-white mx-5 px-3 md:px-5 py-1.5 text-[16px] md:text-[18px]  font-[Inter] font-medium  rounded-2xl cursor-pointer hover:bg-transparent hover:text-primary"
            >
              Download Report
            </button>
          </div>
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
                  <th colSpan={2} className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {payBills.map((payBill) => (
                  <tr
                    key={payBill._id}
                    className="border border-gray-300 text-base-content font-[Railway] text-[12px] md:text-[16px]"
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
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={`Click to update your bills`}
                        data-tooltip-place="top"
                        onClick={() => handleUpdate(payBill)}
                        className="mr-2 bg-primary text-white px-4 py-1.5 text-[14px]  font-[Inter] font-medium  rounded-[10px] cursor-pointer"
                      >
                        Update
                      </button>{" "}
                    </td>
                    <td>
                      <button
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={`Click to delete your bills`}
                        data-tooltip-place="top"
                        onClick={() => handleDelete(payBill)}
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
              Update your data
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

        {/* bill download table */}
        {popup ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20"
          >
            <div className="bg-white w-[300px] md:w-[600px] px-5 py-5 rounded-2xl absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2">
              <table className="text-base-200 w-full font-[Inter] border border-gray-300 border-collapse rounded-[10px]">
                <thead className=" text-[10px] md:text-[16px] border border-gray-300 rounded-[10px] font-medium md:font-bold ">
                  <tr className="flex justify-evenly items-center py-1 md:py-2 ">
                    <th>Username</th>
                    <th>Bill Date</th>
                    <th>Bill Amount</th>
                    <th>
                      <button>Download</button>
                    </th>
                  </tr>
                </thead>
                <tbody className="border text-[10px] md:text-[16px] border-gray-300 rounded-[10px] font-medium md:font-bold ">
                  {payBills.map((bill) => (
                    <tr
                      key={bill._id}
                      className="flex justify-evenly items-center py-1 md:py-2 border-b border-gray-300"
                    >
                      <th>{bill.username}</th>
                      <th>{bill.date}</th>
                      <th>{bill.amount}</th>
                      <th className="bg-transparent border border-primary text-primary text-[10px] md:text-[18px] font-medium md:font-bold font-[Inter] py-1 px-1 md:px-3 rounded-[10px] hover:bg-primary hover:text-white duration-300 cursor-pointer">
                        <button className="cursor-pointer" onClick={() => handleDownload(bill)}>
                          Download
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="w-full flex justify-end  bg-transparent text-primary text-[10px] md:text-[18px] font-medium md:font-bold font-[Inter] mt-5">
                <button
                  onClick={closePopup}
                  className="py-1 px-1 md:px-3 rounded-[10px] border border-primary hover:bg-primary hover:text-white duration-300 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          ""
        )}
      </section>

      <section className="w-11/12 md:w-10/12 mx-auto mt-10 opacity-0">
        <div
          ref={receiptRef}
          className="receipt_box w-[595px] h-[842px] p-10 bg-[#FFF5CC] pointer-events-none fixed"
        >
          <div className="receipt_header mb-5">
            <h2 className="text-[18px] md:text-[30px] font-bold font-[Inter] text-[#3b82f6] text-center">
              NEO BILLS
            </h2>
            <h3 className="text-[16px] md:text-[20px] font-semibold font-[Inter] text-[#1e293b] text-center">
              Payment Receipt
            </h3>
          </div>
          <div className="userInfo mb-5">
            <h3 className="text-[16px] md:text-[20px] font-semibold font-[Inter] text-[#1e293b] mb-2">
              User Information:
            </h3>
            <div className="flex items-center">
              <h4 className="text-14px md:text-[18px] text-[#475569] font-[Railway] mr-1">
                Username:
              </h4>
              <p>{selectedBill.username}</p>
            </div>
            <div className="flex items-center">
              <h4 className="text-14px md:text-[18px] text-[#475569] font-[Railway] mr-1">
                Email:
              </h4>
              <p>{selectedBill.email}</p>
            </div>
          </div>
          <div className="paymentDetails mb-5">
            <h3 className="text-[16px] md:text-[20px] font-semibold font-[Inter] text-[#1e293b] mb-2">
              Payment Details:
            </h3>
            <div className="flex items-center ">
              <h4 className="text-14px md:text-[18px] text-[#475569] font-[Railway] mr-1">
                Bill ID:
              </h4>
              <p>{selectedBill.bill_id}</p>
            </div>
            <div className="flex items-center">
              <h4 className="text-14px md:text-[18px] text-[#475569] font-[Railway] mr-1">
                Paid Date:
              </h4>
              <p>{selectedBill.date}</p>
            </div>
            <div className="flex items-center">
              <h4 className="text-14px md:text-[18px] text-[#475569] font-[Railway] mr-1">
                Amount:
              </h4>
              <p>{selectedBill.amount}</p>
            </div>
            <div className="flex items-center">
              <h4 className="text-14px md:text-[18px] text-[#475569]t font-[Railway] mr-1">
                Total Amount:
              </h4>
              <p>{selectedBill.amount}</p>
            </div>
          </div>
          <div className="receipt_footer">
            <div className="flex items-baseline">
              <h3 className="text-[16px] md:text-[20px] font-semibold font-[Inter] text-[#1e293b] mb-2 mr-1">
                Payment Status:
              </h3>
              <p className="flex items-center text-[#008000] font-bold">
                PAID <IoCheckmarkCircleOutline size={20} className="mt-1"/>
              </p>
            </div>
            <h4 className="text-14px md:text-[18px] text-[#008000] font-[Railway] font-bold">
              Thank you for your payment!
            </h4>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyPayBills;

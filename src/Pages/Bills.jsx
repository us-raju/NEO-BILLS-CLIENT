import React, { useEffect, useState } from "react";
import useAxios from "../hook/useAxios";
import Loading from "../Loading/Loading";
import { Link, useLocation } from "react-router";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const params = new URLSearchParams(location.search)
  const selectedCatagory = params.get("catagory")
  const [category, setCategory] = useState(selectedCatagory||"");
  console.log(selectedCatagory)
  const axiosInstance = useAxios();
  useEffect(() => {
    axiosInstance.get("/bills").then((data) => {
      setBills(data.data);
    });
  }, [axiosInstance]);

  if (!bills) {
    return <Loading></Loading>;
  }

  // search functionality here
  const filtfilteredBills = bills.filter((bill) => {
    // for search
    const matchesSearch =
      bill.title.toLowerCase().includes(search.toLowerCase()) ||
      bill.category.toLowerCase().includes(search.toLowerCase()) ||
      bill.amount
        .toString()
        .replace(/[^0-9]/g, "")
        .includes(search);

    // for select categroy
    const matchesCategory = category === "" || bill.category === category;
    return matchesSearch && matchesCategory;
  });


  return (
    <>
      <section className="w-11/12 md:w-10/12 mx-auto">
      <title>Neobill-Bill</title>
        <div className="lg:mt-10">
          <h2 className="text-base-200 text-2xl font-[Inter] font-bold mb-5">
            Bills
          </h2>
          <div className="flex items-center justify-between mb-5">
            <div className="w-50%">
              <label className="input border border-gray-300">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input
                  className="text-[18px] text-base-content"
                  type="search"
                  onChange={(e) => setSearch(e.target.value)}
                  required
                  placeholder="Search"
                />
              </label>
            </div>
            <div className="w-30% text-base-200 font-bold">
              <fieldset className="fieldset">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="select border border-gray-300"
                >
                  <option disabled={false} value="">Category</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Water">Water</option>
                  <option value="Gas">Gas</option>
                  <option value="Internet">Internet</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Cable TV">Cable TV</option>
                  <option value="Waste Management">Waste Management</option>
                  <option value="Environmental">Environmental</option>
                </select>
              </fieldset>
            </div>
          </div>

          {/* bills card here  */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-5">
            {filtfilteredBills.map((data) => (
              <div
                key={data._id}
                className={`bg-base-300 p-10 shadow-lg rounded-2xl flex flex-col justify-between border border-gray-300`}
              >
                <div className="mb-5 flex items-center">
                  <div>
                    <img
                      className="w-[60px] h-[60px] lg:w-[100px] lg:h-[100px]"
                      src={data.image}
                      alt=""
                    />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-base-200 text-[18px] lg:text-[20px] font-semibold font-[Inter]">
                      {data.title}
                    </h3>
                    <h4 className="text-base-200 text-[16px] lg: font-medium font-[Inter]">
                      {data.category}
                    </h4>
                    <p className="text-[16px] text-base-content my-2">
                      {data.location}
                    </p>
                    <p className="text-[16px] text-base-content">{data.date}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[16px] text-primary font-bold my-2 text-center  px-7 py-1">
                    Amount: {data.amount}
                  </p>
                </div>
                <div>
                  <div>
                    <Link to={`/bills-details/${data._id}`} className="w-full inline-block  py-2 rounded-2xl text-center text-[18px] font-semibold font-[Inter] text-primary bg-transparent border border-primary hover:bg-primary hover:text-white duration-200">
                      See Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Bills;

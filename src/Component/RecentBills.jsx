import React, { useEffect, useState } from "react";
import useAxios from "../hook/useAxios";
import { Link } from "react-router";
import Loading from "../Loading/Loading";

const RecentBills = () => {
  const [recentData, setRecentData] = useState("");
  const axiosInstance = useAxios();
  useEffect(() => {
    axiosInstance.get("/bills-limit").then((data) => {
      setRecentData(data.data);
    });
  }, [axiosInstance]);

  if (!recentData) {
    return <Loading></Loading>;
  }
  return (
    <>
      <div>
        <h2 className="text-base-100 text-2xl font-[Inter] font-bold mb-5">
          Recent Bills
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-5">
          {recentData.map((data) => (
            <div
              key={data._id}
              className={`bg-base-300 p-10 shadow-lg rounded-2xl flex flex-col justify-between`}
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
                  <h3 className="text-base-100 text-[18px] lg:text-[20px] font-semibold font-[Inter]">
                    {data.title}
                  </h3>
                  <h4 className="text-base-100 text-[16px] lg: font-medium font-[Inter]">
                    {data.category}
                  </h4>
                  <p className="text-[16px] my-2">{data.location}</p>
                  <p className="text-[16px]">{data.date}</p>
                </div>
              </div>
              <div>
                <Link className="w-full inline-block  py-2 rounded-2xl text-center text-[18px] font-semibold font-[Inter] text-primary bg-transparent border border-primary hover:bg-primary hover:text-white duration-200">
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecentBills;

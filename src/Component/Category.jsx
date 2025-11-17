import React, { useEffect, useState } from "react";
import useAxios from "../hook/useAxios";
import Loading from "../Loading/Loading";

const Category = () => {
  const [categoryData, setCategoryData] = useState("");
  const axiosInstance = useAxios();
  useEffect(() => {
    axiosInstance.get("/bills").then((data) => {
      const categoryData = data.data;
      setCategoryData(categoryData);
    });
  }, []);
  if (!categoryData) {
    return <Loading></Loading>;
  }
  return (
    <>
      <div>
        <h2 className="text-base-100 text-2xl font-[Inter] font-bold mb-5">
          Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categoryData.map((data) => (
            <div className="bg-base-300 text-center p-5 shadow-lg rounded-2xl hover:border hover:border-primary cursor-pointer duration-300" key={data._id}>
              <div className="mb-3">
                <img
                  className="w-[45px] h-[45px] mx-auto"
                  src={data.image}
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-base-100 text-[18px] font-semibold font-[Inter]">{data.category}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;

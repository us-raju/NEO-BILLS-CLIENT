import React from "react";
import { motion } from "motion/react";
const Loading = () => {
  return (
   <div className='min-h-screen flex justify-center items-center'>

     <motion.h1
      className="text-4xl font-bold text-blue-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ repeat: Infinity, repeatType: "mirror", duration: 1 }}
    >
      Loading...
    </motion.h1>
   </div>
  );
};

export default Loading;

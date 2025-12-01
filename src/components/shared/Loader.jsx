import React from "react";
import { FadeLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <FadeLoader color="#4c40ed" />
    </div>
  );
};

export default Loader;

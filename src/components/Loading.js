import React from "react";
import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div className="flex justify-center items-center  p-10  ">
      <CircularProgress />
    </div>
  );
};

export default Loading;

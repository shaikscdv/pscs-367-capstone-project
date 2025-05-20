import React from "react";
import { Link } from "react-router-dom";

export default function UnauthorizedMessage() {
  return (
    <Link to="/">
      <h1 className="flex items-center justify-center text-4xl font-bold text-darkPrimary pt-20 ">
        Unauthorized access! Please Login in 
      </h1>
    </Link>
  );
}

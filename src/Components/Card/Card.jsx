import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoTriangleRight } from "react-icons/go";

const Card = ({ bgColor, icon, title, text, link, icon2 }) => {

  return (
    <>
      <Link to={link}>
        <div
          className={`relative flex h-[5rem] w-[25rem] flex-col rounded-md border-l-8 ${bgColor === "darkPrimary" ? "border-darkPrimary" : "border-mintPrimary"} bg-white p-5 shadow-lg duration-300 ease-in-out hover:bg-blue-50 hover:shadow-xl`}
          style={{ zIndex: 1 }}
        >
          <div>
            <div className="flex items-center justify-start gap-2 font-bold">
              <GoTriangleRight /> {title}
            </div>
            <div className="absolute right-5 top-7 text-[1.7rem]">{icon}</div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;

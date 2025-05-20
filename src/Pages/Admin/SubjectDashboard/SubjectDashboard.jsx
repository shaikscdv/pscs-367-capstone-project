import React from 'react'
import Card from '../../../Components/Card/Card';
import SideNav from '../../../Components/SideNav/SideNav';
import { TbBook2 } from "react-icons/tb";
import { RiBookletLine } from "react-icons/ri";
import { IoArrowForwardSharp } from "react-icons/io5";

export default function SubjectDashboard() {
    return (
      <div className="flex h-screen">
        <div className="w-1/6">
          <SideNav />
        </div>
        <div className="z-10 flex h-auto w-5/6 px-3 pt-20">
          <div className="grid grid-cols-2 gap-32">
            <Card
              link="/createSubject"
              bgColor="mintPrimary"
              icon={<TbBook2 />}
              icon2={<IoArrowForwardSharp />}
              title="New Subject"
              text={["Add New Subject", "Add Subject Details"]}
            />
            <Card
              link="/manageSubject"
              bgColor="mintPrimary"
              icon={<RiBookletLine />}
              icon2={<IoArrowForwardSharp />}
              title="Manage Subject"
              text={["Update Subject Details", "Delete Subject Details"]}
            />
          </div>
        </div>
      </div>
    );
}

import SideNav from "../../../Components/SideNav/SideNav";
import Card from "../../../Components/Card/Card";
import { PiAddressBook } from "react-icons/pi";
import { LiaCalendarWeekSolid } from "react-icons/lia";
import { IoArrowForwardSharp } from "react-icons/io5";
import { MdOutlineGroupAdd } from "react-icons/md";
import { TbBook2 } from "react-icons/tb";
import { RiBookletLine } from "react-icons/ri";
import { GoPersonAdd } from "react-icons/go";
import { BsPersonVideo2 } from "react-icons/bs";
import HomePageProfile from "../../../Components/Profile/HomePageProfile";

export default function AdminHomePage() {
  document.body.style.overflow = "hidden";
  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <SideNav />
      </div>
      <div className="ml-20 flex h-auto w-full px-3 pt-[3rem]">
        <div className="flex w-1/2 flex-col gap-y-6">
          <Card
            link="/createTimetable"
            bgColor="darkPrimary"
            icon={<LiaCalendarWeekSolid />}
            icon2={<IoArrowForwardSharp />}
            title="Create Timetable"
            text={["Update Subject Details", "Delete Subject Details"]}
          />
          <Card
            link="/createTeacher"
            bgColor="darkPrimary"
            icon={<MdOutlineGroupAdd />}
            icon2={<IoArrowForwardSharp />}
            title="New Teacher"
            text={["Add New Teacher", "Create New Teacher Credentials"]}
          />
          <Card
            link="/manageTeacher"
            bgColor="darkPrimary"
            icon={<PiAddressBook />}
            icon2={<IoArrowForwardSharp />}
            title="Manage Teacher"
            text={["Update Teacher Details", "Delete Teacher Details"]}
          />
          <Card
            link="/createStudent"
            bgColor="darkPrimary"
            icon={<GoPersonAdd />}
            icon2={<IoArrowForwardSharp />}
            title="New Student"
            text={["Add New Student", "Add Student Details"]}
          />
          <Card
            link="/manageStudent"
            bgColor="darkPrimary"
            icon={<BsPersonVideo2 />}
            icon2={<IoArrowForwardSharp />}
            title="Manage Student"
            text={["Update Subject Details", "Delete Subject Details"]}
          />

          <Card
            link="/createSubject"
            bgColor="darkPrimary"
            icon={<TbBook2 />}
            icon2={<IoArrowForwardSharp />}
            title="New Subject"
            text={["Add New Subject", "Add Subject Details"]}
          />
          <Card
            link="/manageSubject"
            bgColor="darkPrimary"
            icon={<RiBookletLine />}
            icon2={<IoArrowForwardSharp />}
            title="Manage Subject"
            text={["Update Subject Details", "Delete Subject Details"]}
          />
        </div>
        <div className="flex w-1/2 justify-between">
          <HomePageProfile />
        </div>
      </div>
    </div>
  );
}

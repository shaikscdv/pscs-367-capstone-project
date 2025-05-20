import SideNav from "../../../Components/SideNav/SideNav";
import { IoArrowForwardSharp } from "react-icons/io5";
import Card from "../../../Components/Card/Card";
import { MdOutlineGroupAdd } from "react-icons/md";
import { PiAddressBook } from "react-icons/pi";

export default function TeacherDashboard() {
  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <SideNav />
      </div>
      <div className="z-10 flex h-auto w-5/6 px-3 pt-20">
        <div className="grid grid-cols-2 gap-32">
          <Card
            link="/createTeacher"
            bgColor="mintPrimary"
            icon={<MdOutlineGroupAdd />}
            icon2={<IoArrowForwardSharp />}
            title="New Teacher"
            text={["Add New Teacher", "Create New Teacher Credentials"]}
          />
          <Card
            link="/manageTeacher"
            bgColor="mintPrimary"
            icon={<PiAddressBook />}
            icon2={<IoArrowForwardSharp />}
            title="Manage Teacher"
            text={["Update Teacher Details", "Delete Teacher Details"]}
          />
        </div>
      </div>
    </div>
  );
}

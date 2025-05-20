import { IoArrowForwardSharp } from "react-icons/io5";
import { BsPersonVideo2 } from "react-icons/bs";
import { GoPersonAdd } from "react-icons/go";
import Card from "../../../Components/Card/Card";
import SideNav from "../../../Components/SideNav/SideNav";

export default function StudentDashboard() {
   return (
     <div className="flex h-screen">
       <div className="w-1/6">
         <SideNav />
       </div>
       <div className="z-10 flex h-auto w-5/6 px-3 pt-20">
         <div className="grid grid-cols-2 gap-32">
           <Card
             link="/createStudent"
             bgColor="mintPrimary"
             icon={<GoPersonAdd />}
             icon2={<IoArrowForwardSharp />}
             title="New Student"
             text={["Add New Student", "Add Student Details"]}
           />
           <Card
             link="/manageStudent"
             bgColor="mintPrimary"
             icon={<BsPersonVideo2 />}
             icon2={<IoArrowForwardSharp />}
             title="Manage Student"
             text={["Update Subject Details", "Delete Subject Details"]}
           />
         </div>
       </div>
     </div>
   );
}

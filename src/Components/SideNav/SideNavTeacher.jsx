import { LuHome } from "react-icons/lu";
import { LiaFileUploadSolid } from "react-icons/lia";
import { TbHexagonLetterA } from "react-icons/tb";
import { PiChatsFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { MdPersonOutline } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { BsFiletypeCsv } from "react-icons/bs";

export default function SideNavTeacher() {
  return (
    <>
      <div className="fixed left-0 top-0 mt-[3.8rem] flex h-full w-64 flex-col border-r-2 border-black bg-gray-800 shadow-md">
        <div className="overflow-y flex-grow overflow-x-hidden">
          <ul className="flex flex-col space-y-6 py-4">
            <li className="px-5">
              <div className="flex h-8 flex-row items-center">
                <div className="text-md font-light tracking-wide text-white ">
                  Menu
                </div>
              </div>
            </li>
            <li>
              <Link
                to="/teacher"
                className="relative flex h-11 flex-row items-center border-l-8 border-transparent pr-6 text-white duration-300 hover:border-primary hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
              >
                <span className="ml-4 inline-flex items-center justify-center text-2xl">
                  <LuHome />
                </span>
                <span className="text-md ml-2 truncate tracking-wide">
                  Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/timetable"
                className="relative flex h-11 flex-row items-center border-l-8 border-transparent pr-6 text-white duration-300 hover:border-primary hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
              >
                <span className="ml-4 inline-flex items-center justify-center text-2xl">
                  <TbReport />
                </span>
                <span className="text-md ml-2 truncate tracking-wide">
                  Mark Attendance
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/attendanceReport"
                className="relative flex h-11 flex-row items-center border-l-8 border-transparent pr-6 text-white duration-300 hover:border-primary hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
              >
                <span className="ml-4 inline-flex items-center justify-center text-2xl">
                  <TbHexagonLetterA />
                </span>
                <span className="text-md ml-2 truncate tracking-wide">
                  Attendance Report
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/marks"
                className="relative flex h-11 flex-row items-center border-l-8 border-transparent pr-6 text-white duration-300 hover:border-primary hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
              >
                <span className="ml-4 inline-flex items-center justify-center text-2xl">
                  <LiaFileUploadSolid />
                </span>
                <span className="text-md ml-2 truncate tracking-wide">
                  Upload Marks
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/marksReport"
                className="relative flex h-11 flex-row items-center border-l-8 border-transparent pr-6 text-white duration-300 hover:border-primary hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
              >
                <span className="ml-4 inline-flex items-center justify-center text-2xl">
                  <BsFiletypeCsv />
                </span>
                <span className="text-md ml-2 truncate tracking-wide">
                  Marks Report
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/discussionForum"
                className="relative flex h-11 flex-row items-center border-l-8 border-transparent pr-6 text-white duration-300 hover:border-primary hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
              >
                <span className="ml-4 inline-flex items-center justify-center text-2xl">
                  <PiChatsFill />
                </span>
                <span className="text-md ml-2 truncate tracking-wide">
                  Discussion Forum
                </span>
              </Link>
            </li>

            <li className="px-5">
              <div className="flex h-8 flex-row items-center">
                <div className="text-md font-light tracking-wide text-white">
                  Settings
                </div>
              </div>
            </li>
            <li>
              <Link
                to="/profile"
                className="relative flex h-11 flex-row items-center border-l-8 border-transparent pr-6 text-white duration-300 hover:border-primary hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
              >
                <span className="ml-4 inline-flex items-center justify-center text-2xl">
                  <MdPersonOutline />
                </span>
                <span className="text-md ml-2 truncate tracking-wide">
                  Profile
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

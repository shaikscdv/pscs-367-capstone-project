import React from "react";
import { BsFiletypeCsv } from "react-icons/bs";
import { IoArrowForwardSharp } from "react-icons/io5";
import { LiaFileUploadSolid } from "react-icons/lia";
import { TbHexagonLetterA, TbReport } from "react-icons/tb";
import { PiChatsFill } from "react-icons/pi";
import Card from "../../../Components/Card/Card";
import SideNavTeacher from "../../../Components/SideNav/SideNavTeacher";
import HomePageProfile from "../../../Components/Profile/HomePageProfile";

export default function TeacherHomePage() {
  document.body.style.overflow = "hidden";

  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <SideNavTeacher />
      </div>
      <div className="ml-20 flex h-auto w-full px-3 pt-[6rem]">
        <div className="mt-5 flex w-1/2 flex-col gap-y-10">
          <Card
            link="/timetable"
            bgColor="darkPrimary"
            icon={<TbHexagonLetterA />}
            icon2={<IoArrowForwardSharp />}
            title="Attendance"
            text={["Mark student attendance"]}
          />
          <Card
            link="/attendanceReport"
            bgColor="darkPrimary"
            icon={<TbReport />}
            icon2={<IoArrowForwardSharp />}
            title="Attendance Report"
            text={["Download Attendace Report"]}
          />
          <Card
            link="/marks"
            bgColor="darkPrimary"
            icon={<LiaFileUploadSolid />}
            icon2={<IoArrowForwardSharp />}
            title="Upload Marks"
            text={["Upload subject Marks"]}
          />
          <Card
            link="/marksReport"
            bgColor="darkPrimary"
            icon={<BsFiletypeCsv />}
            icon2={<IoArrowForwardSharp />}
            title="Marks Report"
            text={["Download Marks Report"]}
          />
          <Card
            link="/discussionForum"
            bgColor="darkPrimary"
            icon={<PiChatsFill />}
            icon2={<IoArrowForwardSharp />}
            title="Discussion forum"
            text={[
              "Discuss your doubt with teacher",
              "One to One doubt solving",
            ]}
          />
        </div>
        <div className="flex w-1/2 justify-between">
          <HomePageProfile />
        </div>
      </div>
    </div>
  );
}

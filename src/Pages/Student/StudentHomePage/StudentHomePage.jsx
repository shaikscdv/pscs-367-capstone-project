import React from "react";
import { IoArrowForwardSharp } from "react-icons/io5";
import { LiaFileUploadSolid } from "react-icons/lia";
import { TbHexagonLetterA } from "react-icons/tb";
import { PiChatsFill } from "react-icons/pi";
import Card from "../../../Components/Card/Card";
import SideNavStudent from "../../../Components/SideNav/SideNavStudent";
import HomePageProfile from "../../../Components/Profile/HomePageProfile";

export default function StudentHomePage() {
  document.body.style.overflow = "hidden";
  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <SideNavStudent />
      </div>
      <div className="ml-20 flex h-auto w-full px-3 pt-[6rem]">
        <div className="mt-10 flex w-1/2 flex-col gap-y-10">
          <Card
            link="/viewAttendance"
            bgColor="darkPrimary"
            icon={<TbHexagonLetterA />}
            icon2={<IoArrowForwardSharp />}
            title="View Attendance"
            text={["View your attendance"]}
          />
          <Card
            link="/viewMarks"
            bgColor="darkPrimary"
            icon={<LiaFileUploadSolid />}
            icon2={<IoArrowForwardSharp />}
            title="View Marks"
            text={["View your Marks", "Marks of each Subject"]}
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

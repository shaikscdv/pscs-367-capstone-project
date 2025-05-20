import React, { useEffect, useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import SideNav from "../SideNav/SideNav";
import SideNavStudent from "../SideNav/SideNavStudent";
import SideNavTeacher from "../SideNav/SideNavTeacher";

export default function HomePageProfile() {
  const { user } = useAuth();
  const [userDetail, setUserDetails] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    userType: user ? user.UserType : "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setUserDetails(user);
    }
  }, [user]);
  console.log(userDetail);

  return (
    <div className="flex">
      <div className="mr-5 flex flex-col">
        <form className="flex flex-col items-center justify-center space-y-5 p-3 text-lg">
          {userDetail.userType === "admin" && (
            <>
              <div>
                <img className="h-[14rem] " src="/Admin_Avatar.png"></img>
              </div>
              <div className="flex flex-row items-center">
                <h1 className="w-[100px] text-center text-lg font-semibold text-black">
                  Name :
                </h1>
                <input
                  className="ml-2 rounded-sm  border-none bg-gray-50 p-2 shadow-sm outline-none"
                  type="text"
                  name="name"
                  readOnly
                  value={userDetail.name}
                />
              </div>
              <div className="flex flex-row items-center">
                <h1 className="w-[100px] text-center text-lg font-semibold text-black">
                  Email :
                </h1>
                <input
                  className="ml-2 rounded-sm  border-none bg-gray-50 p-2 shadow-sm outline-none"
                  type="email"
                  name="email"
                  readOnly
                  value={userDetail.email}
                />
              </div>
            </>
          )}
          {userDetail.userType === "teacher" && (
            <>
              <div>
                <img className="h-[14rem] " src="/teacher_avatar.png"></img>
              </div>
              <div className="flex flex-row items-center">
                <h1 className="w-[100px] text-center text-lg font-semibold text-black">
                  Name :
                </h1>
                <input
                  className="ml-2 rounded-sm  border-none bg-gray-50 p-2 shadow-sm outline-none"
                  type="text"
                  name="name"
                  readOnly
                  value={userDetail.name}
                />
              </div>
              <div className="flex flex-row items-center">
                <h1 className="w-[100px] text-center text-lg font-semibold text-black">
                  Email :
                </h1>
                <input
                  className="ml-2 rounded-sm  border-none bg-gray-50 p-2 shadow-sm outline-none"
                  type="email"
                  name="email"
                  readOnly
                  value={userDetail.email}
                />
              </div>
            </>
          )}
          {userDetail.userType === "student" && (
            <>
              <div>
                <img className="h-[14rem] " src="/student_avatar.png"></img>
              </div>
              <div className="flex flex-row items-center">
                <h1 className="w-[100px] text-center text-lg font-semibold text-black">
                  Name :
                </h1>
                <input
                  className="ml-2 rounded-sm  border-none bg-gray-50 p-2 shadow-sm outline-none"
                  type="text"
                  name="name"
                  readOnly
                  value={userDetail.name}
                />
              </div>
              <div className="flex flex-row items-center">
                <h1 className="w-[100px] text-center text-lg font-semibold text-black">
                  Email :
                </h1>
                <input
                  className="ml-2 rounded-sm  border-none bg-gray-50 p-2 shadow-sm outline-none"
                  type="email"
                  name="email"
                  readOnly
                  value={userDetail.email}
                />
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

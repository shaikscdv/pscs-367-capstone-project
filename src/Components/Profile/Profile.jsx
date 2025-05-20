import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../Hooks/useAuth";
import { updateProfile } from "../../Services/profileServices";
import SideNav from "../SideNav/SideNav";
import SideNavStudent from "../SideNav/SideNavStudent";
import SideNavTeacher from "../SideNav/SideNavTeacher";

export default function Profile() {
  const { user, UpdateStudent } = useAuth();
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUserDetail) => ({
      ...prevUserDetail,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isPasswordUpdated =
        userDetail.password && userDetail.password.trim().length > 0;

      if (
        isPasswordUpdated &&
        userDetail.password !== userDetail.confirmPassword
      ) {
        toast.error("Password must match!");
        return;
      }

      let updatePayload = { ...userDetail };

      if (isPasswordUpdated) {
        updatePayload = {
          ...updatePayload,
          password: userDetail.password,
        };
      } else {
        delete updatePayload.password; // Remove password from payload if not updated
        delete updatePayload.confirmPassword; // Remove confirmPassword too
      }

      console.log(updatePayload);

      const updatedProfile = await updateProfile(updatePayload);

      if (updatedProfile && updatedProfile.update === true) {
        setUserDetails((prevUserDetail) => ({
          ...prevUserDetail,
          name: updatedProfile.name,
          email: updatedProfile.email,
          // Update other fields if necessary
        }));
        toast.success("User details updated successfully!");
      } else {
        console.error("Error updating user details.");
        toast.error("Error updating user details. Please try again later.");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("Error updating user details. Please try again later.");
    }
  };

  console.log(userDetail);

  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        {user && user.userType === "admin" ? (
          <SideNav />
        ) : user && user.userType === "teacher" ? (
          <SideNavTeacher />
        ) : (
          <SideNavStudent />
        )}
      </div>
      <div className="mr-5 flex w-5/6 flex-col pt-16">
        <div className="mb-12">
          <h1 className="mb-5 text-center text-3xl font-bold">
            🙋🏻 Your Profile
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center space-y-5 p-3 text-lg"
        >
          <div className="flex flex-row items-center">
            <h1 className="w-[100px] text-center text-lg font-semibold text-black">
              Name :
            </h1>
            <input
              className="ml-2 rounded-sm border bg-gray-50 p-2 shadow-sm hover:bg-white hover:shadow-inner"
              type="text"
              name="name"
              value={userDetail.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-row items-center">
            <h1 className="w-[100px] text-center text-lg font-semibold text-black">
              Email :
            </h1>
            <input
              className="ml-2 rounded-sm border bg-gray-50 p-2 shadow-sm hover:bg-white hover:shadow-inner"
              type="email"
              name="email"
              value={userDetail.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-row items-center">
            <h1 className="w-[100px] text-center text-lg font-semibold text-black">
              Password :
            </h1>
            <input
              className="ml-2 rounded-sm border bg-gray-50 p-2 shadow-sm hover:bg-white hover:shadow-inner"
              type="password"
              name="password"
              placeholder="Enter New Password"
              value={userDetail.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="mr-20 flex flex-row items-center">
            <h1 className="w-[180px] text-center text-lg font-semibold text-black">
              Confirm Password :
            </h1>
            <input
              className="ml-2 rounded-sm border bg-gray-50 p-2 shadow-sm hover:bg-white hover:shadow-inner"
              type="password"
              name="confirmPassword"
              placeholder="Enter New Password Again"
              value={userDetail.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="hover: rounded bg-blue-500 px-4 py-2 font-bold text-white duration-300 hover:rounded-full hover:bg-blue-100 hover:text-black"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

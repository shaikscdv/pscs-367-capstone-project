import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import SideNav from "../../../Components/SideNav/SideNav";
import { getAStudent, updateAStudent } from "../../../Services/studentServices";


export default function UpdateStudent() {
  const { id } = useParams();
  const [studentData, setStudentData] = useState({
    email: "",
    password: "",
    userType: "student",
    name: "",
    confirmPassword: "",
    CurrentSemester: 1,
  });

 const handleInputChange = (key, value) => {
   if (key === "semesterNumber") {
     setStudentData((prevData) => ({
       ...prevData,
       CurrentSemester: parseInt(value), // Convert value to number
     }));
   } else {
     setStudentData((prevData) => ({ ...prevData, [key]: value }));
   }
 };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseStudent = await getAStudent(id);
        console.log("A Student ==> ", responseStudent);
        setStudentData({
          name: responseStudent.name || "",
          email: responseStudent.email || "",
          CurrentSemester: responseStudent.CurrentSemester.semesterNumber || "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        toast.error("Some error occured ! , please try again!");
        console.log("Get a Student error ", error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", studentData);
    try {
      const isPasswordUpdated = studentData.password.trim().length > 0;

      if (
        isPasswordUpdated &&
        studentData.password !== studentData.confirmPassword
      ) {
        toast.error("Password must match");
        return;
      }

      ///password change thayu hoi toj send karu nakar nhi
      const updatePayload = isPasswordUpdated
        ? { ...studentData, password: studentData.password }
        : { ...studentData, password: undefined };

      const updatedStudent = await updateAStudent(id, updatePayload);
      console.log("Update teacher", updatedStudent);

      if (updatedStudent.success === true) {
        toast.success(updatedStudent.message);
      } else {
        toast.error(updatedStudent.message);
      }
    } catch (error) {
      toast.error("Please try again");
      console.log("Teacher create error frontend", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="lg:w-1/6">
        <SideNav />
      </div>
      <div className="z-10 mt-5 flex w-full flex-col overflow-auto px-3 pt-10 lg:w-5/6  lg:flex-row">
        <div className="mx-auto w-full lg:w-3/4 xl:w-full">
          <section className="w-full py-1">
            <div className="mx-auto w-full px-4 lg:w-full">
              <div className="bg-blueGray-100 relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 shadow-lg">
                <div className="mb-5 rounded-t border-b-2 border-gray-500 bg-gray-50 px-5 py-3 md:mb-6">
                  <div className="flex items-center justify-between text-center">
                    <h6 className="text-blueGray-700 text-xl font-bold">
                      🧑🏻‍🎓 Update Student
                    </h6>
                    <button
                      onClick={handleSubmit}
                      className="text-md rounded  px-4 py-2 font-bold uppercase text-white shadow outline-none transition-all  duration-200 ease-linear hover:rounded-full hover:bg-red-100 hover:text-black hover:shadow-md focus:outline-none active:bg-red-600 bg-red-500"
                      type="submit"
                    >
                      Update
                    </button>
                  </div>
                </div>
                <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                  <form>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                      <div className="mb-4">
                        <label
                          className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                          htmlFor="firstName"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          value={studentData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="Enter Teacher's First Name"
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-800 shadow focus:outline-none focus:ring"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                          htmlFor="email"
                        >
                          Email address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={studentData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="teacher@gmail.com"
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-800 shadow focus:outline-none focus:ring"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                          Semester
                        </label>
                        <select
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow focus:outline-none focus:ring"
                          value={studentData.CurrentSemester}
                          onChange={
                            (e) =>
                              handleInputChange(
                                "semesterNumber",
                                e.target.value,
                              ) // Correct key here
                          }
                        >
                          <option value="" disabled>
                            Choose Semester
                          </option>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                            <option key={semester} value={semester}>
                              Semester {semester}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <hr className="border-b-1 border-blueGray-300 my-6" />

                    {/* Credentials */}
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                      <div className="mb-4">
                        <label
                          className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          value={studentData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          placeholder="Enter any password"
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow focus:outline-none focus:ring"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                          htmlFor="confirmPassword"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          value={studentData.confirmPassword}
                          onChange={(e) =>
                            handleInputChange("confirmPassword", e.target.value)
                          }
                          placeholder="Password must match"
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow focus:outline-none focus:ring"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

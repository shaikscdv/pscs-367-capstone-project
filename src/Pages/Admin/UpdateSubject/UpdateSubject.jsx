import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import SideNav from "../../../Components/SideNav/SideNav";
import { getASubject, updateSubject } from "../../../Services/subjectServices";

export default function UpdateSubject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subjectData, setSubjectData] = useState({
    subjectName: "",
    subjectNumber: "",
    semesterNumber: "",
    type: "", // New field for subject type
  });

  const handleInputChange = (key, value) => {
    setSubjectData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", subjectData);
    try {
      const responseSubject = await updateSubject(id, subjectData);
      console.log(responseSubject);
      if (responseSubject.success === true) {
        toast.success("Subject updated successfully");
        navigate("/manageSubject");
      } else {
        toast.error(responseSubject.message);
      }
    } catch (error) {
      toast.error("Please try again");
      console.log("Teacher create error frontend", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseSubject = await getASubject(id);
        console.log("A subject ==> ", responseSubject);
        setSubjectData({
          subjectName: responseSubject.subjectName || "",
          subjectNumber: responseSubject.subjectNumber || "",
          semesterNumber: responseSubject.semesterNumber || "",
          subjectType: responseSubject.type || "", // Set subject type from API response
        });
      } catch (error) {
        toast.error("Some error occured ! , please try again!");
        console.log("Get a Teacher error ", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="lg:w-1/6">
        <SideNav />
      </div>
      <div className="z-10 mt-5 flex w-full flex-col px-3 pt-10 lg:w-5/6 lg:flex-row">
        <div className="mx-auto w-full lg:w-3/4 xl:w-full">
          <section className="w-full py-1">
            <div className="mx-auto w-full px-4 lg:w-full">
              <div className="bg-blueGray-100 relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 shadow-lg">
                <div className="mb-5 rounded-t border-b-2 border-gray-500 bg-gray-50 px-5 py-3 md:mb-6">
                  <div className="flex items-center justify-between text-center">
                    <h6 className="text-blueGray-700 text-xl font-bold">
                      Update Subject
                    </h6>
                    <button
                      onClick={handleSubmit}
                      className="text-md rounded  bg-red-500 px-4 py-2 font-bold uppercase text-white shadow outline-none  transition-all duration-200 ease-linear hover:rounded-full  hover:bg-red-100 hover:text-black 
                      hover:shadow-md focus:outline-none active:bg-red-600 "
                      type="submit"
                    >
                      Update
                    </button>
                  </div>
                </div>
                <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                  <form>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                      <div className="mb-4">
                        <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                          Subject Name
                        </label>
                        <input
                          type="text"
                          value={subjectData.subjectName}
                          onChange={(e) =>
                            handleInputChange("subjectName", e.target.value)
                          }
                          placeholder="Enter Subject Name"
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-800 shadow focus:outline-none focus:ring"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                          Subject Number
                        </label>
                        <input
                          type="text"
                          value={subjectData.subjectNumber}
                          onChange={(e) =>
                            handleInputChange("subjectNumber", e.target.value)
                          }
                          placeholder="Enter Subject Number"
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-800 shadow focus:outline-none focus:ring"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                          Semester
                        </label>
                        <select
                          className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow focus:outline-none focus:ring"
                          value={subjectData.semesterNumber}
                          onChange={(e) =>
                            handleInputChange("semesterNumber", e.target.value)
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
                      <div className="mb-4">
                        <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase">
                          Subject Type
                        </label>
                        <div>
                          <input
                            type="radio"
                            id="practical"
                            name="subjectType"
                            value="Practical"
                            checked={subjectData.subjectType === "Practical"}
                            onChange={(e) =>
                              handleInputChange("subjectType", e.target.value)
                            }
                          />
                          <label htmlFor="practical" className="ml-2">
                            Practical
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="practical"
                            name="subjectType"
                            value="Tutorial"
                            checked={subjectData.subjectType === "Tutorial"}
                            onChange={(e) =>
                              handleInputChange("subjectType", e.target.value)
                            }
                          />
                          <label htmlFor="practical" className="ml-2">
                            Tutorial
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="theory"
                            name="subjectType"
                            value="Theory"
                            checked={subjectData.subjectType === "Theory"}
                            onChange={(e) =>
                              handleInputChange("subjectType", e.target.value)
                            }
                          />
                          <label htmlFor="theory" className="ml-2">
                            Theory
                          </label>
                        </div>
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

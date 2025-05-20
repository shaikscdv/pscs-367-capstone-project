import React, { useState } from "react";
import toast from "react-hot-toast";
import { addSubject } from "../../../Services/subjectServices";
import SideNav from "../../../Components/SideNav/SideNav";

export default function CreateSubject() {
  const [subjectData, setSubjectData] = useState({
    subjectName: "",
    subjectNumber: "",
    semesterNumber: "1",
    type: "Theory", // Default value for type
  });

  const handleInputChange = (key, value) => {
    setSubjectData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", subjectData);
    try {
      const responseSubject = await addSubject(subjectData);
      console.log(responseSubject);
      if (responseSubject.success === true) {
        toast.success("Subject added successfully");
      } else {
        toast.error(responseSubject.message);
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
      <div className="z-10 mt-5 flex w-full flex-col px-3 pt-10 lg:w-5/6 lg:flex-row">
        <div className="mx-auto w-full lg:w-3/4 xl:w-full">
          <section className="w-full py-1">
            <div className="mx-auto w-full px-4 lg:w-full">
              <div className="bg-blueGray-100 relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 shadow-lg">
                <div className="mb-5 rounded-t border-b-2 border-gray-500 bg-gray-50 px-5 py-3 md:mb-6">
                  <div className="flex items-center justify-between text-center">
                    <h6 className="text-blueGray-700 text-xl font-bold">
                      Create Subject
                    </h6>
                    <button
                      onClick={handleSubmit}
                      className="text-md rounded bg-primary px-4 py-2 font-bold uppercase text-white shadow outline-none transition-all  duration-200 ease-linear hover:rounded-full hover:bg-mintPrimary hover:text-black hover:shadow-md focus:outline-none active:bg-red-600"
                      type="submit"
                    >
                      ADD
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
                          value={subjectData.firstName}
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
                          value={subjectData.semester}
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
                          Type
                        </label>
                        <div>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              className="form-radio"
                              value="Theory"
                              checked={subjectData.type === "Theory"}
                              onChange={(e) =>
                                handleInputChange("type", e.target.value)
                              }
                            />
                            <span className="ml-2">Theory</span>
                          </label>
                          <label className="ml-6 inline-flex items-center">
                            <input
                              type="radio"
                              className="form-radio"
                              value="Practical"
                              checked={subjectData.type === "Practical"}
                              onChange={(e) =>
                                handleInputChange("type", e.target.value)
                              }
                            />
                            <span className="ml-2">Practical</span>
                          </label>
                          <label className="ml-6 inline-flex items-center">
                            <input
                              type="radio"
                              className="form-radio"
                              value="Tutorial"
                              checked={subjectData.type === "Tutorial"}
                              onChange={(e) =>
                                handleInputChange("type", e.target.value)
                              }
                            />
                            <span className="ml-2">Tutorial</span>
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

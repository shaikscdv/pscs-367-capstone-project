import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import SideNavStudent from "../../../Components/SideNav/SideNavStudent";
import { getMyMarks } from "../../../Services/studentServices";

export default function ViewMarks() {
  const [marksData, setMarksData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMarks = await getMyMarks();
        console.log(responseMarks);
        setMarksData(responseMarks);
      } catch (error) {
        console.log("Marks viewing error ", error);
        toast.error("Please try again");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <SideNavStudent />
      </div>
      <div className="w-5/6">
        <div className="pt-10">
          {marksData.length === 0 ? (
            <>
              <Link to="/student">
                <h1 className="flex items-center justify-center pt-20 text-4xl font-bold text-darkPrimary ">
                  No Makrs Uploaded let !
                </h1>
              </Link>
            </>
          ) : (
            <>
              <div className="mb-12">
                <h1 className="mb-5 text-center text-3xl font-bold">
                  📝 Your Marks
                </h1>
              </div>
              <div className="flex w-full items-center justify-center">
                <table>
                  <thead className="bg-gray-300">
                    <tr>
                      <th className="border border-gray-800 p-2 ">Subject</th>
                      <th className="border border-gray-800 p-2 ">Mid-1</th>
                      <th className="border border-gray-800 p-2 ">Mid-2</th>
                      <th className="border border-gray-800 p-2 ">Quiz-1</th>
                      <th className="border border-gray-800 p-2 ">Quiz-2</th>
                      <th className="border border-gray-800 p-2 ">Practical</th>
                      <th className="border border-gray-800 p-2 ">End Semester</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marksData.map((marks, index) => (
                      <tr key={index} className="border border-gray-800">
                        <td className="border border-gray-800 bg-gray-200 p-2 font-bold text-lg text-center">
                          {marks.SubjectId.subjectName}
                        </td>
                        {marks.Marks.map((mark, idx) => (
                          <td key={idx} className="border border-gray-800 p-2 text-lg font-bold text-center">
                            {mark}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

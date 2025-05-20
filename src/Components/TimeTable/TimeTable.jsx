import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { getTimeTable } from "../../Services/teacherServices";
import SideNavTeacher from "../SideNav/SideNavTeacher";

const dayMappings = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
};

const timeRangeOptions = [
  "10:30-11:30",
  "11:30-12:30",
  "12:30-01:30",
  "01:30-02:00", // Break
  "02:00-03:00",
  "03:00-04:00",
  "04:00-05:00",
  "05:00-06:00",
];

const Timetable = () => {
  const { user } = useAuth();
  const [timetableData, setTimetableData] = useState([]);

  useEffect(() => {
    const fetchTimetableData = async () => {
      try {
        const response = await getTimeTable(user._id);
        console.log("Response:", response); // Log the response
        if (response && response.subjects && Array.isArray(response.subjects)) {
          // Duplicate entries for practical subjects with multiple time slots
          const updatedTimetableData = response.subjects.flatMap((entry) => {
            if (entry.type === "Practical" && entry.timeRange.includes(";")) {
              const timeSlots = entry.timeRange.split(";");
              return timeSlots.map((slot) => ({
                ...entry,
                timeRange: slot,
              }));
            } else {
              return entry;
            }
          });
          setTimetableData(updatedTimetableData);
        } else {
          console.error(
            "Timetable data is not in the expected format:",
            response,
          );
        }
      } catch (error) {
        console.error("Error fetching timetable data:", error);
      }
    };

    fetchTimetableData();
  }, [user._id]);

  

  console.log("Timetable Data:", timetableData); // Log the timetable data

  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/6">
          <SideNavTeacher />
        </div>
        <div className="container mx-auto my-5">
          <h1 className="mb-14 text-center text-2xl font-bold">
            Timetable
          </h1>
          <div className="border border-gray-800">
            <div className="flex text-xl font-bold">
              <div className="w-24 border-b border-r border-gray-800 bg-gray-200 p-2 py-2 text-center">
                Time
              </div>
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((day) => (
                <div
                  key={day}
                  className="flex-1 border-b border-gray-800 bg-gray-200 p-2 py-2 text-center"
                >
                  {day}
                </div>
              ))}
            </div>
            {timeRangeOptions.map((timeRange, index) => (
              <div key={index} className="flex font-semibold">
                <div className="w-24 border-b border-r border-gray-800 p-1 py-6 text-center">
                  {timeRange}
                </div>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (shorthandDay, dayIndex) => {
                    const matchingEntries = timetableData.filter(
                      (entry) =>
                        entry.days.includes(shorthandDay) &&
                        entry.timeRange === timeRange
                    );

                    return (
                      <div
                        key={dayIndex}
                        className={`flex-1 border-b border-r border-gray-800 p-2 py-2 text-center text-lg duration-300 hover:cursor-pointer ${
                          matchingEntries.length > 0
                            ? matchingEntries[0].type === "Practical"
                              ? "bg-yellow-100 duration-300 hover:bg-transparent"
                              : matchingEntries[0].type === "Theory"
                                ? " bg-blue-100 hover:bg-transparent"
                                : "bg-green-100 hover:bg-transparent"
                            : ""
                        } hover:shadow-md`}
                      >
                        {matchingEntries.length > 0 ? (
                          matchingEntries.map((matchingEntry, index) => (
                            <Link
                              key={index}
                              to={`/attendance/${matchingEntry.subject._id}`}
                            >
                              <div
                                className={`rounded-sm ${
                                  matchingEntry.type === "Theory"
                                    ? "bg-blue-100 duration-300 hover:bg-blue-300"
                                    : matchingEntry.type === "Tutorial"
                                      ? "bg-green-100 duration-300 hover:bg-green-300"
                                      : "bg-yellow-100 duration-300 hover:bg-yellow-300"
                                }`}
                              >
                                {`${matchingEntry.subject.subjectName} (${matchingEntry.subject.subjectNumber}) ${matchingEntry.batch !== "0" ? matchingEntry.batch : ""} - ${matchingEntry.type} - ${matchingEntry.classroom}`}
                              </div>
                            </Link>
                          ))
                        ) : timeRange === "01:30-02:00" ? (
                          <div className="cursor-not-allowed font-light">
                            Break
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    );
                  },
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Timetable;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideNavStudent from "../../../Components/SideNav/SideNavStudent";
import TableCardViewAttendance from "../../../Components/TableCard/TableCardViewAttendance";
import { getMyAttendance } from "../../../Services/studentServices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../../../Hooks/useAuth";
import { MySubject } from "../../../Services/discussionForumServices";

export default function ViewAttendance() {
  const { user } = useAuth();
  const [myAttendance, setMyAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [mysub, setMysub] = useState([]);
  const [sortNewest, setSortNewest] = useState(true); // true for newest, false for oldest
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust as needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getMySubject = await MySubject(user.CurrentSemester);
        console.log(getMySubject);
        setMysub(getMySubject.subjects);
        const responseData = await getMyAttendance();
        console.log(responseData);
        setMyAttendance(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Reset current page to 1 whenever filters or sorting change
    setCurrentPage(1);
  }, [searchTerm, startDate, endDate, sortNewest]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredAttendance = myAttendance.filter((atten) => {
    const date = new Date(atten.createdAt);
    return (
      atten.subjectId.subjectName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      (!startDate || date >= startDate) &&
      (!endDate || date <= endDate)
    );
  });

  const sortedAttendance = filteredAttendance.sort((a, b) => {
    if (sortNewest) {
      return new Date(b.createdAt) - new Date(a.crmyAttendance?.filteeatedAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  const currentItems = sortedAttendance.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // Count total present attendance for all filtered items
  const totalPresentAttendance = filteredAttendance.filter(
    (attendance) => attendance.attendance === 1,
  ).length;

  const attendancePercentage =
    (totalPresentAttendance / filteredAttendance.length) * 100 || 0;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getPercentageColor = (percentage) => {
    if (percentage > 70) {
      return "bg-green-300";
    } else if (percentage > 50) {
      return "bg-yellow-300";
    } else {
      return "bg-red-300";
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/6">
          <SideNavStudent />
        </div>
        <div className="z-10 flex h-auto w-5/6 justify-center px-3 pt-14">
          {myAttendance && myAttendance.length > 0 ? (
            <>
              <div className="flex w-full flex-col">
                <h1 className="mb-8 text-center text-2xl font-bold">
                  ✅ Attendance
                </h1>
                <div className="mb-8 flex flex-row items-center justify-center">
                  <div>
                    <label className="mr-2 text-lg font-semibold">
                      Subject:
                    </label>
                    <select
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="rounded-md border-2 p-1 focus:border-2"
                    >
                      <option value="">All Subjects</option>
                      {mysub.map((subject) => (
                        <option
                          key={subject.subjectId}
                          value={subject.subjectName}
                        >
                          {subject.subjectName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="ml-8 flex justify-evenly text-lg font-semibold ">
                    <label>From:</label>
                    <DatePicker
                      className="ml-2 mr-5 rounded-md border-2"
                      placeholder="Click"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                    <label>To:</label>
                    <DatePicker
                      className="ml-2 rounded-md border-2"
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                    />
                  </div>

                  <div className="flex items-center text-lg">
                    <label className="ml-5 mr-3 font-semibold">Sort :</label>
                    <input
                      type="radio"
                      value="new"
                      checked={sortNewest}
                      onChange={() => setSortNewest(true)}
                    />
                    <label htmlFor="newest" className="ml-2 mr-2">
                      New
                    </label>
                    <input
                      type="radio"
                      value="old"
                      checked={!sortNewest}
                      onChange={() => setSortNewest(false)}
                    />
                    <label htmlFor="newest" className="ml-2 mr-2">
                      Old
                    </label>
                  </div>
                  <div className="ml-3">
                    <h2 className="text-lg font-semibold">
                      Total Present :{" "}
                      <span className="font-light">
                        {totalPresentAttendance}
                      </span>
                    </h2>
                  </div>
                </div>
                <table className="w-full text-left rtl:text-right">
                  {/* Table header */}
                  <thead className="border-b-4 border-white text-[1rem] font-bold uppercase text-white dark:bg-primary">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center justify-center">
                          <label className="text-lg font-bold text-white">
                            🧑🏻‍🎓
                          </label>
                        </div>
                      </th>
                      <th scope="col" className="border-l-2 px-6 py-3">
                        Subject Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Subject Number
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Attendance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((atten, index) => (
                      <TableCardViewAttendance
                        key={index}
                        index={index}
                        subjectName={atten.subjectId.subjectName}
                        subjectNumber={atten.subjectId.subjectNumber}
                        attendanced={atten.attendance}
                        Date={new Date(atten.createdAt).toLocaleDateString(
                          "en-US",
                        )}
                      />
                    ))}
                  </tbody>
                </table>
                {/* Pagination */}
                <div className="mt-4 flex justify-center">
                  <ul className="flex space-x-2">
                    {Array.from(
                      {
                        length: Math.ceil(
                          filteredAttendance.length / itemsPerPage,
                        ),
                      },
                      (_, i) => (
                        <li key={i}>
                          <button
                            className={`${
                              currentPage === i + 1
                                ? "bg-gray-600 text-white"
                                : "bg-white text-gray-600"
                            } rounded-md px-3 py-1`}
                            onClick={() => paginate(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <div className="mr-12 mt-4 text-right">
                  <h2 className="text-xl font-semibold">
                    <span
                      className={`${getPercentageColor(attendancePercentage)}  px-2 py-2 font-medium rounded-full `}
                    >
                      {attendancePercentage.toFixed(1)}%
                    </span>
                  </h2>
                </div>
              </div>
            </>
          ) : (
            <Link to="/studentDashboard">
              <h1 className="items-center justify-center rounded-md bg-gray-600 p-2 text-lg text-white">
                No Found! Click to go back
              </h1>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

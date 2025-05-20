import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import SideNav from "../../../Components/SideNav/SideNav";
import TableCard from "../../../Components/TableCard/TableCard";
import {
  deleteSubject,
  getAllSubject,
} from "../../../Services/subjectServices";

export default function ManageSubject() {
  const [allSubject, setAllSubject] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [subjectsPerPage] = useState(5); // Set the number of subjects per page
  const [sortOrder, setSortOrder] = useState(true);
  const [semesterFilter, setSemesterFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAllSubject = await getAllSubject([]);
        if (responseAllSubject && responseAllSubject.subjects) {
          setAllSubject(responseAllSubject.subjects);
        } else {
          setAllSubject([]);
          toast.error("Failed to fetch subjects data");
        }
      } catch (error) {
        console.log("Get all subject frontend error", error);
        toast.error("Some error occurred, please try again!");
      }
    };

    fetchData();
  }, []);

  // Sorting
  const sortedSubjects = [...allSubject].sort((a, b) => {
    if (sortOrder) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  // Searching and Filtering
  const filteredSubjects = sortedSubjects.filter((subject) => {
    return (
      subject.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (semesterFilter === "" ||
        subject.semesterNumber.toString() === semesterFilter)
    );
  });

  // Pagination
  const indexOfLastSubject = currentPage * subjectsPerPage;
  const indexOfFirstSubject = indexOfLastSubject - subjectsPerPage;
  const currentSubjects = filteredSubjects.slice(
    indexOfFirstSubject,
    indexOfLastSubject,
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination when searching
  };

  // Handle semester filter change
  const handleSemesterChange = (event) => {
    setSemesterFilter(event.target.value);
    setCurrentPage(1); // Reset pagination when filtering
  };

  // Function to delete a subject
  const handleDeleteSubject = async (id) => {
    try {
      const responseData = await deleteSubject(id);
      if (responseData.success === true) {
        toast.success(responseData.message);
        setAllSubject((prevSubjects) =>
          prevSubjects.filter((subject) => subject._id !== id),
        );
      } else if (responseData.success === false) {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Please try again!");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <SideNav />
      </div>
      <div className="z-10 flex h-auto w-5/6 justify-center px-3 pt-20">
        <div className="w-full">
          <h1 className="mb-3 text-center text-2xl font-bold">
            📚 Subject's List
          </h1>
          <div className="mb-8 flex flex-row items-center gap-5">
            <div className="text-md flex items-center">
              <label className="ml-5 mr-3 font-semibold">Search :</label>
              <input
                type="text"
                placeholder="Search by Subject ..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="text-md rounded-md border border-gray-400 p-1 font-semibold"
              />
            </div>
            <div className="text-md flex items-center">
              <label className="ml-5 mr-3 font-semibold">Sort :</label>
              <input
                type="radio"
                value="new"
                checked={sortOrder}
                onChange={() => setSortOrder(true)}
              />
              <label htmlFor="newest" className="ml-2 mr-2">
                New
              </label>
              <input
                type="radio"
                value="old"
                checked={!sortOrder}
                onChange={() => setSortOrder(false)}
              />
              <label htmlFor="newest" className="ml-2 mr-2">
                Old
              </label>
            </div>
            <div className="text-md flex items-center">
              <label className="ml-5 mr-3 font-semibold">Semester :</label>
              <select
                value={semesterFilter}
                onChange={handleSemesterChange}
                className="text-md rounded-md border border-gray-400 p-1 font-semibold"
              >
                <option value="">All</option>
                {[
                  ...new Set(
                    allSubject.map((subject) => subject.semesterNumber),
                  ),
                ].map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {currentSubjects && currentSubjects.length > 0 ? (
            <>
              <div className="flex w-full flex-col">
                <table className="w-full text-left rtl:text-right">
                  <thead className="border-b-4 border-white text-[1rem] font-bold uppercase text-white dark:bg-primary">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <label className="text-xl font-bold text-white">
                            📕
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
                        Subject Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Semester
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSubjects.map((subjects, index) => (
                      <TableCard
                        index={index}
                        key={subjects._id}
                        subjects={subjects}
                        handleDeleteSubject={handleDeleteSubject}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="mt-4 flex justify-center">
                {[
                  ...Array(
                    Math.ceil(filteredSubjects.length / subjectsPerPage),
                  ).keys(),
                ].map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number + 1)}
                    className={`mx-1 border px-3 py-1 ${
                      currentPage === number + 1
                        ? "bg-gray-600 text-white"
                        : "bg-white text-gray-700"
                    } rounded-md`}
                  >
                    {number + 1}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <Link to="/subjectDashboard">
              <h1 className="items-center justify-center rounded-md bg-gray-600 p-2 text-lg text-white">
                No Subject Found! Click to go back
              </h1>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

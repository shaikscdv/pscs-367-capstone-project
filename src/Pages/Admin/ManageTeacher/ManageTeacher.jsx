import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import SideNav from "../../../Components/SideNav/SideNav";
import TableCard from "../../../Components/TableCard/TableCard";
import {
  getAllTeacher,
  deleteTeacher,
} from "../../../Services/teacherServices";

export default function ManageTeacher() {
  const [allTeacher, setAllTeacher] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [teachersPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAllTeacher = await getAllTeacher([]);
        setAllTeacher(responseAllTeacher);
      } catch (error) {
        console.log("Get all teacher frontend error", error);
        toast.error("Some error occurred, please try again!");
      }
    };

    fetchData();
  }, []);

  // Sorting
  const sortedTeachers = [...allTeacher].sort((a, b) => {
    if (sortOrder) {
      //new
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      //old
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  // Searching
  const filteredTeachers = sortedTeachers.filter((teacher) =>
    (
      teacher.firstName.toLowerCase() +
      " " +
      teacher.lastName.toLowerCase()
    ).includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(
    indexOfFirstTeacher,
    indexOfLastTeacher,
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination when searching
  };

  const DeleteTeacher = async (id) => {
    try {
      const responseData = await deleteTeacher(id);
      if (responseData.success === true) {
        toast.success(responseData.message);
        setAllTeacher((prevTeachers) =>
          prevTeachers.filter((teacher) => teacher._id !== id),
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
            👩🏻‍🏫 Teacher's List
          </h1>
          <div className="mb-8 flex flex-row items-center gap-5">
            <div className="text-md flex items-center">
              <label className="ml-5 mr-3 font-semibold">Search :</label>
              <input
                type="text"
                placeholder="Search by teacher name..."
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
          </div>
          {currentTeachers.length > 0 ? (
            <>
              <div className="flex w-full flex-col">
                <table className="w-full text-left rtl:text-right">
                  <thead className="border-b-4 border-white  text-[1rem] font-bold uppercase text-white dark:bg-primary">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <label className="text-lg font-bold text-white">
                            👩🏻‍🏫
                          </label>
                        </div>
                      </th>
                      <th scope="col" className="border-l-2 px-6 py-3 ">
                        Teacher Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Teacher Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Teacher Phone
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {console.log(currentTeachers)}
                    {currentTeachers.map((teacher, index) => (
                      <TableCard
                        key={teacher._id}
                        teacher={teacher}
                        index={index}
                        DeleteTeacher={DeleteTeacher}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="mt-4 flex justify-center">
                {[
                  ...Array(
                    Math.ceil(filteredTeachers.length / teachersPerPage),
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
            <Link to="/teacherDashboard">
              <h1 className="items-center justify-center rounded-md bg-gray-600 p-2 text-lg text-white">
                No Teacher Found! Click to go back
              </h1>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

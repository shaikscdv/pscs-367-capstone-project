import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {useNavigate } from "react-router-dom";
import CustomModal from "../../../Components/CustomModal/CustomModal";
import { useAuth } from "../../../Hooks/useAuth";
import { getTeacherSubjects } from "../../../Services/teacherServices";

export default function Marks() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [subList, setsubList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTeacherSubjects(user._id);
        console.log(response);
        // Update state to hold both semesterId and subjectId
        setsubList(
          response.map((item) => ({
            semesterId: item.semesterId,
            subjectId: item.subjectId,
          })),
        );
      } catch (error) {
        toast.error("Please try again");
        console.log("Error in fetching subject for a semester", error);
      }
    };
    fetchData();
  }, []);

  const openModal = (event) => {
    event.preventDefault();
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const chooseSubject = (e) => {
    const selectedSubjectId = e.target.value;
    navigate(`/marks/${selectedSubjectId}`);
  };

  console.log(subList);

  return (
    <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal}>
      <h1 className="text-xl font-semibold text-gray-800">Select Semester</h1>
      <select
        onChange={(e) => chooseSubject(e)}
        className="absolute left-0 top-16 w-full border-2 border-black p-2"
      >
        <option>-- Choose Subject --</option>
        {subList.map((subject, index) => (
          <option key={index} value={subject.subjectId._id}>
            {subject.subjectId.subjectName} : {subject.subjectId.subjectNumber}
          </option>
        ))}
      </select>
    </CustomModal>
  );
}

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SubjectCard from "../../../Components/Card/SubjectCard";
import SideNavTeacher from "../../../Components/SideNav/SideNavTeacher";
import { useAuth } from "../../../Hooks/useAuth";
import { getTeacherSubjects } from "../../../Services/teacherServices";

export default function GetSubject() {
  const { user } = useAuth();
  const [semSubject, setSemSubject] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTeacherSubjects(user._id);
        console.log(response);
        // Update state to hold both semesterId and subjectId
        setSemSubject(
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

  console.log(semSubject);

  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <SideNavTeacher />
      </div>
      <div className="mr-5 flex w-5/6 flex-col pt-16">
        <div className="mb-12">
          <h1 className="mb-5 text-center text-3xl font-bold">
            📚 Your Subject
          </h1>
        </div>
        <SubjectCard semSubject={semSubject} />
      </div>
    </div>
  );
}

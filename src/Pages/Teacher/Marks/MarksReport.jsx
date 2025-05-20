import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CustomModal from "../../../Components/CustomModal/CustomModal";
import { useAuth } from "../../../Hooks/useAuth";
import {
  getTeacherSubjects,
  marksReport,
} from "../../../Services/teacherServices";

export default function MarksReport() {
  const { user } = useAuth();
  const [subList, setSubList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTeacherSubjects(user._id);
        setSubList(response); // No need to map here, keep it as is
      } catch (error) {
        toast.error("Please try again");
        console.error("Error in fetching subject for a semester", error);
      }
    };
    fetchData();
  }, []);

  const downloadMarksReport = async () => {
    // Check if subject is selected
    if (!selectedSubject) {
      toast.error("Please select a subject!");
      return;
    }

    try {
      const response = await marksReport(selectedSubject.subjectId._id); // Pass the subject ID
      console.log(response);

      // Format data into CSV format
      if (response.length === 0) {
        toast.error("No Marks Uploaded let!");
        return;
      }

      let csvContent =
        "Student Name,Mid-1,Mid-2,Quiz-1,Quiz-2,Practical,End Semester\n";
      response.forEach((item) => {
        const studentName = item.StudentId.name;
        const marks = item.Marks.map((mark) => mark || "").join(",");
        csvContent += `${studentName},${marks}\n`;
      });

      // Trigger download
      downloadCSV(csvContent);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate marks report. Please try again!");
    }
  };

  // Function to trigger download of CSV file
  const downloadCSV = (csvContent) => {
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "marks_report.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const chooseSubject = (e) => {
    const selectedSubjectId = e.target.value;
    const subject = subList.find(
      (subject) => subject.subjectId._id === selectedSubjectId,
    );
    setSelectedSubject(subject); // Set the entire subject object
  };

  return (
    <CustomModal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      height="30%"
    >
      <h1 className="mt-8 text-xl font-semibold text-gray-800">
        Select Subject
      </h1>
      <select
        onChange={(e) => chooseSubject(e)}
        className="mt-5 w-full border-2 border-black p-2"
      >
        <option value="">-- Choose Subject --</option>
        {subList.map((subject, index) => (
          <option key={index} value={subject.subjectId._id}>
            {subject.subjectId.subjectName} : {subject.subjectId.subjectNumber}
          </option>
        ))}
      </select>
      <button
        onClick={downloadMarksReport}
        className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white transition-all duration-300 hover:rounded-[3rem] hover:bg-blue-800"
      >
        Generate Report
      </button>
    </CustomModal>
  );
}

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CustomModal from "../../../Components/CustomModal/CustomModal";
import { useAuth } from "../../../Hooks/useAuth";
import {
  attendanceReport,
  getTeacherSubjects,
} from "../../../Services/teacherServices";

export default function AttendanceReport() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [subList, setSubList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(null); // Initialize as null
  const [selectedPercentage, setSelectedPercentage] = useState("");

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

const downloadAttendanceReport = async () => {
  // Check if both subject and percentage are selected
  if (!selectedSubject || !selectedPercentage) {
    toast.error("Please select both subject and percentage.");
    return;
  }

  try {
    const response = await attendanceReport(
      selectedSubject.subjectId._id, // Pass the subject ID
      selectedPercentage,
    );

    // Check if the report data is available
    if (response && response.success && response.lowAttendanceStudents) {
      const reportData = response.lowAttendanceStudents;

      // Create CSV content
      let csvContent = "Student Name,Email,Attendance Percentage\n";
      reportData.forEach((student) => {
        csvContent += `${student.student.name},${student.student.email},${student.attendancePercentage}\n`;
      });

      // Create a Blob object containing the CSV content
      const blob = new Blob([csvContent], { type: "text/csv" });

      // Create a download link for the Blob
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "attendance_report.csv";
      document.body.appendChild(a);

      // Trigger the click event on the download link to start downloading
      a.click();

      // Remove the download link from the DOM
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      toast.error("No data available for the report.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Please try again !");
  }
};


  const chooseSubject = (e) => {
    const selectedSubjectId = e.target.value;
    const subject = subList.find(
      (subject) => subject.subjectId._id === selectedSubjectId,
    );
    setSelectedSubject(subject); // Set the entire subject object
  };

  const choosePercentage = (e) => {
    const selectedPercentageValue = e.target.value;
    setSelectedPercentage(selectedPercentageValue);
  };

  return (
    <CustomModal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      height="45%"
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
      <h1 className="mt-8 text-xl font-semibold text-gray-800">
        Select Percentage
      </h1>
      <select
        onChange={(e) => choosePercentage(e)}
        className="mt-5 w-full border-2 border-black p-2"
      >
        <option value="">-- Choose Percentage --</option>
        <option value="80">less than or equal to 80</option>
        <option value="70">less than or equal to 70</option>
        <option value="60">less than or equal to 60</option>
        <option value="50">less than or equal to 50</option>
        <option value="40">less than or equal to 40</option>
        <option value="30">less than or equal to 30</option>
        <option value="20">less than or equal to 20</option>
        <option value="10">less than or equal to 10</option>
      </select>
      <button
        onClick={downloadAttendanceReport}
        className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white transition-all duration-300 hover:rounded-[3rem] hover:bg-blue-800"
      >
        Generate Report
      </button>
    </CustomModal>
  );
}
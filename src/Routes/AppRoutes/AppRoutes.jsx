import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../../Hooks/useAuth";
import UnauthorizedMessage from "../../Components/Unauthorized/UnauthorizedMessage";
import AuthRoute from "../AuthRoutes/AuthRoutes";
import FallbackUI from "../../Components/FallbackUI/FallbackUI";

const MarksReport = lazy(() => import("../../Pages/Teacher/Marks/MarksReport"));
const TimeTable = lazy(() => import("../../Components/TimeTable/TimeTable"));
const CreateTimeTable = lazy(
  () => import("../../Pages/Admin/CreateTimeTable/CreateTimeTable"),
);
const AttendanceReport = lazy(
  () => import("../../Pages/Teacher/Attendance/AttendanceReport"),
);
const DefaultPage = lazy(() => import("../../Pages/DefaultPage/DefaultPage"));
const Login = lazy(() => import("../../Pages/Login/Login"));
const Signup = lazy(() => import("../../Pages/Signup/Signup"));
const AdminHomePage = lazy(
  () => import("../../Pages/Admin/AdminHomePage/AdminHomePage"),
);
const TeacherDashboard = lazy(
  () => import("../../Pages/Admin/TeacherDashboard/TeacherDashboard"),
);
const CreateTeacher = lazy(
  () => import("../../Pages/Admin/CreateTeacher/CreateTeacher"),
);
const SubjectDashboard = lazy(
  () => import("../../Pages/Admin/SubjectDashboard/SubjectDashboard"),
);
const ManageTeacher = lazy(
  () => import("../../Pages/Admin/ManageTeacher/ManageTeacher"),
);
const ManageSubject = lazy(
  () => import("../../Pages/Admin/ManageSubject/ManageSubject"),
);
const UpdateSubject = lazy(
  () => import("../../Pages/Admin/UpdateSubject/UpdateSubject"),
);
const StudentDashboard = lazy(
  () => import("../../Pages/Admin/StudentDashboard/StudentDashboard"),
);
const ManageStudent = lazy(
  () => import("../../Pages/Admin/ManageStudent/ManageStudent"),
);
const UpdateStudent = lazy(
  () => import("../../Pages/Admin/UpdateStudent/UpdateStudent"),
);
const StudentHomePage = lazy(
  () => import("../../Pages/Student/StudentHomePage/StudentHomePage"),
);
const TeacherHomePage = lazy(
  () => import("../../Pages/Teacher/TeacherHomePage/TeacherHomePage"),
);
const Attendance = lazy(
  () => import("../../Pages/Teacher/Attendance/Attendance"),
);
const MarkSheet = lazy(() => import("../../Pages/Teacher/Marks/MarkSheet"));
const CreateStudent = lazy(
  () => import("../../Pages/Admin/CreateStudent/CreateStudent"),
);
const CreateSubject = lazy(
  () => import("../../Pages/Admin/CreateSubject/CreateSubject"),
);
const UpdateTeacher = lazy(
  () => import("../../Pages/Admin/UpdateTeacher/UpdateTeacher"),
);
const Marks = lazy(() => import("../../Pages/Teacher/Marks/Marks"));
const AttendanceList = lazy(
  () => import("../../Pages/Teacher/Attendance/AttendanceList"),
);
const Profile = lazy(() => import("../../Components/Profile/Profile"));
const ViewAttendance = lazy(
  () => import("../../Pages/Student/Attendance/ViewAttendance"),
);
const ViewMarks = lazy(() => import("../../Pages/Student/Marks/ViewMarks"));
const DiscussionForum = lazy(
  () => import("../../Pages/DiscussionForum/DiscussionForum"),
);

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Suspense fallback={<FallbackUI />}>
        <Routes>
          <Route path="/" element={<DefaultPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/profile"
            element={
              user ? (
                <AuthRoute>
                  <Profile />
                </AuthRoute>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {user && user.userType === "admin" && (
            <>
              <Route path="/admin" element={<AdminHomePage />} />
              <Route path="/teacherDashboard" element={<TeacherDashboard />} />
              <Route path="/createTeacher" element={<CreateTeacher />} />
              <Route path="/subjectDashboard" element={<SubjectDashboard />} />
              <Route path="/createSubject" element={<CreateSubject />} />
              <Route path="/manageTeacher" element={<ManageTeacher />} />
              <Route path="/updateTeacher/:id" element={<UpdateTeacher />} />
              <Route path="/manageSubject" element={<ManageSubject />} />
              <Route path="/updateSubject/:id" element={<UpdateSubject />} />
              <Route path="/studentDashboard" element={<StudentDashboard />} />
              <Route path="/manageStudent/" element={<ManageStudent />} />
              <Route path="/createStudent/" element={<CreateStudent />} />
              <Route path="/updateStudent/:id" element={<UpdateStudent />} />
              <Route path="/createTimetable" element={<CreateTimeTable />} />
            </>
          )}

          {user && user.userType === "student" && (
            <>
              <Route path="/student" element={<StudentHomePage />} />
              <Route path="/viewAttendance" element={<ViewAttendance />} />
              <Route path="/viewMarks" element={<ViewMarks />} />
              <Route path="/discussionForum" element={<DiscussionForum />} />
            </>
          )}

          {user && user.userType === "teacher" && (
            <>
              <Route path="/teacher" element={<TeacherHomePage />} />
              <Route path="/attendance/:id" element={<AttendanceList />} />
              <Route path="/attendanceReport" element={<AttendanceReport />} />
              <Route path="/marksReport" element={<MarksReport />} />
              <Route path="/marks" element={<Marks />} />
              <Route path="/marks/:id" element={<MarkSheet />} />
              <Route path="/discussionForum" element={<DiscussionForum />} />
              <Route path="/timetable" element={<TimeTable />} />
            </>
          )}

          <Route path="/unauthorized" element={<UnauthorizedMessage />} />
          <Route path="*" element={<Navigate to="/unauthorized" />} />
        </Routes>
      </Suspense>
    </>
  );
}

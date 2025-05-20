const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("../middleware/errorMiddleware.js");
const router = express.Router();
const handler = require("express-async-handler");
const authMid = require("../middleware/authMiddleware.js");
const Attendance = require("../models/attendanceModel.js");
dotenv.config();

router.use(authMid);

router.post(
  "/markAttendance",
  handler(async (req, res, next) => {
    try {
      const attendanceData = req.body;

      for (const data of attendanceData) {
        // Extract attendance data from the request body
        const {
          SubjectId,
          Student,
          attendance,
          date,
        } = data;

        // Check if attendance data for the same subjectId, studentId, and date exists
        const existingAttendance =
          await Attendance.findOne({
            subjectId: SubjectId,
            studentId: Student,
          }).sort({ date: -1 });

        if (
          existingAttendance &&
          existingAttendance.subjectId.equals(
            SubjectId
          ) &&
          (isTodayDate(date) &&
            isWithin15Minutes(
              existingAttendance.date,
              date
            ))
        ) {
          // If existing attendance data found and either it's not for today's date or it's within 15 minutes, update it
          existingAttendance.attendance =
            attendance;
          await existingAttendance.save();
            res.json({
              success: true,
              message: "Attendance Updated",
            });
          console.log(
            "Existing attendance data updated:",
            existingAttendance
          );
        } else {
          // If no existing attendance data found or it's not within 15 minutes, save new attendance data
          const newRecord = new Attendance({
            subjectId: SubjectId,
            studentId: Student,
            attendance: attendance,
            date: date, // Use the date from the request body
          });
          await newRecord.save();
          console.log(
            "New attendance data saved:",
            newRecord
          );
        }
      }

      res.json({
        success: true,
        message: "Attendance marked",
      });
    } catch (error) {
      next(error);
      console.log(error);
    }
  })
);

function isTodayDate(date) {
  const today = new Date();
  const givenDate = new Date(date);
  return (
    today.getDate() === givenDate.getDate() &&
    today.getMonth() === givenDate.getMonth() &&
    today.getFullYear() ===
      givenDate.getFullYear()
  );
}

function isWithin15Minutes(
  lastAttendanceDate,
  currentDate
) {
  const fifteenMinutesInMillis = 15 * 60 * 1000;
  const lastAttendanceTime = new Date(
    lastAttendanceDate
  ).getTime();
  const currentTime = new Date(
    currentDate
  ).getTime();
  return (
    currentTime - lastAttendanceTime <=
    fifteenMinutesInMillis
  );
}


router.get(
  "/viewattendance",
  handler(async (req, res, next) => {
    try {
      const stuId = req.user.id;
      console.log(stuId);

      const Student_attendance =
        await Attendance.find({
          studentId: stuId,
        }).populate(
          "subjectId",
          "subjectName subjectNumber"
        );

      res.send(Student_attendance);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
);

router.get(
  "/attendanceReport/:subjectId",
  handler(async (req, res, next) => {
    try {
      const subjectId  = req.params.subjectId;
      const selectedPercentage =
        req.query.percentage || 60; // Default to 60% if not provided
      console.log(
        subjectId,
        " ",
        selectedPercentage
      );

      // Find all attendance records for the specified subjectId
      const attendanceRecords =
        await Attendance.find({
          subjectId: subjectId,
        }).populate("studentId", "name email"); // Populate student details

      if (attendanceRecords.length === 0) {
        return res.status(404).json({
          success: false,
          message:
            "No attendance records found for this subject.",
        });
      }

      // Calculate attendance percentage for each student
      const attendancePercentage = {};
      attendanceRecords.forEach((record) => {
        if (
          !attendancePercentage[record.studentId]
        ) {
          attendancePercentage[record.studentId] =
            {
              totalClasses: 0,
              attendedClasses: 0,
            };
        }
        attendancePercentage[record.studentId]
          .totalClasses++;
        if (record.attendance) {
          attendancePercentage[record.studentId]
            .attendedClasses++;
        }
      });

      // Filter out students with attendance percentage less than or equal to the selected percentage
      const lowAttendanceStudents = [];
      for (const studentId in attendancePercentage) {
        const percentage =
          (attendancePercentage[studentId]
            .attendedClasses /
            attendancePercentage[studentId]
              .totalClasses) *
          100;
        if (percentage <= selectedPercentage) {
          lowAttendanceStudents.push({
            student: attendanceRecords.find(
              (record) =>
                record.studentId.toString() ===
                studentId.toString()
            ).studentId,
            attendancePercentage:
              percentage.toFixed(2),
          });
        }
      }

      res.json({
        success: true,
        lowAttendanceStudents:
          lowAttendanceStudents,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
);

module.exports = router;

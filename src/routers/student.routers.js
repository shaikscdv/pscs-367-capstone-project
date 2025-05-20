const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("../middleware/errorMiddleware.js");
const authMid = require("../middleware/authMiddleware.js");
const bcrypt = require("bcryptjs");
const { sendMail } = require("../utils/sendMail.js");
const router = express.Router();
const handler = require("express-async-handler");
dotenv.config();

const { generateToken } = require("../utils/generateToken");
const Student = require("../models/studentModel.js");
const Semester = require("../models/semesterModel.js");
const StudentHist = require("../models/studentHistoryModel.js");

//admin login
router.post(
  "/login",
  handler(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        next(errorHandler(401, "Please fill all fields"));
      }

      const FindStudent = await Student.findOne({
        email,
      });

      if (!FindStudent) return next(errorHandler(404, "User not found"));

      if (FindStudent && (await FindStudent.matchPassword(password))) {
        res.json({
          _id: FindStudent._id,
          name: FindStudent.name,
          email: FindStudent.email,
          CurrentSemester: FindStudent.CurrentSemester,
          userType: "student",
          token: generateToken(
            FindStudent._id,
            FindStudent.name,
            FindStudent.email
          ),
          success: true,
        });
      } else {
        next(errorHandler(401, "Wrong Credentials"));
      }
    } catch (error) {
      next(error);
    }
  })
);

router.post(
  "/signup",
  handler(async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword, CurrentSemester } =
        req.body;

      console.log(req.body);

      if (
        !name ||
        !email ||
        !password ||
        !confirmPassword ||
        !CurrentSemester
      ) {
        return next(errorHandler(400, "Please fill all fields"));
      }

      if (password !== confirmPassword) {
        return next(errorHandler(400, "Passwords do not match"));
      }

      const studentExists = await Student.findOne({ email });

      if (studentExists) {
        return next(errorHandler(409, "User already exists"));
      }

      let semId = await Semester.findOne({
        semesterNumber: CurrentSemester,
      });

      if (!semId) {
        semId = await Semester.create({
          semesterNumber: CurrentSemester,
        });
      }

      const CreateStudent = await Student.create({
        name,
        email,
        password,
        CurrentSemester: semId._id,
      });

      const studentHist = await StudentHist.create({
        studentId: CreateStudent._id,
        semesterId: semId._id,
      });

      if (CreateStudent) {
        res.status(201).json({
          _id: CreateStudent._id,
          name: CreateStudent.name,
          email: CreateStudent.email,
          CurrentSemester: CreateStudent.CurrentSemester,
          userType: "student",
          token: generateToken(
            CreateStudent._id,
            CreateStudent.name,
            CreateStudent.email,
            CreateStudent.InstitutionName,
            CreateStudent.CurrentSemester
          ),
          success: true,
        });
      } else {
        return next(errorHandler(500, "Something went wrong"));
      }
    } catch (error) {
      console.error("SignUp error", error);
      next(error);
    }
  })
);

router.get(
  "/allstudent",
  authMid,
  handler(async (req, res, next) => {
    try {
      const allStudent = await Student.find({}).populate(
        "CurrentSemester",
        "semesterNumber"
      );

      if (allStudent) {
        console.log("Student ==> ", allStudent);
        res.send(allStudent);
      }
    } catch (error) {
      console.log("all student error", error);
      next(error);
    }
  })
);

//student nae delete karva
router.delete(
  "/delete/:id",
  authMid,
  handler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const StudentToDelete = await Student.findByIdAndDelete(id);

      if (!StudentToDelete) {
        return next(errorHandler(404, "Student not found"));
      }

      res.status(200).json({
        success: true,
        message: "Student deleted successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
);

///find individual student
router.get(
  "/manageStudent/:id",
  authMid,
  handler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const studentData = await Student.findById(id).populate(
        "CurrentSemester",
        "semesterNumber"
      );
      res.send(studentData);
    } catch (error) {
      next(errorHandler(404, "No Such Project Found"));
    }
  })
);

// Update student details by admin
router.put(
  "/update/:id",
  authMid,
  handler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateFormData = req.body;
      const newPassword = updateFormData.password;
      // console.log(newPassword);
      console.log(updateFormData);

      // Fetch the existing student data before the update
      const existingStudent = await Student.findById(id).populate(
        "CurrentSemester",
        "semesterNumber"
      );

      console.log("existingStudent", existingStudent);

      if (!existingStudent) {
        return res.status(404).json({
          success: false,
          error: "Student not found",
        });
      }

      console.log("hello", updateFormData.CurrentSemester);

      if (
        updateFormData.CurrentSemester &&
        updateFormData.CurrentSemester !==
          existingStudent.CurrentSemester.semesterNumber
      ) {
        // Find the semester by semesterNumber from the database
        const targetSemester = await Semester.findOne({
          semesterNumber: updateFormData.CurrentSemester,
        });

        console.log(targetSemester);

        if (!targetSemester) {
          return res.status(404).json({
            success: false,
            error: "Target semester not found",
          });
        }

        // Update the student's CurrentSemester with the new semester ID
        updateFormData.CurrentSemester = targetSemester._id;

        const studentHist = await StudentHist.create({
          studentId: existingStudent._id,
          semesterId: targetSemester._id,
        });
      }

      if (updateFormData.password) {
        const salt = await bcrypt.genSalt(10);
        updateFormData.password = await bcrypt.hash(
          updateFormData.password,
          salt
        );
      }

      const updatedStudent = await Student.findByIdAndUpdate(
        id,
        updateFormData,
        { new: true }
      );

      console.log("Updated Student ==> ", updatedStudent);

      if (!updatedStudent) {
        return res.status(404).json({
          success: false,
          error: "Student not found",
        });
      }

      // Check if the password is changed and send email
      if (newPassword && existingStudent.password !== updatedStudent.password) {
        const mailData = {
          name: updatedStudent.name,
          intro: "Your Updated Credentials",
          table: {
            data: [
              {
                Email: updatedStudent.email,
                Password: newPassword,
              },
            ],
          },
          outro: "Thank you 🫱🏻‍🫲🏾",
        };

        await sendMail(updatedStudent.email, "Student Credentials", mailData);
      }

      res.json({
        success: true,
        message: "Student updated successfully",
      });
    } catch (error) {
      console.error("Error updating Student", error);
      next(error);
    }
  })
);

module.exports = router;

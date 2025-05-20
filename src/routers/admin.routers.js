const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("../middleware/errorMiddleware.js");
const Admin = require("../models/adminModel.js");
const router = express.Router();
const handler = require("express-async-handler");
dotenv.config();

const {
  generateToken,
} = require("../utils/generateToken");
const Timetable = require("../models/timetableModel.js");

//admin login
router.post(
  "/login",
  handler(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        next(
          errorHandler(
            401,
            "Please fill all fields"
          )
        );
      }

      const FindAdmin = await Admin.findOne({
        email,
      });

      if (!FindAdmin)
        return next(
          errorHandler(404, "User not found")
        );

      if (
        FindAdmin &&
        (await FindAdmin.matchPassword(password))
      ) {
        res.json({
          _id: FindAdmin._id,
          name: FindAdmin.name,
          email: FindAdmin.email,
          userType: "admin",
          token: generateToken(
            FindAdmin._id,
            FindAdmin.name,
            FindAdmin.email
          ),
          success: true,
        });
      } else {
        next(
          errorHandler(401, "Wrong Credentials")
        );
      }
    } catch (error) {
      next(error);
    }
  })
);

//signUp API
router.post(
  "/signup",
  handler(async (req, res, next) => {
    try {
      const {
        name,
        email,
        password,
        confirmPassword,
      } = req.body;

      if (
        !name ||
        !email ||
        !password ||
        !confirmPassword
      ) {
        next(
          errorHandler(
            401,
            "Please fill the fields"
          )
        );
      }

      const adminExists = await Admin.findOne({
        email,
      });
      if (adminExists) {
        next(
          errorHandler(400, "User Already exist")
        );
      }

      const CreateAdmin = await Admin.create({
        name,
        email,
        password,
      });

      if (CreateAdmin) {
        res.status(201).json({
          _id: CreateAdmin._id,
          name: CreateAdmin.name,
          email: CreateAdmin.email,
          userType: "admin",
          token: generateToken(
            CreateAdmin._id,
            CreateAdmin.name,
            CreateAdmin.email,
            CreateAdmin.InsitutionName
          ),
          success: true,
        });
      } else {
        next(
          errorHandler(
            400,
            "Something Went Wrong"
          )
        );
      }
    } catch (error) {
      console.error("SignUp error", error);
      next(error);
    }
  })
);

//create timetable
router.post(
  "/createTimetable",
  handler(async (req, res) => {
    const formData = req.body;
    console.log(formData);
    const { teacherId, subjects } = formData;

    try {
      // Iterate through each subject in the request body
      for (const subject of subjects) {
        const {
          subjectId,
          days,
          timeRange, // Use timeRange instead of startTime and endTime
          batch,
          type,
          classroom,
        } = subject;

        // Check if the timetable entry already exists
        const existingEntry =
          await Timetable.findOne({
            teacherId,
            "subjects.days": days,
            "subjects.timeRange": timeRange, // Check for timeRange instead of startTime and endTime
            "subjects.subject": subjectId,
            "subjects.batch": batch,
            "subjects.type": type,
            "subjects.classroom": classroom,
          });

        if (existingEntry) {
          return res.status(400).json({
            message:
              "Duplicate entry: This timetable data already exists",
          });
        }

        // If not a duplicate, insert into the database
        await Timetable.findOneAndUpdate(
          { teacherId },
          {
            $push: {
              subjects: {
                subject: subjectId,
                days,
                timeRange, // Use timeRange instead of startTime and endTime
                batch,
                type,
                classroom,
              },
            },
          },
          { upsert: true }
        );
      }

      res.status(201).json({
        message: "Timetable created successfully",
      });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ message: error.message });
    }
  })
);


module.exports = router;

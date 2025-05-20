const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("../middleware/errorMiddleware.js");
const Admin = require("../models/adminModel.js");
const router = express.Router();
const handler = require("express-async-handler");
dotenv.config();

const bcrypt = require("bcryptjs");
const Student = require("../models/studentModel.js");
const Teacher = require("../models/teacherModel.js");
const authMid = require("../middleware/authMiddleware.js");

router.put(
  "/update",
  authMid,
  handler(async (req, res, next) => {
    try {
      const formData = req.body;
      const userId = req.user.id;

      console.log({ formData });

      let Model;
      // Determine the model based on user type
      if (formData.userType === "student") {
        Model = Student;
      } else if (
        formData.userType === "teacher"
      ) {
        Model = Teacher;
      } else if (formData.userType === "admin") {
        Model = Admin;
      } else {
        return next(
          errorHandler(400, "Invalid user type")
        );
      }

      const existingProfile =
        await Model.findById(userId);
      if (!existingProfile) {
        return next(
          errorHandler(
            404,
            "Profile not found, please try again!"
          )
        );
      }

      // Check if password is provided and update it
      if (formData.password) {
        const salt = await bcrypt.genSalt(10);
        formData.password = await bcrypt.hash(
          formData.password,
          salt
        );
      }

      // Update the user profile with the new data
      const updatedProfile =
        await Model.findByIdAndUpdate(
          userId,
          formData,
          { new: true }
        );

      res.json({
        updatedProfile,
        update: true,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
);


module.exports = router;

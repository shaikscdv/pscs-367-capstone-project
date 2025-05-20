const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("../middleware/errorMiddleware.js");
const router = express.Router();
const handler = require("express-async-handler");
const authMid = require("../middleware/authMiddleware.js");
const Semester = require("../models/semesterModel.js");
dotenv.config();

router.use(authMid);

router.get(
  "/getSub",
  handler(async (req, res, next) => {
    try {
      const semesterNumber =
        req.query.semesterNumber;
      console.log(semesterNumber);

      if (semesterNumber) {
        const semester = await Semester.findById(
          semesterNumber
        ).populate("subjects");
        if (semester) {
          res.status(200).json({
            success: true,
            subjects: semester.subjects,
          });
        } else {
          next(
            errorHandler(
              404,
              "Semester not found"
            )
          );
        }
      } else {
        next(
          errorHandler(404, "No subect Found")
        );
      }
    } catch (error) {
      console.log(
        "Getting all subjects error",
        error
      );
      next(error);
    }
  })
);

module.exports = router;

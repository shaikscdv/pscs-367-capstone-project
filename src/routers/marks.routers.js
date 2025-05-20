const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("../middleware/errorMiddleware.js");
const router = express.Router();
const handler = require("express-async-handler");
const authMid = require("../middleware/authMiddleware.js");
const Marks = require("../models/marksModel.js"); // Import the Marks model
dotenv.config();

router.use(authMid);

router.post(
  "/enterMarks",
  handler(async (req, res, next) => {
    try {
      const marksData = req.body;
      let newMarks;
      console.log(marksData);

      // Iterate over the marksData array and save each set of marks as a document in the database
      for (const marks of marksData) {
        const {
          subject,
          student,
          marks: marksArray,
        } = marks;

        // Create a new Marks document
        newMarks = new Marks({
          SubjectId: subject,
          StudentId: student,
          Marks: marksArray, // Assuming Math is the field in your Marks schema
        });

        await newMarks.save();
      }

      if (newMarks)
        res.send({
          success: true,
          message: "Marks uploaded successfully",
        });
      else {
        res.send({
          success: false,
          message: "Please Try again",
        });
      }
    } catch (error) {
      next(error);
      console.log(error);
    }
  })
);

router.post(
  "/viewmarks",
  handler(async (req, res, next) => {
    try {
      const stuId = req.user.id;
      console.log(stuId);

      const Student_marks = await Marks.find({
        StudentId: stuId,
      }).populate(
        "SubjectId",
        "subjectName subjectNumber"
      );

      console.log(Student_marks);
      res.send(Student_marks);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
);

router.get(
  "/marksReport/:subjectId",
  handler(async (req, res, next) => {
    try {
      const subjectId = req.params.subjectId;

      const Students_marks = await Marks.find({
        SubjectId: subjectId,
      }).populate("StudentId", "name");

      console.log(Students_marks);
      res.send(Students_marks);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
);

module.exports = router;

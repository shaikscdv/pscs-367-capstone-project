const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("../middleware/errorMiddleware.js");
const router = express.Router();
const handler = require("express-async-handler");
const authMid = require("../middleware/authMiddleware.js");
const Subject = require("../models/subjectModel.js");
const Semester = require("../models/semesterModel.js");
const Student = require("../models/studentModel.js");
dotenv.config();

//authorization
router.use(authMid);

router.post(
  "/addSubject",
  handler(async (req, res, next) => {
    try {
      const {
        subjectName,
        subjectNumber,
        semesterNumber,
        type,
      } = req.body;

      if (
        !subjectName ||
        !subjectNumber ||
        !semesterNumber ||
        !type
      ) {
        return next(
          errorHandler(
            400,
            "Please fill all details"
          )
        );
      }

      // Find existing subjects with the same name (case-insensitive), number, and type
      const existingSubject =
        await Subject.findOne({
          subjectName: {
            $regex: new RegExp(
              `^${subjectName}$`,
              "i"
            ),
          },
          subjectNumber,
          type,
        });

      if (existingSubject) {
        return next(
          errorHandler(
            400,
            "A subject with the same name, number, and type already exists"
          )
        );
      }

      // Create the new subject
      const subject = new Subject({
        subjectName,
        subjectNumber,
        semesterNumber,
        type,
      });

      const savedSubject = await subject.save();

      if (!savedSubject) {
        return next(
          errorHandler(
            500,
            "Failed to create subject"
          )
        );
      }

      // Create or update the semester
      let semester = await Semester.findOne({
        semesterNumber,
      });

      if (!semester) {
        // Create a new semester if it doesn't exist
        semester = new Semester({
          semesterNumber,
          subjects: [savedSubject._id], // Associate the subject with the semester
        });
      } else {
        // Update the existing semester by adding the subject
        semester.subjects.push(savedSubject._id);
      }

      await semester.save();

      res.status(201).json({
        success: true,
        message:
          "Subject added to semester successfully",
      });
    } catch (error) {
      console.log(
        "Error in subject adding or creating",
        error
      );
      next(error);
    }
  })
);


router.get(
  "/getAllSubject",
  handler(async (req, res, next) => {
    try {
      const semNo = req.query.semNo;
      console.log(semNo);

      if (semNo) {
        const semester = await Semester.findOne({
          semesterName: semNo,
        }).populate("subjects");
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
        const allSubjects = await Subject.find(
          {}
        );
        if (
          allSubjects &&
          allSubjects.length > 0
        ) {
          res.status(200).json({
            success: true,
            subjects: allSubjects,
          });
        } else {
          next(
            errorHandler(404, "No subjects found")
          );
        }
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

router.get(
  "/manageSubject/:id",
  handler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const subjectData = await Subject.findById(
        id
      );

      if (!subjectData) {
        next(
          errorHandler(404, "No Subject found !")
        );
      }

      if (subjectData) {
        res.status(200).json(subjectData);
      }
    } catch (error) {
      console.log("subject ==> ", data);
      next(error);
    }
  })
);

router.put(
  "/update/:id",
  handler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateSubject = req.body;

      const existingSubject =
        await Subject.findById(id);

      if (!existingSubject) {
        return res.status(404).json({
          success: false,
          error: "Subject not found",
        });
      }

      // Check if the semester number is being updated
      if (
        existingSubject.semesterNumber !==
        updateSubject.semesterNumber
      ) {
        const targetSemester =
          await Semester.findOne({
            semesterNumber:
              updateSubject.semesterNumber,
          });

        if (!targetSemester) {
          return res.status(404).json({
            success: false,
            error: "Target semester not found",
          });
        }

        // pull thi ae subject ae data entry mathi nikari jase
        const oldSemester =
          await Semester.findOneAndUpdate(
            { subjects: id },
            { $pull: { subjects: id } },
            { new: true }
          );

        //push thi ae subject beja data ma entry kari dease
        await Semester.findByIdAndUpdate(
          targetSemester._id,
          { $push: { subjects: id } },
          { new: true }
        );
      }

      // Update the subject
      const updatedSubjectData =
        await Subject.findByIdAndUpdate(
          id,
          updateSubject,
          { new: true }
        );

      if (!updatedSubjectData) {
        return next(
          errorHandler(404, "No Subject found !")
        );
      }

      res.json({
        success: true,
        message: "Subject updated successfully",
      });
    } catch (error) {
      console.log("subject ==> ", error);
      next(error);
    }
  })
);

router.delete(
  "/delete/:id",
  handler(async (req, res, next) => {
    try {
      const { id } = req.params;

      // Delete subject from the Subject database
      const deletedSubject =
        await Subject.findByIdAndDelete(id);
      if (!deletedSubject) {
        return res
          .status(404)
          .json({ error: "Subject not found" });
      }

      // Remove the subject reference from the Semesters
      const sem = await Semester.updateMany(
        { subjects: id },
        { $pull: { subjects: id } }
      );

      console.log(sem);

      res.status(200).json({
        success: true,
        message: "Subject deleted successfully",
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  })
);
router.get(
  "/SemSub",
  handler(async (req, res, next) => {
    try {
      const { semesterNumber } = req.query;

      console.log(semesterNumber);

      const findSubjectList =
        await Semester.findOne({
          semesterNumber,
        }).populate(
          "subjects",
          "subjectName subjectNumber"
        );

      if (!findSubjectList) {
        return next(
          errorHandler(
            404,
            "No subjects found for this semester"
          )
        );
      }

      // console.log(findSubjectList);

      if (findSubjectList.subjects.length === 0) {
        return next(
          errorHandler(
            404,
            "No subject found for this semester"
          )
        );
      }

      res.status(200).json({
        success: true,
        SemesterSubjects:
          findSubjectList.subjects,
      });
    } catch (error) {
      console.log(
        "All subjects of a semester error",
        error
      );
      next(error);
    }
  })
);

//getting student list for that semesters
router.get(
  "/getStudent/:id",
  handler(async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log("SemesterId --> ", id);

      const getSemester = await Semester.findOne({
        subjects: id,
      });

      console.log(getSemester);

      if (getSemester) {
        const getStudent = await Student.find({
          CurrentSemester: getSemester.id,
        }).populate(
          "CurrentSemester",
          "semesterNumber"
        );

        if (getStudent) {
          res.status(200).send(getStudent);
        } else {
          next(
            errorHandler(
              404,
              "No Student Found! "
            )
          );
        }
      } else {
        next(
          errorHandler(404, "No Student Found !")
        );
      }
    } catch (error) {
      console.log(
        "Student for that semester fetching error ",
        error
      );
      next(error);
    }
  })
);

module.exports = router;

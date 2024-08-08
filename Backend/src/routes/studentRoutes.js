const express = require("express");
const route = express.Router();
const studentController = require("../controller/studentController");

const authenticateToken = require("../middleware/authenticateToken");

// Route to create a new student, with authentication
route.post("/", authenticateToken, studentController.createNewStudentData);

// Route to get all student history, with authentication
route.get("/", authenticateToken, studentController.fetchAllStudentData);

// Route to get all student history, with authentication
route.put("/:id", authenticateToken, studentController.updateStudentController);

// Route to get all student history, with authentication
route.delete("/:id", authenticateToken, studentController.deleteStudentController);


module.exports = route;
const studentService = require("../services/studentService");

// Function to create a new student
const createNewStudentData = async (req, res) => {
    try {
        // Get the user ID from the request object
        const userId = req.user.id;

        // Get the student data from the request body and assign the user ID to it
        const studentData = req.body;
        studentData.userId = userId;

        // Call the student service to create a new student with the provided data
        const data = await studentService.CreateStudentData(studentData);

        // Send the response with the created student data
        res.status(201).json(data);
    } catch (error) {
        // If an error occurs, send an error response with the error message
        res.status(500).json({
            message: error.message,
        });
    }
}

// Function to get all student history
const fetchAllStudentData = async (req, res) => {
    try {
        // Get the user ID from the request object
        const userId = req.user.id;
        const query = req.query

        // Call the student service to get all student history for the user
        const fetchedData = await studentService.getAllStudentList(userId, query);

        // Send the response with the fetched student data
        res.status(200).json(fetchedData);
    } catch (error) {
        // If an error occurs, send an error response with the error message
        res.status(500).json({
            message: error.message,
        });
    }
}

// Controller function to handle updating a Student by its ID
const updateStudentController = async (req, res) => {
    try {
        // Get the Student ID from the request parameters
        const taskId = req.params.id;

        // Extract updated Student data from the request body
        const userData = req.body;

        // Get the user ID from the request
        const userId = req.user.id;

        // Call the Student service to update the Student by its ID and user ID with the provided data
        const updatedData = await studentService.updateStudentByID(userId, taskId, userData);

        if (!updatedData) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        // Send the response with the updated Student data
        res.status(200).json(updatedData);
    } catch (error) {
        // If an error occurs, send an error response
        res.status(500).json({
            message: error.message,
        });
    }
}

// Controller function to handle deleting a Student by its ID
const deleteStudentController = async (req, res) => {
    try {
        // Get the Student ID from the request parameters
        const taskId = req.params.id;

        // Get the user ID from the request
        const userId = req.user.id;

        // Call the Student service to delete the Student by its ID and user ID
        const deletedData = await studentService.deleteStudentById(userId, taskId);

        if(!deletedData) {
            return res.status(404).json({message : "Student not found"});
        }

        // Send a success response indicating the Student was deleted
        res.status(204).json({
            message: "Deleted successfully",
        });
    } catch (error) {
        // If an error occurs, send an error response
        res.status(500).json({
            message: error.message,
        });
    }
}




module.exports = {
    createNewStudentData,
    fetchAllStudentData,
    updateStudentController,
    deleteStudentController

}


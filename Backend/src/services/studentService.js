const Student = require("../model/student");

// Function to add a new student to the database
const CreateStudentData = async (data) => {
    try {
        // Create a new student document in the database with the provided data
        const responseData = await Student.create(data);
        return responseData;
    } catch (error) {
        // If an error occurs during the creation process, throw the error
        throw error;
    }
}

// Function to fetch students from the database based on specified criteria
const getAllStudentList = async (userId, query) => {
    try {
        const { name } = query;
        const filter = { userId };
        if (name) filter.name = name;
        const fetchAllData = await Student.find(filter);
        return fetchAllData;
    } catch (error) {
        // If an error occurs during the fetch process, throw the error
        throw error;
    }
}

const updateStudentByID = async (userId, taskId, studentData) => {
    try {
        // Update the Student with the specified ID and associated with the given user, with the provided data
        const responseData = await Student.findOneAndUpdate(
            { userId, _id: taskId },
            { $set: studentData },
            { new: true }
        );

        // If no Student is found for the provided ID and user, throw an error
        if (!responseData) {
            throw new Error("Student does not exist");
        }

        return responseData;
    } catch (error) {
        // If an error occurs during the update process, throw the error
        throw error;
    }
}

// Function to delete a Student by its ID
const deleteStudentById = async (userId, taskId) => {
    try {
        // Find and delete the Student with the specified ID and associated with the given user
        const responseData = await Student.findOneAndDelete({ userId, _id: taskId });
        return responseData;
    } catch (error) {
        // If an error occurs during the deletion process, throw the error
        throw error;
    }
}


module.exports = {
    CreateStudentData,
    getAllStudentList,
    updateStudentByID,
    deleteStudentById
}
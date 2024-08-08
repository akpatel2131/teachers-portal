const mongoose = require("mongoose");

// Define the schema for student messages
const studentSchema = new mongoose.Schema(
  {
    // The message content
    name: {
      type: String,
      required: true,
    },
    // The direction of the message (e.g., sent or received)
    subject: {
      type: String,
      required: true,
    },
    // The sender of the message
    marks: {
      type: Number,
      required: true,
    },
    // The ID of the user associated with this student message
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    // Enable timestamps to automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

// Create a Mongoose model for the student schema
const Student = mongoose.model("Student", studentSchema);

// Export the Student model to be used in other parts of the application
module.exports = Student;

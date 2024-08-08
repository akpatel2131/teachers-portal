import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./cards.css";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { config } from "../../App";

const StudentCards = ({ data, index, editIndex, setEditIndex, onSuccess }) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState(0);

  const updateStudentData = async (studentData) => {
    try {
      await axios.put(
        `${config.endpoint}/student/${data._id}`,
        {
          ...studentData,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      toast.success("Students data updated successfully", 3000);
      onSuccess();
      setEditIndex(null);
    } catch (error) {
      toast.error("Failed to update student data", 3000);
    }
  };

  const deleteStudentData = async () => {
    try {
      await axios.delete(
        `${config.endpoint}/student/${data._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      toast.success("Students data deleted successfully", 3000);
      onSuccess();
    } catch (error) {
      toast.error("Failed to delete student data", 3000);
    }
  };

  return (
    <div className="card-container">
      <div className="card-title"> Student Name </div>
      {editIndex === index ? (
        <input
          className="text-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      ) : (
        <div className="card-value">{data.name}</div>
      )}
      <div className="card-title">Subject Name </div>
      {editIndex === index ? (
        <input
          className="text-input"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
        />
      ) : (
        <div className="card-value">{data.subject}</div>
      )}
      <div className="card-title">Subject Marks </div>
      {editIndex === index ? (
        <input
          type="number"
          className="text-input"
          value={marks}
          onChange={(event) => setMarks(Number(event.target.value))}
        />
      ) : (
        <div className="card-value">{data.marks}</div>
      )}
      <div className="action-container">
        {editIndex === index ? (
          <>
            <Button
              variant="outlined"
              onClick={() => {
                const studentData = { name, subject, marks };
                updateStudentData(studentData);
              }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setEditIndex(null)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              onClick={() => {
                setName(data.name);
                setSubject(data.subject);
                setMarks(data.marks);
                setEditIndex(index);
              }}
            >
              <EditIcon />
            </Button>
            <Button variant="outlined" color="error" onClick={() => deleteStudentData()}>
              <DeleteIcon />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentCards;

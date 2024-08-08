import { Button, Divider, Modal, TextField } from "@mui/material";
import "./modal.css";
import ClearIcon from "@mui/icons-material/Clear"
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {config} from "../../App";

const StudentModal = ({ show, onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState(0);

  const handleSunbmit = async (data) => {
    try {
      await axios.post(
        `${config.endpoint}/student/`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      toast.success("Students data added successfully", 3000);
      onSuccess();
    } catch (error) {
      toast.error("Failed to add student data", 3000);
    }
  };

  return (
    <Modal open={show} onClose={onClose}>
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-title">Add Student</div>
          <ClearIcon onClick={onClose} className="cancel-icon" />
        </div>
        <Divider />
        <TextField
          label="Student Full Name"
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          label="Student Subject"
          onChange={(event) => setSubject(event.target.value)}
        />
        <TextField
          label="Student Marks"
          onChange={(event) => setMarks(event.target.value)}
        />
        <Button
          variant="outlined"
          disabled={!name || !subject || !marks}
          onClick={() => {
            const data = { name, subject, marks };
            handleSunbmit(data);
          }}
        >
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export default StudentModal;

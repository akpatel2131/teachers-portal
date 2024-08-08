import "./dashboard.css";
import StudentCards from "./utils/cards";
import StudentModal from "./utils/Modal";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import { Button, CircularProgress, Divider } from "@mui/material";
import { toast } from "react-toastify";
import {
  useEffectOnce,
  useUpdateEffect,
  useLocation,
  useWindowSize,
} from "react-use";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../App";
import EmptyData from "./utils/EmptyData"

const Dashboard = () => {
  const [studentData, setStudentData] = useState([]);
  const [editIndex, setEditIndex] = useState();
  const [showInputModal, setShowInputModal] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const userName = localStorage.getItem("userName")?.split("")[0];

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }
  }, [pathname]);

  const fetchStudentData = async () => {
    try {
      let path = `${config.endpoint}/student/`;
      if (search) {
        path = `${config.endpoint}/student/?name=${search}`;
      }
      const response = await axios.get(path, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setStudentData(response.data);
      toast.success("Students data fetched successfully", 3000);
    } catch (error) {
      toast.error(
        "There is some issue occured from our end. please try agian later",
        3000
      );
    } finally {
      setLoading(false)
    }
  };

  useEffectOnce(() => {
    if (localStorage.getItem("authToken")) {
      setLoading(true);
      fetchStudentData();
    }
  });

  useUpdateEffect(() => {
    if (!search) {
      setLoading(true);
      fetchStudentData();
    }
  }, [search]);

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="heading">
            Teacher <span className="portal">Portal</span>
          </div>
          <div>
            <input
              className="search-input"
              placeholder="Search Student"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <Button variant="contained" onClick={() => fetchStudentData()}>
              <SearchIcon />
            </Button>
          </div>
          <div className="dashboard-action">
            <Button variant="contained" onClick={() => setShowInputModal(true)}>
              <AddIcon />
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              color="error"
            >
              <LogoutIcon />
            </Button>
            <div className="dashboard-user-icon">{userName}</div>
          </div>
        </div>
        {loading ? (
          <CircularProgress color="secondary" />
        ) : studentData.length > 0 ? (
          <div className="student-cards-container">
            {studentData.map((item, index) => (
              <StudentCards
                data={item}
                index={index}
                editIndex={editIndex}
                setEditIndex={setEditIndex}
                onSuccess={() => fetchStudentData()}
              />
            ))}
          </div>
        ) : <EmptyData />}
      </div>
      <StudentModal
        show={showInputModal}
        onClose={() => setShowInputModal(false)}
        onSuccess={async () => {
          await fetchStudentData();
          setShowInputModal(false);
        }}
      />
    </>
  );
};

export default Dashboard;

import { Grid, TextField } from "@mui/material";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { db } from "../../../firebaseconfig";
import SideJobCard from "./SideJobCard";

const mockData = [
  {
    jobTitle: "Software Engineer",
    jobLocation: "Remote",
    createdAt: "2021-09-01",
    jobType: "Full Time",
    jobId: "1234",
  },
  {
    jobTitle: "UI Designer",
    jobLocation: "Remote",
    createdAt: "2021-09-01",
    jobType: "Full Time",
    jobId: "1235",
  },
  {
    jobTitle: "Full Stack Developer",
    jobLocation: "Remote",
    createdAt: "2021-09-01",
    jobType: "Full Time",
    jobId: "1334",
  },
  {
    jobTitle: "Java Developer",
    jobLocation: "Remote",
    createdAt: "2021-09-01",
    jobType: "Full Time",
    jobId: "1244",
  },
  {
    jobTitle: "HR Manager",
    jobLocation: "Remote",
    createdAt: "2021-09-01",
    jobType: "Full Time",
    jobId: "2234",
  },
  {
    jobTitle: "Frontend Developer",
    jobLocation: "Remote",
    createdAt: "2021-09-01",
    jobType: "Full Time",
    jobId: "2236",
  },
  {
    jobTitle: "UX Researcher",
    jobLocation: "Remote",
    createdAt: "2021-09-01",
    jobType: "Full Time",
    jobId: "1345",
  },
  {
    jobTitle: "Data Engineer",
    jobLocation: "Remote",
    createdAt: "2021-09-01",
    jobType: "Full Time",
    jobId: "3234",
  },
  {
    jobTitle: "Data Scientist",
    jobLocation: "Remote",
    createdAt: "2021-09-01",
    jobType: "Full Time",
    jobId: "1274",
  },
  {
    jobTitle: "SDE-2",
    jobLocation: "Remote",
    createdAt: "2021-09-01",
    jobType: "Full Time",
    jobId: "7239",
  },
];

const Sidebar = ({ postAJob, selectedJob, selectedAjob }) => {
  const [userData, dispatch] = useContext(UserContext);
  const [allJobs, setAllJobs] = useState(null);

  const fetchAllJobs = () => {
    const q = query(
      collection(db, "jobs"),
      where("employerId", "==", userData.user.email)
    );
    onSnapshot(q, (snapshot) => {
      let jobs = [];
      snapshot.forEach((doc) => {
        jobs.push(doc.data());
      });
      setAllJobs(jobs);
      console.log(jobs);
    });
  };
  useEffect(() => {
    fetchAllJobs();
  }, []);
  return (
    <div
      style={{
        padding: "8px",
        background: "#ffffff",
        height: "100%",
      }}
    >
      <Grid container className="postBtn" onClick={postAJob}>
        <Grid item className="maintext">
          + Post A Job
        </Grid>
        <Grid item className="subtext">
          Post your requirements and hire candidates
        </Grid>
      </Grid>
      <div>
        <TextField
          sx={{
            fieldset: {
              borderRadius: "20px",
            },
          }}
          fullWidth
          size="small"
          placeholder="Search Jobs"
        />
      </div>
      <div>
        {allJobs && allJobs.length === 0 ? (
          <div>No Jobs Posted</div>
        ) : allJobs && allJobs.length > 0 ? (
          <div>
            {allJobs.map((data) => {
              return (
                <SideJobCard
                  selectedJob={selectedJob}
                  selectedAjob={selectedAjob}
                  data={data}
                  key={data.jobId}
                />
              );
            })}
          </div>
        ) : (
          <div>Loading...</div>
        )}{" "}
      </div>
    </div>
  );
};

export default Sidebar;

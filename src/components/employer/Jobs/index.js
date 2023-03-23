import { Grid } from "@mui/material";
import React, { useState } from "react";
import Form from "./Form";
import Sidebar from "./Sidebar";
import "./jobs.css";

const EmployerJobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const postAJob = () => {
    setShowForm(true);
    setSelectedJob(null);
  };

  const selectedAjob = (job) => {
    setSelectedJob(job);
    setShowForm(true);
  };

  return (
    <Grid container spacing={2}>
      <Grid
        sx={{ display: { xs: showForm ? "none" : "block", md: "block" } }}
        item
        xs={12}
        md={3}
      >
        <Sidebar
          selectedJob={selectedJob}
          selectedAjob={selectedAjob}
          postAJob={postAJob}
        />
      </Grid>
      <Grid
        sx={{ display: { xs: showForm ? "block" : "none", md: "block" } }}
        item
        xs={12}
        md={9}
      >
        <Form selectedJob={selectedJob} setShowForm={setShowForm} />
      </Grid>
    </Grid>
  );
};

export default EmployerJobs;

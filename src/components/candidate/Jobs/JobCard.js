import { Button, Grid } from "@mui/material";
import moment from "moment/moment";
import React from "react";

const JobCard = ({ job, applyForJob }) => {
  const {
    comany_logo,
    createdAt,
    joblocation,
    employerName,
    jobId,
    jobTitle,
    jobType,
    salary,
    yearsOfExperience,
    comany_tag = "hello",
    company_size = "100-500",
  } = job;
  return (
    <div className="job-card-container">
      <Grid sx={{ marginBottom: "30px" }} container spacing={2}>
        <Grid item xs={12} md={3}>
          <img width="100%" src={comany_logo} alt="company logo" />
        </Grid>
        <Grid
          className="job-card-container_title"
          sx={{ textAlign: "left" }}
          item
          xs={12}
          md={9}
        >
          <h2>{employerName}</h2>
          <h5>{comany_tag}</h5>
          <h6>{company_size}</h6>
        </Grid>
      </Grid>
      <Grid className="job-card-container_content" container spacing={2}>
        <Grid item xs={12} md={3}>
          {jobTitle}
        </Grid>
        <Grid item xs={12} md={2}>
          {joblocation}
        </Grid>
        <Grid item xs={12} md={3}>
          {salary.currency} {salary.min} - {salary.max}
        </Grid>
        <Grid item xs={12} md={2}>
          {moment(createdAt).startOf("hour").fromNow()}'
        </Grid>
        <Grid item xs={12} md={2}>
          <Button onClick={() => applyForJob(job)} className="apply-btn">
            Apply button
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default JobCard;

import React, { useContext, useEffect, useState } from "react";
import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import Dropdown from "../../common/Dropdown";
import SearchDropDown from "../../common/SearchDropDown";
import { skills, jobType, experience, currency } from "../../../content";
import FileUpload from "../../common/FileUpload";
import "./jobs.css";
import { UserContext } from "../../../context/userContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseconfig";
import { v4 as uuiv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import toastMessage from "../../../util/toastMessage";

const initialState = {
  jobType: "",
  jobLocation: "",
  jobTitle: "",
  yearsOfExperience: "",
  salary: {
    min: "",
    max: "",
    currency: "",
  },
  jobDescription: "",
  skills: [],
};

const Form = ({ setShowForm, selectedJob }) => {
  const [jobData, setJobData] = useState({
    ...initialState,
  });

  useEffect(() => {
    if (selectedJob) {
      setJobData({ ...selectedJob });
    } else {
      setJobData({
        ...initialState,
      });
    }
  }, [selectedJob]);

  const [loading, setLoading] = useState(false);
  const [userData, dispatch] = useContext(UserContext);
  console.log(userData.user);

  const handleSkills = (data, type) => {
    if (type === "delete") {
      let new_data = jobData.skills.filter((skill) => skill !== data);
      setJobData({ ...jobData, skills: new_data });
    } else {
      if (jobData.skills.find((skill) => skill === data)) {
      } else {
        let new_data = [...jobData.skills, data];
        setJobData({ ...jobData, skills: new_data });
      }
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const jobId = selectedJob ? selectedJob.jobId : uuiv4();
    setLoading(true);
    try {
      await setDoc(doc(db, "jobs", jobId), {
        ...jobData,
        jobId,
        createdAt: new Date().toISOString(),
        employerId: userData.user.email,
        employerName: userData.userInfo.company_name,
        employerLogo: userData.userInfo.logo,
      });
      if (selectedJob) {
        toastMessage("Job updated successfully", "success");
      } else {
        toastMessage("Job posted successfully", "success");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toastMessage("Something went wrong", "danger");
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setShowForm(false)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        Back
      </Button>
      <form onSubmit={submit}>
        <Grid
          sx={{ background: "#fff" }}
          container
          spacing={5}
          className="jobform-container"
        >
          <Grid item xs={12} md={6}>
            <label>Job Title</label>
            <TextField
              required={true}
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              value={jobData.jobTitle}
              onChange={(e) =>
                setJobData({
                  ...jobData,
                  jobTitle: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Location</label>
            <TextField
              required={true}
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              type={"text"}
              value={jobData.jobLocation}
              onChange={(e) =>
                setJobData({
                  ...jobData,
                  jobLocation: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Job type</label>
            <Dropdown
              required={true}
              options={jobType}
              onChange={(data) => setJobData({ ...jobData, jobType: data })}
              value={jobData.jobType}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Years of Experience</label>
            <Dropdown
              required={true}
              options={experience}
              onChange={(data) =>
                setJobData({ ...jobData, yearsOfExperience: data })
              }
              value={jobData.yearsOfExperience}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Salary</label>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Dropdown
                  required={true}
                  options={currency}
                  onChange={(data) =>
                    setJobData({
                      ...jobData,
                      salary: {
                        ...jobData.salary,
                        currency: data,
                      },
                    })
                  }
                  value={jobData.salary.currency}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  required={true}
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={jobData.salary.min}
                  onChange={(e) =>
                    setJobData({
                      ...jobData,
                      salary: {
                        ...jobData.salary,
                        min: e.target.value,
                      },
                    })
                  }
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  required={true}
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={jobData.salary.max}
                  onChange={(e) =>
                    setJobData({
                      ...jobData,
                      salary: {
                        ...jobData.salary,
                        max: e.target.value,
                      },
                    })
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <label>Job Description</label>
            <TextField
              multiline
              minRows={4}
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              value={jobData.jobDescription}
              onChange={(e) =>
                setJobData({
                  ...jobData,
                  jobDescription: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Skills</label>
            <SearchDropDown
              required={true}
              options={skills}
              onChange={(data) => handleSkills(data, "add")}
              values={jobData.skills}
              onDelete={(data) => handleSkills(data, "delete")}
            />
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {loading ? (
              <button className="submit-btn" type="button">
                <CircularProgress />
              </button>
            ) : (
              <button
                className="submit-btn"
                disabled={jobData.resume === ""}
                type="submit"
              >
                Submit
              </button>
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Form;

// import React, { useContext, useState } from "react";

// const EmployerOnboarding = () => {
//
//   const navigate = useNavigate();
//   const [jobData, setJobData] = useState({
//     company_name: "",
//     name: userData.user.displayName,
//     email: userData.user.email,
//     phone: "",
//     location: "",
//     industry_type: "",
//     userRole: "",
//     website: "",
//     linkedIn: "",
//     facebook: "",
//     twitter: "",
//     instagram: "",
//     company_size: "",
//     company_tagline: "",
//     company_bio: "",
//     logo: "",
//     portfolio: "",
//   });

//   //   const handleSkills = (data, type) => {
//   //     if (type === "delete") {
//   //       let new_data = jobData.skills.filter((skill) => skill !== data);
//   //       setJobData({ ...jobData, skills: new_data });
//   //     } else {
//   //       if (jobData.skills.find((skill) => skill === data)) {
//   //       } else {
//   //         let new_data = [...jobData.skills, data];
//   //         setJobData({ ...jobData, skills: new_data });
//   //       }
//   //     }
//   //   };

//   const submit = async (e) => {
//     e.preventDefault();
//     console.log(jobData);
//     try {
//       await setDoc(doc(db, "users", userData.user.email), {
//         ...jobData,
//         userType: "employer",
//       });
//       toastMessage("Onboarding Successful", "success");
//       navigate("/employer/profile");
//       setLoading(false);
//     } catch (e) {
//       console.log(e);
//       toastMessage("Onboarding Failed", "danger");
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//
//     </div>
//   );
// };

// export default EmployerOnboarding;

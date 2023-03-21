import React, { useContext, useState } from "react";
import { Grid, TextField, Button, CircularProgress } from "@mui/material";
import "./onboarding.css";
import SearchDropDown from "../../common/SearchDropDown";
import Dropdown from "../../common/Dropdown";
import { skills, experience, primaryRole } from "../../../content";
import FileUpload from "../../common/FileUpload";
import { doc, setDoc } from "firebase/firestore";
import { UserContext } from "../../../context/userContext";
import { db } from "../../../firebaseconfig";
import { useNavigate } from "react-router-dom";
import toastMessage from "../../../util/toastMessage";

const CandidateOnboarding = () => {
  const [userData, dispatch] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userInformation, setUserInformation] = useState({
    name: userData.user.displayName,
    email: userData.user.email,
    phone: "",
    location: "",
    skills: [],
    primaryRole: "",
    linkedIn: "",
    experience: "",
    bio: "",
    resume: "",
    portfolio: "",
  });

  // console.log(userData.user.email);

  const handleSkills = (data, type) => {
    if (type === "delete") {
      let new_data = userInformation.skills.filter((skill) => skill !== data);
      setUserInformation({ ...userInformation, skills: new_data });
    } else {
      if (userInformation.skills.find((skill) => skill === data)) {
      } else {
        let new_data = [...userInformation.skills, data];
        setUserInformation({ ...userInformation, skills: new_data });
      }
    }
  };

  const submit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(userInformation);
    try {
      await setDoc(doc(db, "users", userData.user.email), {
        ...userInformation,
        userType: "candidate",
      });
      toastMessage("Onboarding Successful", "success");
      navigate("/candidate/profile");
      setLoading(false);
    } catch (e) {
      console.log(e);
      toastMessage("Onboarding Failed", "danger");
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => submit(e)}>
        <Grid container spacing={2} className="onboarding-container">
          <Grid item xs={12}>
            <h1>ONBOARDING CANDIDATE</h1>
          </Grid>
          <Grid item xs={12} md={6}>
            <label>Name</label>
            <TextField
              required={true}
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              value={userInformation.name}
              onChange={(e) =>
                setUserInformation({ ...userInformation, name: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Email</label>
            <TextField
              required={true}
              id="outlined-basic"
              variant="outlined"
              size="small"
              type={"email"}
              fullWidth
              value={userInformation.email}
              onChange={(e) =>
                setUserInformation({
                  ...userInformation,
                  email: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label>Phone</label>
            <TextField
              required={true}
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              type={"number"}
              value={userInformation.phone}
              onChange={(e) =>
                setUserInformation({
                  ...userInformation,
                  phone: e.target.value,
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
              value={userInformation.location}
              onChange={(e) =>
                setUserInformation({
                  ...userInformation,
                  location: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label>Primary Role</label>
            <Dropdown
              required={true}
              options={primaryRole}
              onChange={(data) =>
                setUserInformation({ ...userInformation, primaryRole: data })
              }
              value={userInformation.primaryRole}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label>LinkedIn</label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              type={"url"}
              fullWidth
              value={userInformation.linkedIn}
              onChange={(e) =>
                setUserInformation({
                  ...userInformation,
                  linkedIn: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label>Experience</label>
            <Dropdown
              required={true}
              options={experience}
              onChange={(data) =>
                setUserInformation({ ...userInformation, experience: data })
              }
              value={userInformation.experience}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label>Bio</label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              value={userInformation.bio}
              onChange={(e) =>
                setUserInformation({
                  ...userInformation,
                  bio: e.target.value,
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
              values={userInformation.skills}
              onDelete={(data) => handleSkills(data, "delete")}
            />
          </Grid>
          <Grid item xs={12}>
            <FileUpload
              required={true}
              filetype={"doc"}
              onUpload={(url) =>
                setUserInformation({ ...userInformation, resume: url })
              }
              value={userInformation.resume}
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
                disabled={userInformation.resume === ""}
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

export default CandidateOnboarding;

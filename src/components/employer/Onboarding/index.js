import React, { useContext, useState } from "react";
import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import "./onboarding.css";
import Dropdown from "../../common/Dropdown";
import { companySize, industryType, primaryRole } from "../../../content";
import FileUpload from "../../common/FileUpload";
import { UserContext } from "../../../context/userContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseconfig";
import { useNavigate } from "react-router-dom";
import toastMessage from "../../../util/toastMessage";

const EmployerOnboarding = () => {
  const [userData, dispatch] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userInformation, setUserInformation] = useState({
    company_name: "",
    name: userData.user.displayName,
    email: userData.user.email,
    phone: "",
    location: "",
    industry_type: "",
    userRole: "",
    website: "",
    linkedIn: "",
    facebook: "",
    twitter: "",
    instagram: "",
    company_size: "",
    company_tagline: "",
    company_bio: "",
    logo: "",
    portfolio: "",
  });

  //   const handleSkills = (data, type) => {
  //     if (type === "delete") {
  //       let new_data = userInformation.skills.filter((skill) => skill !== data);
  //       setUserInformation({ ...userInformation, skills: new_data });
  //     } else {
  //       if (userInformation.skills.find((skill) => skill === data)) {
  //       } else {
  //         let new_data = [...userInformation.skills, data];
  //         setUserInformation({ ...userInformation, skills: new_data });
  //       }
  //     }
  //   };

  const submit = async (e) => {
    e.preventDefault();
    console.log(userInformation);
    try {
      await setDoc(doc(db, "users", userData.user.email), {
        ...userInformation,
        userType: "employer",
      });
      toastMessage("Onboarding Successful", "success");
      navigate("/employer/profile");
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
            <h1>ONBOARDING EMPLOYER</h1>
          </Grid>
          <Grid item xs={12} md={6}>
            <label>Company Name</label>
            <TextField
              required={true}
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              value={userInformation.company_name}
              onChange={(e) =>
                setUserInformation({
                  ...userInformation,
                  company_name: e.target.value,
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
            <label>Industry type</label>
            <Dropdown
              required={true}
              options={industryType}
              onChange={(data) =>
                setUserInformation({ ...userInformation, industry_type: data })
              }
              value={userInformation.industry_type}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Company size</label>
            <Dropdown
              required={true}
              options={companySize}
              onChange={(data) =>
                setUserInformation({ ...userInformation, company_size: data })
              }
              value={userInformation.company_size}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Email</label>
            <TextField
              disabled={true}
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
            <label>Your name</label>
            <TextField
              required={true}
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              value={userInformation.name}
              onChange={(e) =>
                setUserInformation({
                  ...userInformation,
                  name: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Your role</label>
            <Dropdown
              required={true}
              options={primaryRole}
              onChange={(data) =>
                setUserInformation({ ...userInformation, userRole: data })
              }
              value={userInformation.userRole}
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
            <label>Website</label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              type={"url"}
              fullWidth
              value={userInformation.website}
              onChange={(e) =>
                setUserInformation({
                  ...userInformation,
                  website: e.target.value,
                })
              }
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
            <label>Facebook</label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              type={"url"}
              fullWidth
              value={userInformation.facebook}
              onChange={(e) =>
                setUserInformation({
                  ...userInformation,
                  facebook: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Twitter</label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              type={"url"}
              fullWidth
              value={userInformation.twitter}
              onChange={(e) =>
                setUserInformation({
                  ...userInformation,
                  twitter: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Instagram</label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              type={"url"}
              fullWidth
              value={userInformation.instagram}
              onChange={(e) =>
                setUserInformation({
                  ...userInformation,
                  instagram: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <label>Company Tagline</label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              value={userInformation.company_tagline}
              onChange={(e) =>
                setUserInformation({
                  ...userInformation,
                  company_tagline: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <label>Company Bio</label>
            <TextField
              multiline
              minRows={4}
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              value={userInformation.company_bio}
              onChange={(e) =>
                setUserInformation({
                  ...userInformation,
                  company_bio: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <FileUpload
              required={true}
              filetype={"image"}
              onUpload={(url) =>
                setUserInformation({ ...userInformation, logo: url })
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

export default EmployerOnboarding;

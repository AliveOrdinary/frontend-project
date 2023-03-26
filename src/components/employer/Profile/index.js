import React, { useContext, useEffect, useState } from "react";
import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import "./profile.css";
import Dropdown from "../../common/Dropdown";
import { companySize, industryType, primaryRole } from "../../../content";
import FileUpload from "../../common/FileUpload";
import { UserContext } from "../../../context/userContext";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseconfig";
import { useNavigate } from "react-router-dom";
import toastMessage from "../../../util/toastMessage";
import FormLoading from "../../common/Loading/FormLoading";

const EmployerProfile = () => {
  const [userData, dispatch] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
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
      toastMessage("Data updated successfully", "success");
      navigate("/employer/profile");
      setLoading(false);
    } catch (e) {
      console.log(e);
      toastMessage("Failed", "danger");
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const docRef = doc(db, "users", userData.user.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUserInformation(docSnap.data());
        setScreenLoading(false);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        setScreenLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {screenLoading ? (
        <FormLoading fields={20} height={100} />
      ) : (
        <form onSubmit={(e) => submit(e)}>
          <Grid container spacing={2} className="onboarding-container">
            <Grid item xs={12} md={6}>
              <h1>EMPLOYER PROFILE</h1>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              // style={{
              //   display: "flex",s
              //   justifyContent: "center",
              // }}
            >
              {loading ? (
                <button className="submit-btn" type="button">
                  <CircularProgress />
                </button>
              ) : (
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  {isEdit ? (
                    <div>
                      <button
                        className="submit-btn"
                        //   disabled={userInformation.resume === ""}
                        type="submit"
                        style={{
                          marginLeft: "10px",
                          marginRight: "10px",
                          backgroundColor: "red",
                        }}
                        onClick={() => setIsEdit(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="submit-btn"
                        //   disabled={userInformation.resume === ""}
                        type="submit"
                        onClick={() => setIsEdit(false)}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      className="submit-btn"
                      //   disabled={userInformation.resume === ""}
                      type="submit"
                      onClick={() => setIsEdit(true)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                    className="submit-btn"
                    disabled={userInformation.resume === ""}
                    type="submit"
                  >
                    Logout
                  </button>
                </div>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <label>Company Name</label>
              <TextField
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
                required={true}
                options={industryType}
                onChange={(data) =>
                  setUserInformation({
                    ...userInformation,
                    industry_type: data,
                  })
                }
                value={userInformation.industry_type}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <label>Company size</label>
              <Dropdown
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
                required={true}
                filetype={"image"}
                onUpload={(url) =>
                  setUserInformation({ ...userInformation, logo: url })
                }
                value={userInformation.logo}
              />
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  );
};

export default EmployerProfile;

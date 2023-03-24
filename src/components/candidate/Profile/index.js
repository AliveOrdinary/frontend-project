import React, { useContext, useEffect, useState } from "react";
import { Grid, TextField, Button, CircularProgress } from "@mui/material";
import "./profile.css";
import SearchDropDown from "../../common/SearchDropDown";
import Dropdown from "../../common/Dropdown";
import { skills, experience, primaryRole } from "../../../content";
import FileUpload from "../../common/FileUpload";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { UserContext } from "../../../context/userContext";
import { db } from "../../../firebaseconfig";
import { useNavigate } from "react-router-dom";
import toastMessage from "../../../util/toastMessage";
import FormLoading from "../../common/Loading/FormLoading";

const CandidateProfile = () => {
  const [userData, dispatch] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [screenLoading, setScreenLoading] = useState(true);
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

  const fetchData = async () => {
    const docRef = doc(db, "users", userData.user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserInformation(docSnap.data());
      setScreenLoading(false);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      setScreenLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      toastMessage("Data updated Successfully", "success");
      navigate("/candidate/profile");
      setLoading(false);
    } catch (e) {
      console.log(e);
      toastMessage("Failed", "danger");
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "7vh" }}>
      {screenLoading ? (
        <FormLoading fields={10} height={100} />
      ) : (
        <form onSubmit={(e) => submit(e)}>
          <Grid container spacing={2} className="onboarding-container">
            <Grid item xs={12} md={6}>
              <h1>CANDIDATE PROFILE</h1>
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
              <label>Name</label>
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
              <label>Email</label>
              <TextField
                disabled={!isEdit}
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
              <label>Primary Role</label>
              <Dropdown
                disabled={!isEdit}
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
              <label>Experience</label>
              <Dropdown
                disabled={!isEdit}
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
                disabled={!isEdit}
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
                disabled={!isEdit}
                required={true}
                options={skills}
                onChange={(data) => handleSkills(data, "add")}
                values={userInformation.skills}
                onDelete={(data) => handleSkills(data, "delete")}
              />
            </Grid>
            <Grid item xs={12}>
              <FileUpload
                disabled={!isEdit}
                required={true}
                filetype={"doc"}
                onUpload={(url) =>
                  setUserInformation({ ...userInformation, resume: url })
                }
                value={userInformation.resume}
              />
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  );
};

export default CandidateProfile;

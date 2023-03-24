import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useContext } from "react";
import { db } from "../../../firebaseconfig";
import "./job.css";
import JobCard from "./JobCard";
import { v4 as uuiv4 } from "uuid";
import { UserContext } from "../../../context/userContext";
import toastMessage from "../../../util/toastMessage";

const CandidateJobs = () => {
  const [userData, dispatch] = useContext(UserContext);
  const [jobs, setJobs] = React.useState([]);
  const fetchAllJobs = async () => {
    try {
      const q = query(collection(db, "jobs"));

      const data = await getDocs(q);
      let j = [];
      data.forEach((doc) => {
        console.log(doc.data());
        j.push(doc.data());
      });
      setJobs(j);
    } catch (error) {
      console.log(error);
    }
  };

  const applyForJob = async (job) => {
    const q = query(
      collection(db, "applications"),
      where("candidateId", "==", userData.user.email)
    );
    const data = await getDocs(q);
    let applications = [];
    data.forEach((doc) => {
      applications.push(doc.data());
    });
    let alreadyApplied = applications.find((application) => {
      return application.jobId === job.jobId;
    });
    if (alreadyApplied) {
      toastMessage("Already applied for this job", "warning");
      return;
    }
    try {
      const applicationId = uuiv4();
      await setDoc(doc(db, "applications", applicationId), {
        applicationId,
        candidateId: userData.user.email,
        candidateName: userData.user.displayName,
        employerId: job.employerId,
        employerName: job.employerName,
        jobId: job.jobId,
        jobTitle: job.jobTitle,
        jobType: job.jobType,
        jobLocation: "Bangalore",
        resume: userData.userInfo.resume,
      });
      toastMessage("Applied for job successfully", "success");
    } catch (error) {
      console.log(error);
      toastMessage("Error applying for job", "danger");
    }
  };

  React.useEffect(() => {
    fetchAllJobs();
  }, []);
  return (
    <div className="jobs-container" style={{ marginTop: "7vh" }}>
      {jobs && jobs.length === 0 ? (
        <div>No Jobs Found</div>
      ) : jobs && jobs.length > 0 ? (
        <div>
          {jobs.map((job) => {
            return (
              <JobCard applyForJob={applyForJob} key={job.jobId} job={job} />
            );
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CandidateJobs;

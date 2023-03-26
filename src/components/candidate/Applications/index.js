import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../firebaseconfig/index";
import { collection, getDocs, query, where } from "firebase/firestore";
import { UserContext } from "../../../context/userContext";
import Table from "../../common/Table";

const columns = [
  {
    Header: "Company",
    datakey: "employerName",
    style: { width: "25%" },
  },
  {
    Header: "Job Title",
    datakey: "jobTitle",
    style: { width: "25%" },
  },
  {
    Header: "Interest Shown",
    datakey: "createdAt",
    type: "date",
    style: { width: "25%" },
  },
  {
    Header: "Status",
    datakey: "status",
    style: { width: "25%" },
  },
];

const CandidateApplications = () => {
  const [applications, setApplications] = useState(null);
  const [userData, dispatch] = useContext(UserContext);
  const fetchSllApplications = async () => {
    try {
      const q = query(
        collection(db, "applications"),
        where("candidateId", "==", userData.user.email)
      );
      const data = await getDocs(q);
      let apps = [];
      data.forEach((doc) => {
        apps.push(doc.data());
      });
      setApplications(apps);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSllApplications();
  }, []);

  return applications && applications.length === 0 ? (
    <div style={{ marginTop: "7vh" }}>No Applications Found</div>
  ) : applications && applications.length > 0 ? (
    <div style={{ marginTop: "7vh" }}>
      <Table columns={columns} data={applications} />
    </div>
  ) : (
    <div style={{ marginTop: "7vh" }}>Loading</div>
  );
};

export default CandidateApplications;

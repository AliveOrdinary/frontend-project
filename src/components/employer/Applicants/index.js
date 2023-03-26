import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../firebaseconfig";
import { UserContext } from "../../../context/userContext";
import Table from "../../common/Table";
import toastMessage from "../../../util/toastMessage";
import { v4 as uuidv4 } from "uuid";

const columns = [
  {
    Header: "Candidate Name",
    datakey: "candidateName",
    style: { width: "25%" },
  },
  {
    Header: "Job Title",
    datakey: "jobTitle",
    style: { width: "25%" },
  },
  {
    Header: "resume",
    datakey: "resume",
    type: "doc",
    style: { width: "25%" },
  },
  {
    Header: "Action",
    datakey: "action",
    type: "action",
    style: { width: "25%" },
  },
];

const EmployerApplicants = () => {
  const [applicants, setApplicants] = useState(null);
  const [userData, dispatch] = useContext(UserContext);
  const fetchAllApplicants = async () => {
    const q = query(
      collection(db, "applications"),
      where("employerId", "==", userData.user.email)
    );
    onSnapshot(q, (querySnapshot) => {
      let apps = [];
      querySnapshot.forEach((doc) => {
        apps.push(doc.data());
      });
      setApplicants(apps);
    });
  };

  useEffect(() => {
    fetchAllApplicants();
  }, []);

  const handleActions = async (type, data) => {
    console.log(type, data);
    if (type === "accept") {
      try {
        //accept the application
        const last_message_id = uuidv4();
        const conversationKey = uuidv4();
        const conversation_id = uuidv4();
        await setDoc(doc(db, "last_messages", last_message_id), {
          last_message_id,
          last_message: `Hey ${data.candidateName}, I have accepted your application for the job ${data.jobTitle}. Please contact me for further details.`,
          createdAt: new Date().toISOString(),
          conversationKey,
          employerId: userData.user.email,
          candidateId: data.candidateId,
          employerName: data.user.displayName,
          candidateName: data.candidateName,
        });
        await setDoc(doc(db, "conversations", conversation_id), {
          conversation_id,
          conversationKey,
          senderId: userData.user.email,
          messages: `Hey ${data.candidateName}, I have accepted your application for the job ${data.jobTitle}. Please contact me for further details.`,
          createdAt: new Date().toISOString(),
        });
        await setDoc(
          doc(db, "applications", data.applicationId),
          {
            status: "accepted",
          },
          { merge: true }
        );
        toastMessage("Application accepted", "success");
      } catch (error) {
        console.log(error);
        toastMessage("Something went wrong", "danger");
      }
    } else if (type === "reject") {
      //reject the application
      try {
        const doc_ref = doc(db, "applications", data.applicationId);
        await deleteDoc(doc_ref);
        toastMessage("Success", "Application rejected", "success");
      } catch (error) {
        console.log(error);
        toastMessage("Error", "Something went wrong", "error");
      }
    }
  };

  return applicants && applicants.length === 0 ? (
    <div>No applicants</div>
  ) : applicants && applicants.length > 0 ? (
    <div>
      <Table
        handleActions={handleActions}
        columns={columns}
        data={applicants}
      />
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default EmployerApplicants;

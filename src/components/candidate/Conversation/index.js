import { Grid } from "@mui/material";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { db } from "../../../firebaseconfig";
import { v4 as uuidv4 } from "uuid";
import LastMessage from "../../common/conversationComponents/LastMessage";
import MessageArea from "../../common/conversationComponents/MessageArea";

const CandidateConversation = () => {
  const [userData, dispatch] = useContext(UserContext);
  const [lastMessages, setLastMessages] = useState(null);
  const [mobileViewLastMessages, setMobileViewLastMessages] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [allCOnversations, setAllCOnversations] = useState(null);
  const fetchLastMessages = async () => {
    const q = query(
      collection(db, "last_messages"),
      where("candidateId", "==", userData.user.email)
    );
    onSnapshot(q, (querySnapshot) => {
      let lastMessages = [];
      querySnapshot.forEach((doc) => {
        lastMessages.push(doc.data());
      });
      setLastMessages(lastMessages);
    });
  };

  useEffect(() => {
    fetchLastMessages();
  }, []);

  useEffect(() => {
    if (selectedMessage) {
      fetchAllCOnversations();
    }
  }, [selectedMessage]);

  const fetchAllCOnversations = async () => {
    const q = query(
      collection(db, "conversations"),
      where("conversationKey", "==", selectedMessage.conversationKey)
    );
    onSnapshot(q, (querySnapshot) => {
      let conversations = [];
      querySnapshot.forEach((doc) => {
        conversations.push(doc.data());
      });
      conversations = conversations.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setAllCOnversations(conversations);
    });
  };

  const handleSelectMessage = (data) => {
    setMobileViewLastMessages(false);
    setSelectedMessage(data);
  };

  const sendMessage = async (message, setMessage) => {
    const conversationId = uuidv4();
    await setDoc(doc(db, "conversations", conversationId), {
      conversationKey: selectedMessage.conversationKey,
      message: message,
      senderId: userData.user.email,
      createdAt: new Date().toISOString(),
    });
    await setDoc(
      doc(db, "last_messages", selectedMessage.last_message_id),
      {
        last_message: message,
      },
      { merge: true }
    );
    setMessage("");
  };

  return (
    <Grid container>
      <Grid
        sx={{
          display: {
            xs: mobileViewLastMessages ? "block" : "none",
            md: "none",
          },
        }}
        item
        xs={12}
        md={3}
      >
        <LastMessage
          lastMessages={lastMessages}
          type={"candidate"}
          onClick={(data) => handleSelectMessage(data)}
          selectedMessage={selectedMessage}
        />
      </Grid>
      <Grid
        sx={{
          display: {
            xs: !mobileViewLastMessages ? "block" : "none",
            md: "none",
          },
        }}
        item
        xs={12}
        md={9}
      >
        {selectedMessage ? (
          <MessageArea
            allCOnversations={allCOnversations}
            selectedMessage={selectedMessage}
            type={"candidate"}
            sendMessage={sendMessage}
          />
        ) : (
          <div>Select a Message</div>
        )}
      </Grid>
    </Grid>
  );
};

export default CandidateConversation;

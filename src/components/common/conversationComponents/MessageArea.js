import { TextField } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import SendIcon from "@mui/icons-material/Send";

const mockData = [
  {
    id: 1,
    message: "Hello",
    senderId: 21,
  },
  {
    id: 13,
    message: "Hello",
    senderId: 16,
  },
  {
    id: 11,
    message: "Hello",
    senderId: 21,
  },
  {
    id: 14,
    message: "Hello",
    senderId: 16,
  },
  {
    id: 15,
    message: "Hello",
    senderId: 16,
  },
  {
    id: 19,
    message: "Hello",
    senderId: 21,
  },
  {
    id: 133,
    message: "Hello",
    senderId: 16,
  },
  {
    id: 135,
    message: "Hello",
    senderId: 21,
  },
  {
    id: 152,
    message: "Hello",
    senderId: 16,
  },
];

const MessageArea = ({
  allCOnversations,
  selectedMessage,
  type,
  sendMessage,
}) => {
  const [userData, dispatch] = useContext(UserContext);
  const [textMessage, setTextMessage] = React.useState("");
  return (
    <div className="message-area-container">
      <div className="message-area-container-header">
        {type === "employer"
          ? selectedMessage.candidateName
          : selectedMessage.employerName}
      </div>
      <div className="message-area-container-messages">
        {allCOnversations &&
          allCOnversations.map((item) => {
            return (
              <div
                className="message-area-container-messages-message"
                style={{
                  justifyContent:
                    item.senderId === userData.user.email
                      ? "flex-end"
                      : "flex-start",
                }}
              >
                <div
                  style={{
                    borderRadius:
                      item.senderId === userData.user.email
                        ? "16px 0px 16px 16px"
                        : "0px 16px 16px 16px",
                  }}
                >
                  {item.message}
                </div>
              </div>
            );
          })}
      </div>
      <div className="message-area-container-text-area">
        <TextField
          fullWidth
          size="small"
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
        />
        <button
          disabled={textMessage.length === 0}
          onClick={() => sendMessage(textMessage, setTextMessage)}
        >
          Send
          <span>
            <SendIcon />
          </span>
        </button>
      </div>
    </div>
  );
};

export default MessageArea;

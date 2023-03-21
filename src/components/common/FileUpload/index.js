import React from "react";
import { TextField } from "@mui/material";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseconfig";
import pdf from "../../../assets/pdf.png";
const FileUpload = ({ filetype, onUpload, value, disabled }) => {
  const upload = (e) => {
    const file = e.target.files[0];

    const storageRef = ref(storage, `${filetype}/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          onUpload(downloadURL);
        });
      }
    );
  };
  return (
    <div>
      <div>
        <label>Resume</label>
        <TextField
          disabled={disabled}
          id="outlined-basic"
          variant="outlined"
          size="small"
          type={"file"}
          fullWidth
          inputProps={{
            accept: filetype === "doc" ? "application/pdf" : "image/*",
          }}
          onChange={(e) => upload(e)}
        />
      </div>
      {filetype === "doc" && value ? (
        <div style={{ margin: "20px" }}>
          <img src={pdf} width="100px" alt="" />
        </div>
      ) : filetype === "doc" && value ? (
        <div>
          <img src={value} width="100px" alt="" />
        </div>
      ) : null}
    </div>
  );
};

export default FileUpload;

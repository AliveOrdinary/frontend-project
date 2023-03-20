import React from "react";
import ApplyCard from "../common/ApplyCard";
import google from "../../assets/google.png";

const data = [
  {
    company: "Google",
    companyLogo: google,
    jobType: "Full Time",
    jobTitle: "Software Engineer",
    jobDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    jobLocation: "New York, NY",
    jobSalary: "$2500",
  },
  {
    company: "Google",
    companyLogo: google,
    jobType: "Full Time",
    jobTitle: "Software Engineer",
    jobDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    jobLocation: "New York, NY",
    jobSalary: "$2500",
  },
  {
    company: "Google",
    companyLogo: google,
    jobType: "Full Time",
    jobTitle: "Software Engineer",
    jobDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    jobLocation: "New York, NY",
    jobSalary: "$2500",
  },
  {
    company: "Google",
    companyLogo: google,
    jobType: "Full Time",
    jobTitle: "Software Engineer",
    jobDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    jobLocation: "New York, NY",
    jobSalary: "$2500",
  },
  {
    company: "Google",
    companyLogo: google,
    jobType: "Full Time",
    jobTitle: "Software Engineer",
    jobDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    jobLocation: "New York, NY",
    jobSalary: "$2500",
  },
  {
    company: "Google",
    companyLogo: google,
    jobType: "Full Time",
    jobTitle: "Software Engineer",
    jobDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    jobLocation: "New York, NY",
    jobSalary: "$2500",
  },
  {
    company: "Google",
    companyLogo: google,
    jobType: "Full Time",
    jobTitle: "Software Engineer",
    jobDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    jobLocation: "New York, NY",
    jobSalary: "$2500",
  },
  {
    company: "Google",
    companyLogo: google,
    jobType: "Full Time",
    jobTitle: "Software Engineer",
    jobDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    jobLocation: "New York, NY",
    jobSalary: "$2500",
  },
];

const AllCandidate = () => {
  return (
    <div className="all-candidate-container">
      <h1>
        Apply Now! to your <span>Dream Job</span>
      </h1>
      <div className="all-cards-container">
        {data.map((item, index) => {
          return <ApplyCard key={index} data={item} />;
        })}
      </div>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#f5f5f5",
          border: "1px solid #4540db",
          fontSize: "20px",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        Find More Jobs
      </button>
    </div>
  );
};

export default AllCandidate;

import React from "react";

const ApplyCard = ({ data }) => {
  console.log(data);
  return (
    <div className="apply-card-container">
      <div className="company">
        <img
          width="80px"
          height="80px"
          src={data.companyLogo}
          alt=""
          className="company-logo"
        />
        <div className="company-name">
          <h2 style={{ margin: "0" }}>{data.company}</h2>
          <p style={{ margin: "0" }}>{data.jobType}</p>
        </div>
      </div>
      <div className="job-name" style={{ padding: "5px 10px" }}>
        <h2 style={{ margin: "0" }}>{data.jobTitle}</h2>
      </div>
      <div className="job-details" style={{ padding: "5px 10px" }}>
        <p style={{ margin: "5px" }}>{data.jobDescription}</p>
      </div>
      <div className="job-apply" style={{ padding: "5px 10px" }}>
        <p>
          <span style={{ fontSize: "25px", fontWeight: "700" }}>
            {data.jobSalary}
          </span>
          /month
        </p>
        <button className="apply-btn">Apply Now</button>
      </div>
    </div>
  );
};

export default ApplyCard;

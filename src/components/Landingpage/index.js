import React from "react";
import TopBar from "../common/Topbar";
import RightJobSection from "./RightJobSection";
import AllCandidate from "./AllCandidate";
import OnePlatform from "./OnePlatform";
import Footer from "./Footer";
import "./LandingPage.css";

const Landingpage = () => {
  const pages = [
    { title: "Home", path: "/" },
    { title: "Find Jobs", path: "/candidate/auth" },
    { title: "Find Candidates", path: "/employer/auth" },
  ];
  return (
    <div>
      <TopBar pages={pages} />
      <RightJobSection />
      <OnePlatform />
      <AllCandidate />
      <Footer />
    </div>
  );
};

export default Landingpage;

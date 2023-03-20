import React from "react";
import TopBar from "./TopBar";
import RightJobSection from "./RightJobSection";
import AllCandidate from "./AllCandidate";
import OnePlatform from "./OnePlatform";
import Footer from "./Footer";
import "./LandingPage.css";

const Landingpage = () => {
  return (
    <div>
      <TopBar />
      <RightJobSection />
      <OnePlatform />
      <AllCandidate />
      <Footer />
    </div>
  );
};

export default Landingpage;

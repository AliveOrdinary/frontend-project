import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Landingpage from "../components/Landingpage";
import Auth from "../components/Auth";
import TopBar from "../components/common/Topbar";

import CandidateJobs from "../components/candidate/Jobs";
import CandidateProfile from "../components/candidate/Profile";
import CandidateOnboarding from "../components/candidate/Onboarding";
import CandidateApplications from "../components/candidate/Applications";
import CandidateConversations from "../components/candidate/Conversation";

import EmployerJobs from "../components/employer/Jobs";
import EmployerProfile from "../components/employer/Profile";
import EmployerOnboarding from "../components/employer/Onboarding";
import EmployerApplicants from "../components/employer/Applicants";
import EmployerConversations from "../components/employer/Conversation";

const Navs = () => {
  const CandidateProtected = () => {
    const pages = [
      { title: "Jobs", path: "/candidate/jobs" },
      { title: "Profile", path: "/candidate/profile" },
      { title: "Applications", path: "/candidate/applications" },
      { title: "Conversations", path: "/candidate/conversation" },
    ];
    return (
      <div>
        <TopBar pages={pages} />
        <div style={{ marginTop: "8vh" }}>
          <Outlet />
        </div>
      </div>
    );
  };
  const EmployerProtected = () => {
    const pages = [
      { title: "Jobs", path: "/employer/jobs" },
      { title: "Profile", path: "/employer/profile" },
      { title: "Applications", path: "/employer/applications" },
      { title: "Conversations", path: "/employer/conversation" },
    ];
    return (
      <div>
        <TopBar pages={pages} />
        <div style={{ marginTop: "8vh" }}>
          <Outlet />
        </div>
      </div>
    );
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/employer/auth" element={<Auth userType={"employer"} />} />
        <Route
          path="/candidate/auth"
          element={<Auth userType={"candidate"} />}
        />

        <Route element={<CandidateProtected />}>
          <Route path="/candidate/jobs" element={<CandidateJobs />} />
          <Route path="/candidate/profile" element={<CandidateProfile />} />
          <Route
            path="/candidate/onboarding"
            element={<CandidateOnboarding />}
          />
          <Route
            path="/candidate/applications"
            element={<CandidateApplications />}
          />
          <Route
            path="/candidate/conversation"
            element={<CandidateConversations />}
          />
        </Route>

        <Route element={<EmployerProtected />}>
          <Route path="/employer/jobs" element={<EmployerJobs />} />
          <Route path="/employer/profile" element={<EmployerProfile />} />
          <Route path="/employer/onboarding" element={<EmployerOnboarding />} />
          <Route
            path="/employer/applications"
            element={<EmployerApplicants />}
          />
          <Route
            path="/employer/conversation"
            element={<EmployerConversations />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navs;

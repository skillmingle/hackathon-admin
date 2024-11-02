import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContextStat from "./ContextAPI/ContetxStat";

import Login from "./screens/Login"
import Signup from "./screens/Signup"
import Dashboard from "./screens/Dashboard"
import ProjectPage from "./screens/ProjectPage";
import TeamDashboard from "./screens/TeamDashboard";

import './App.css';


function App() {
  return (
    <>
      {/* Wrapping the entire app with a context provider */}
      <ContextStat>
        <Router>
          <div className="App">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/Dashboard" element={<Dashboard />} />
              <Route exact path="/Signup" element={<Signup />} />
              <Route exact path="/projects/:projectId" element={<ProjectPage />} />
              <Route exact path="/teams/:teamId" element={<TeamDashboard />} />

            </Routes>
          </div>
        </Router>
      </ContextStat>
    </>
  );
}


export default App;

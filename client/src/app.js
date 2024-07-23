import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import Service from "views/service";
import Project from "views/project";
import Contact from "views/Contact";
import Register from "views/auth/Register";
import Login from "views/auth/Login";
import { useReadQuery } from "features/api/apiSlice";
import Dashboard from "views/admin/Dashboard";
import Maps from "views/admin/Maps";
import Settings from "views/admin/Settings";
import Tables from "views/admin/Tables";

export default function App() {
  const user = JSON.parse(localStorage.getItem("tedbabe_user"));

  return (
    <Routes>
      {/* add routes with layouts */}
      {user && (
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/dashboard" index element={<Dashboard />} />
          <Route path="/admin/maps" element={<Maps />} />
          <Route path="/admin/profile" element={<Settings />} />
          <Route path="/admin/tables" element={<Tables />} />
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />
        </Route>
      )}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/landing" element={<Index />} />
      <Route path="/about" element={<Profile />} />
      <Route path="/service" element={<Service />} />
      <Route path="/project" element={<Project />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/" element={<Landing />} />
    </Routes>
  );
}

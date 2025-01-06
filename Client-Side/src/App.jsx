import React from "react";
import IdCardFrom from "./Components/IdCardFrom";
import AdminDashboard from "./Components/AdminDashboard";
import SuperAdminDashboard from "./Components/SuperAdminDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div>
      {/* <IdCardFrom /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IdCardFrom/>}/>
          <Route path="/admin" element={<AdminDashboard/>}/>
          <Route path="/superadmin" element={<SuperAdminDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

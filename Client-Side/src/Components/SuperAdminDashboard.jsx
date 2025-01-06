import React, { useState } from "react";

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 shadow-md">
        <h2 className="text-center text-2xl font-semibold mb-6">Super Admin</h2>
        <ul>
          <li
            className={`p-3 rounded cursor-pointer mb-2 transition-colors ${
              activeTab === "dashboard" ? "bg-green-500" : "hover:bg-gray-700"
            }`}
            onClick={() => handleTabClick("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={`p-3 rounded cursor-pointer mb-2 transition-colors ${
              activeTab === "createAdmin" ? "bg-green-500" : "hover:bg-gray-700"
            }`}
            onClick={() => handleTabClick("createAdmin")}
          >
            Create Admin
          </li>
          <li
            className={`p-3 rounded cursor-pointer mb-2 transition-colors ${
              activeTab === "userAnalytics"
                ? "bg-green-500"
                : "hover:bg-gray-700"
            }`}
            onClick={() => handleTabClick("userAnalytics")}
          >
            User Analytics
          </li>
          <li
            className={`p-3 rounded cursor-pointer mb-2 transition-colors ${
              activeTab === "userList" ? "bg-green-500" : "hover:bg-gray-700"
            }`}
            onClick={() => handleTabClick("userList")}
          >
            User List
          </li>
          <li
            className={`p-3 rounded cursor-pointer mb-2 transition-colors ${
              activeTab === "adminList" ? "bg-green-500" : "hover:bg-gray-700"
            }`}
            onClick={() => handleTabClick("adminList")}
          >
            Admin List
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === "dashboard" && (
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to the Super Admin Dashboard
          </h1>
        )}
        {activeTab === "createAdmin" && (
          <h1 className="text-3xl font-bold text-gray-800">Create Admin</h1>
        )}
        {activeTab === "userAnalytics" && (
          <h1 className="text-3xl font-bold text-gray-800">User Analytics</h1>
        )}
        {activeTab === "userList" && (
          <h1 className="text-3xl font-bold text-gray-800">User List</h1>
        )}
        {activeTab === "adminList" && (
          <h1 className="text-3xl font-bold text-gray-800">Admin List</h1>
        )}
      </main>
    </div>
  );
};

export default SuperAdminDashboard;

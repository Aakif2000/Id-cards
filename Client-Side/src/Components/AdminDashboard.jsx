import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  // Sample data for users
  const users = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      companyName: "Tech Corp",
    },
    {
      id: 2,
      name: "Jane Smith",
      designation: "Product Manager",
      companyName: "Innovative Inc.",
    },
    {
      id: 3,
      name: "Paul Brown",
      designation: "UX Designer",
      companyName: "Design Studios",
    },
    // Add more users here for testing pagination
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Set the number of users per page
  const [paginatedUsers, setPaginatedUsers] = useState([]);

  // Handle pagination logic
  useEffect(() => {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    setPaginatedUsers(currentUsers);
  }, [currentPage, users]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div>
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
          <button className="bg-yellow-500 text-white px-5 py-2 rounded mb-5 self-end">
            Logout
          </button>
        </div>

        <button className="bg-yellow-500 text-white px-5 py-2 rounded mb-5">
          Generate Id Card
        </button>
      </div>

      {/* Table for displaying user data */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">S/N</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Designation</th>
              <th className="px-4 py-2 border">Company</th>
              <th className="px-4 py-2 border w-2/12">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr key={user.id}>
                <td className="px-4 py-2 border">
                  {(currentPage - 1) * usersPerPage + index + 1}
                </td>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.designation}</td>
                <td className="px-4 py-2 border">{user.companyName}</td>
                <td className="px-4 py-2 border">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                    Print
                  </button>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === index + 1
                ? "bg-yellow-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../pagination/Pagination";

const NumberOfUsers = () => {
  const [users, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/profilesByCity");
    setUser(result.data.reverse());
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="py-4">
        <h1>Dashboard</h1>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">City</th>
              <th scope="col">Number of Users</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.filter((users) => {
              if(query === ""){
                return users;
              }else if(users.city.toLowerCase().includes(query.toLowerCase())){
                return users;
              }
            }).map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.city}</td>
                <td>{user.users}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <Pagination usersPerPage={usersPerPage} totalUsers={users.length} paginate={paginate} />
        </div>
      </div>
    </div>

  );
};

export default NumberOfUsers;

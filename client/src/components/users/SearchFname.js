import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Pagination from "../pagination/Pagination";

const SearchFname = () => {
  const [users, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [query, setQuery] = useState("");

  const { profileFname } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(`http://localhost:8080/fname/${profileFname}`);
    setUser(result.data.reverse());
  };

  const deleteUser = async id => {
    await axios.delete(`http://localhost:8080/delete/${id}`);
    loadUsers();
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="py-4">
        <h1>Search By FirstName</h1>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">FirstName</th>
              <th scope="col">LastName</th>
              <th scope="col">City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.filter((users) => {
              if(query === ""){
                return users;
              }else if(users.firstname.toLowerCase().includes(query.toLowerCase())){
                return users;
              }else if(users.lastname.toLowerCase().includes(query.toLowerCase())){
                return users;
              }else if(users.city.toLowerCase().includes(query.toLowerCase())){
                return users;
              }
            }).map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.city}</td>
                <td>
                  <Link class="btn btn-primary mr-2" to={`/id/${user._id}`}>
                    View
                  </Link>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/update/${user._id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteUser(user._id)}
                    to="/"
                  >
                    Delete
                  </Link>
                </td>
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

export default SearchFname;

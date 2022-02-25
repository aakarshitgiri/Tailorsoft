import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    city: "",
    company: "",
    about: ""
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const res = await axios.get(`http://localhost:8080/id/${id}`);
    setUser(res.data);
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      <h1 className="display-4">User Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Firstname: {user.firstname}</li>
        <li className="list-group-item">Lastname: {user.lastname}</li>
        <li className="list-group-item">City: {user.city}</li>
        <li className="list-group-item">Age: {user.age}</li>
        <li className="list-group-item">About: {user.about}</li>
      </ul>
    </div>
  );
};

export default User;

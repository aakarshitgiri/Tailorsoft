import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";

const AddUser = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    city: "",
    age: "",
    about: ""
  });

  const { firstname, lastname, city, age, about } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:8080/create", user);
    alert("Student Profile Created Successfully");
    history.push("/");
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A User</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Firstname"
              name="firstname"
              value={firstname}
              onChange={e => onInputChange(e)}
              required="required"
              pattern="^[A-Za-z -]+$"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Lastname"
              name="lastname"
              value={lastname}
              onChange={e => onInputChange(e)}
              required="required"
              pattern="^[A-Za-z -]+$"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your City"
              name="city"
              value={city}
              onChange={e => onInputChange(e)}
              required="required"
              pattern="^[A-Za-z -]+$"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Your Age"
              name="age"
              value={age}
              min={16}
              max={50}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="About You"
              name="about"
              value={about}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-primary btn-block">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;

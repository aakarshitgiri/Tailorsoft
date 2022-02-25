import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Dashboard from "./components/pages/Dashboard";
import Navbar from "./components/layout/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
import User from "./components/users/User";
import NumberOfUsers from "./components/users/NumberOfUsers";
import SearchFname from "./components/users/SearchFname";
import SearchLname from "./components/users/SearchLname";

function App(props) {

  return (
    <Router>
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/create" component={AddUser} />
          <Route exact path="/update/:id" component={EditUser} />
          <Route exact path="/id/:id" component={User} />
          <Route exact path="/fname/:profileFname" component={SearchFname} />
          <Route exact path="/lname/:profileLname" component={SearchLname} />
          <Route exact path="/profilesByCity" component={NumberOfUsers} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

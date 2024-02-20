import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";
function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const doLogin = function (e) {
    e.preventDefault();
    // 1 take data from localstorage
    let userData = localStorage.getItem("userData");
    if (userData) userData = JSON.parse(userData);
    else {
      alert("Please reload app, Some problem occured");
    }

    const loggedInUserDetails = userData.find(
      (userInfo) =>
        userInfo.userName === userName && userInfo.password === password
    );
    if (!loggedInUserDetails) {
      alert("Please check login details & try again");
      return;
    }
    dispatch(
      login({
        type: loggedInUserDetails.type,
        userName: loggedInUserDetails.userName,
      })
    );
    if (loggedInUserDetails.type === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
    console.log(userName, password, loggedInUserDetails);
  };
  return (
    <div className="container loginPage">
      <Form onSubmit={doLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;

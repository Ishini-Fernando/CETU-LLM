import React, {useState} from "react";
import "./login.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigate("/home");
  };
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  // const isDisabled = (password.trim() === "")

  return (
    <div className="login">
      <div className="login-container">
        <h1>Admin Panel</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="password-label">Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" />
          </Form.Group>
        </Form>
        <Button variant="outline-danger" onClick={handleLogin} onChange={handlePasswordChange}>Login</Button>
      </div>
    </div>
  );
};

export default Login;

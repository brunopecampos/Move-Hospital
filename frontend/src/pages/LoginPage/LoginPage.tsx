import React, { useState } from "react";
import httpClient from "../../httpClient";
import "./LoginPage.css";
import loginImage from "../../images/login-logo.png"
import { TextField, Button } from '@material-ui/core';

const LoginPage: React.FC = () => {
  const [isHospital, setIsHospital] = useState<boolean>(true);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const textFieldStyle = {
    background: 'white',
    borderRadius: '8px',
    marginBottom: '10px',
    fontSize: '5px',
  };

  const buttonStyle = {
    color: 'white',
    border: '1px solid white',
    background: 'transparent',
    width: "100%"
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    outline: 'none',
    fontSize: '0.9rem',
    marginLeft: '8px',
  };

  const logInUser = async () => {
    console.log(email, password);

    try {
      const resp = await httpClient.post("//localhost:5000/login", {
        email,
        password,
      });

      window.location.href = "/";
    } catch (error: any) {
      if (error.response.status === 401) {
        alert("Invalid credentials");
      }
    }
  };

  return (
    <div className="page">
      <div className="login-container">
        <img src={loginImage} alt="Description of the image" />
        <form onSubmit={() => logInUser}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            onChange={(e) => setEmail(e.target.value)}
            style={textFieldStyle}

            // Add any other TextField props as needed
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
            style={textFieldStyle}
            // Add any other TextField props as needed
          />
          <p style={{textAlign: 'center', ...linkStyle}} onClick={() => setIsHospital(!isHospital)}>
            {isHospital ?
              "Sou empresa de Ambulância"   
              : "Sou hospital"
          }
          </p>
          <Button style={buttonStyle} type="submit" variant="contained" color="primary">
            Criar uma conta
          </Button>
        </form>
        </div>
    </div>
  );
};

export default LoginPage;

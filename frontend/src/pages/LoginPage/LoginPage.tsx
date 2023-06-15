import React, { useState } from "react";
import httpClient from "../../httpClient";
import "./LoginPage.css";
import loginImage from "../../images/login-logo.png"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LoginPage: React.FC = () => {
  const [isHospital, setIsHospital] = useState<boolean>(true);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const [name, setName] = useState<string>("")
  const [cnpj, setCnpj] = useState<string>("")
  const [employeeName, setEmployeeName] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const textFieldStyle = {
    background: 'white',
    borderRadius: '8px',
    marginTop: '10px',
    marginBottom: '10px',
    fontSize: '5px',
  };

  const buttonStyle = {
    color: 'white',
    border: '1px solid white',
    background: 'transparent',
    width: "100%",
    padding: "10px",
    marginTop: "10px"
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'underline',
    fontSize: '0.9rem',
    marginLeft: '8px',
  };

  const handleSubmit = (event:any) => {
    if(isLogin) logInUser(event)
    else registerUser(event)
  }

  const logInUser = async (event:any) => {
    event.preventDefault();
    console.log(email, password);
    try {
      let urlEnd = isHospital ? "hospital" : "provider"
      let loginUrl = "//localhost:5000/login-" + urlEnd
      const resp = await httpClient.post(loginUrl, {
        email,
        password,
      });

      window.location.href = "/"
    } catch (error: any) {
    if (error.response.status === 401) {
        alert("Invalid credentials");
      }
    }
  };

  const registerUser = async (event: any) => {
    event.preventDefault();

    try {
      let urlEnd = isHospital ? "hospital" : "provider"
      let loginUrl = "//localhost:5000/register-" + urlEnd

      const resp = await httpClient.post(loginUrl, {
        email,
        password,
        name,
        cnpj,
        "employee_name": employeeName,
        address,
      });
      alert("Usuário cadastrado com sucesso.")
    }
    catch (error: any) {
      if(error.response.status == 409) {
        alert("Esse email já foi cadastrado.")
      }
    }
  }

  return (
    <div className="page">
      <div className="login-container">
        <img src={loginImage} alt="Description of the image" />
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1 style={{color: "white", textAlign: 'center'}}> {isLogin ? "Entrar" : "Cadastre-se "} como {isHospital ? "Hospital" : "Empresa de Ambulância"}</h1>
          {
            isLogin ? <></>
            :
            <>
              <TextField
                label= {isHospital ? "Nome do Hospital" : "Nome da Empresa"}
                type="name"
                fullWidth
                required
                onChange={(e) => setName(e.target.value)}
                style={textFieldStyle}
                variant="filled"
              />
              <TextField
                label="CNPJ"
                type="cnpj"
                fullWidth
                required
                onChange={(e) => setCnpj(e.target.value)}
                style={textFieldStyle}
                variant="filled"
              />
              <TextField
                label="Endereço"
                type="address"
                fullWidth
                required
                onChange={(e) => setAddress(e.target.value)}
                variant="filled"
                style={textFieldStyle}
              />
              <TextField
                label="Nome do Responsável"
                type="employee_name"
                fullWidth
                required
                onChange={(e) => setEmployeeName(e.target.value)}
                style={textFieldStyle}
                variant="filled"
              />
            </>

          }
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            onChange={(e) => setEmail(e.target.value)}
            style={textFieldStyle}
            variant="filled"

            // Add any other TextField props as needed
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
            style={textFieldStyle}
            id="standard-basic"
            variant="filled"
            // Add any other TextField props as needed
          />
          {/*<p style={{textAlign: 'center', ...linkStyle}} }>
            {isHospital ?
              "Sou empresa de Ambulância"   
              : "Sou hospital"
          }
        </p>*/}
          <Button style={buttonStyle} type="submit" variant="contained" color="primary">
            {isLogin? "Entrar" : "Criar uma conta"}
          </Button>
        </form>
        <p style={{ textAlign: 'center', ...linkStyle}} onClick={() => setIsLogin(!isLogin)}> {isLogin ? "Ainda não tem conta? Clique Aqui!" : "Para fazer login, clique aqui!"}</p>
        <Button onClick={() => setIsHospital(!isHospital)} style={{...buttonStyle}} variant="contained" color="primary">
            Sou {isHospital ? "Empresa de Ambulância" : "Hospital"}
        </Button>
        </div>
    </div>
  );
};

export default LoginPage;
//
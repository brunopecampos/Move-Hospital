// ProfileForm.tsx

import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, FormGroup, Box, Container } from '@mui/material';
import { Hospital, User } from '../../types';
import httpClient from '../../httpClient';

interface ProfileNormProps  {
  user: User;
}

export const ProfileTab = (props: ProfileNormProps): React.ReactElement => {
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [employee_name, setEmployeeName] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const url = "//localhost:5000/" + props.user.user_type + "/" + props.user.id + "/profile"
        const resp : Hospital = (await httpClient.get(url)).data;
        setName(resp.name)
        setCnpj(resp.cnpj)
        setAddress(resp.address)
        setEmail(resp.email)
        setEmployeeName(resp.employee_name)
      } catch (error) {
        alert("Error getting requests")
      }
    })();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hospital: Hospital = {
      name,
      cnpj,
      address,
      email,
      employee_name
    };

    console.log(hospital);
  };

  return (
    <Box sx={{
      padding: "50px",
      minHeight: "600px",
    }}>
      <Container>
      <div style={{height: 80, display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
        <span style={{marginTop: "30px", fontSize: 20, fontWeight: 'bold', width: "100%"}}>Meu Perfil</span>
        <form onSubmit={handleSubmit} style={{width: "730px", marginTop: "30px"}}>
          <FormGroup>
            <TextField 
              label="Nome do hospital" 
              variant="outlined" 
              style={{ marginBottom: '10px' }} 
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />
            <TextField 
              label="CNPJ" 
              variant="outlined" 
              style={{ marginBottom: '10px' }} 
              value={cnpj} 
              onChange={(e) => setCnpj(e.target.value)}
            />
            <TextField 
              label="Endereço" 
              variant="outlined" 
              style={{ marginBottom: '10px' }} 
              value={address} 
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField 
              label="E-mail" 
              variant="outlined" 
              style={{ marginBottom: '10px' }} 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField 
              label="Nome do Responsável" 
              variant="outlined" 
              style={{ marginBottom: '20px' }} 
              value={employee_name} 
              onChange={(e) => setEmployeeName(e.target.value)}
            />
            <Button variant="contained" color="primary" type="submit">
              Salvar
            </Button>
          </FormGroup>
        </form>
      </div>
      </Container>
    </Box>
  );
};

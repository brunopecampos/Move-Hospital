// ProfileForm.tsx

import React, { useState } from 'react';
import { Typography, TextField, Button, FormGroup, Container } from '@mui/material';
import { Hospital } from '../../types';
import Box from '@mui/material/Box';

export const ProfileForm: React.FC = () => {
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [employee_name, setEmployeeName] = useState('');

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
    <Box  sx={{
      padding: "50px",  minHeight: '100vh' 
    }}>
      
    <Container> 
      <Typography variant="h5" style={{ marginBottom: '20px' }}>Meu perfil</Typography>
      <form onSubmit={handleSubmit}>
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
    </Container>
    </Box>
  
  );
};

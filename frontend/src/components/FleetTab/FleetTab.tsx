import React, { useEffect, useState } from 'react';
import { Typography, Button, Card, Box, Container } from '@mui/material';
import { Ambulance, Hospital, User } from '../../types';
import httpClient from '../../httpClient';
import { SimpleAmbulance } from '../SimpleAmbulance/SimpleAmbulance';
import { CreateAmbulanceModal } from '../CreateAmbulanceModal/CreateAmbulanceModal';

interface FleetTabProps {
  user: User;
  changeTab: (tab: number) => void
}

export const FleetTab = (props: FleetTabProps): React.ReactElement => {
  const [ambulances, setAmbulances] = useState<Ambulance[]>([])

  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [employee_name, setEmployeeName] = useState('');

  const [openModal, setOpenModal] = useState(false)
  const closeModal = () => setOpenModal(false)

  useEffect(() => {
    (async () => {
      try {
        const url = "//localhost:5000/provider/" + props.user.id + "/ambulance"
        const resp : Ambulance[] = (await httpClient.get(url)).data;
        setAmbulances(resp)
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

  const listAmbulances = ambulances.map((item, index) => (
    <>
      <SimpleAmbulance changeTab={props.changeTab} ambulance={item} />
      <hr />
    </>
  ))

  return (
    <Box sx={{
      padding: "50px",
      minHeight: "600px",
    }}>
      <Container>
      <div style={{ width: "730px", display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
        <span style={{marginTop: "30px", fontSize: 20, fontWeight: 'bold', width: "100%"}}>Minha Frota </span>
        <Card elevation={5} sx={{padding: 5, marginTop: "30px"}}>
          {
            ambulances.length > 0 ? 
              <>
                <div style={{width: "650px", height: 40, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start'}}>
                  <RequestTextField label='Tipo de Ambulância' />
                  <RequestTextField label='Modelo do Veículo' />
                  <RequestTextField label='Placa' marginRight='200px' />
                </div>
              </>
             : 
              <div style={{ width: "101%", height: 30, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Ainda não há nenhuma ambulância.
                </Typography>
              </div>
          }
          {
            ambulances.length > 0 ? 
              listAmbulances
            :
              <></>  
          }
          <div style={{width: "650px", height: 40, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', marginTop:  "30px"}}>
            <CreateAmbulanceModal user={props.user} open={openModal} closeModel={closeModal} changeTab={props.changeTab} />
            <Button sx={{ backgroundColor: '#504DA6' }} variant="contained" onClick={() => setOpenModal(true)}>Adicione um Veículo</Button>
          </div>
        </Card>
      </div>
      </Container>
    </Box>
  );
};


const RequestTextField = (props: { label: string, marginRight?: string }): React.ReactElement => {
  return (
    <span style={{fontWeight: 'bold', color: 'grey', fontSize: "11px", marginRight: props.marginRight ? props.marginRight : "50px"}}>{props.label}</span>
  )
}
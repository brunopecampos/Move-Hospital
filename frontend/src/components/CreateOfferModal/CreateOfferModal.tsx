import { Stack, Button, Modal, Box, Typography, TextField, hexToRgb, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { Offer, User } from '../../types';
import { SimpleOffer } from '../SimpleOffer/SimpleOffer';
import { Ambulance } from '../../types';
import httpClient from '../../httpClient';

interface CreateOfferModalProps{
  open: boolean
  closeModel: () => void
  requestId: number | undefined
  user: User
  changeTab: (tab: number) => void
}

export const CreateOfferModal = (props: CreateOfferModalProps): React.ReactElement => {

  const [price, setPrice] = useState<string>("")  
  const [driverName, setDriverName] = useState<string>("")
  const [driverCpf, setDriverCpf] = useState<string>("")
  const [ambulanceId, setAmbulanceId] = useState<string>("")
  const [ambulanceName, setAmbulanceName] = useState<string>("")
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const url = "//localhost:5000/provider/" + props.user.id + "/offer/" + props.requestId; 
      const resp = await httpClient.post(url, {
        "price": price,
        "ambulance_id": ambulanceId,
        "driver_name": driverName,
        "driver_cpf": driverCpf,
      });
      props.closeModel()
      props.changeTab(3)
    } catch (error) {
      alert("Error creating reqquest")
    }
  }

  const handleChange = (e: SelectChangeEvent) => {
    let id = e.target.value
    setAmbulanceId(id)
    let ambulance = hardcodedAmbulances.find(ambulance => ambulance.id === id)
    if(ambulance) {
      setAmbulanceName(ambulance.factory_model + " - " + ambulance.licence_plate) 

    }
  }

  const hardcodedAmbulances: Ambulance[] = [
    {
      id: "1",
      factory_model: "Doblo",
      licence_plate: "sdf-1358",
      ambulance_type: "UTI Móvel"
    },
    {
      id: "2",
      factory_model: "Ducato",
      licence_plate: "slk-1231",
      ambulance_type: "UTI Móvel"
    }
  ]

  const listAmbulances = hardcodedAmbulances.map((item, index) => (
      <MenuItem value={item.id}>{item.factory_model + " - " + item.licence_plate}</MenuItem> 
    ))

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'rgba(130, 127, 208, 0.9)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
       <Modal
          open={props.open}
          onClose={props.closeModel}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Typography color="white" id="modal-modal-title" variant="h6" component="h2">
                Detalhes da Oferta:
              </Typography>
              <OfferTextField setFunc={(value: string) => setPrice(value)} label='Preço' /> 
              <OfferTextField setFunc={(value: string) => setDriverName(value)} label='Nome do Motorista' /> 
              <OfferTextField setFunc={(value: string) => setDriverCpf(value)} label='Cpf do Motorista' /> 
              <InputLabel>Escolha uma de suas ambulâncias</InputLabel>
              <Select
                value={ambulanceId}
                label={"Ambulância"}
                onChange={handleChange}
              >
                {
                  listAmbulances
                }
              </Select>
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '10px'}}>
                <Button style={{backgroundColor: 'white', color: 'black'}} type="submit" variant="contained" color="primary">
              Criar Proposta
              </Button>
              </div>
            </form>
          </Box>
        </Modal>
      </>
  );
}

const OfferTextField = (props: {setFunc: (value: string) => void, label: string}): React.ReactElement => {
  const textFieldStyle = {
    background: 'inherit',
    borderRadius: '8px',
    marginTop: '5px',
    marginBottom: '5px',
  };


  return (<TextField
                label={props.label}
                type="name"
                fullWidth
                required
                onChange={(e) => props.setFunc(e.target.value)}
                style={textFieldStyle}
                variant="filled"
                color='secondary'
                size='small'
              />)
}
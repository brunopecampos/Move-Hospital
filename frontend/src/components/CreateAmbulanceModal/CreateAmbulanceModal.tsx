import { Stack, Button, Modal, Box, Typography, TextField, hexToRgb, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { Offer, User } from '../../types';
import { SimpleOffer } from '../SimpleOffer/SimpleOffer';
import { Ambulance } from '../../types';
import httpClient from '../../httpClient';

interface CreateAmbulanceModalProps{
  open: boolean
  closeModel: () => void
  user: User
  changeTab: (tab: number) => void
}

export const CreateAmbulanceModal = (props: CreateAmbulanceModalProps): React.ReactElement => {

  const [factoryModel, setFactoryModel] = useState<string>("")  
  const [licensePlate, setLicensePlate] = useState<string>("")
  const [ambulanceType, setAmbulanceType] = useState<string>("")

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const url = "//localhost:5000/provider/" + props.user.id + "/ambulance"; 
      const resp = await httpClient.post(url, {
        "factory_model": factoryModel,
        "license_plate": licensePlate,
        "ambulance_type": ambulanceType
      });
      props.closeModel()
      props.changeTab(5)
      props.changeTab(6)
    } catch (error) {
      alert("Error creating ambulance")
    }
  }

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'rgba(130, 127, 208, 0.90)',
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
              <OfferTextField setFunc={(value: string) => setAmbulanceType(value)} label='Tipo de Ambulância'/> 
              <OfferTextField setFunc={(value: string) => setFactoryModel(value)} label='Modelo do Veículo' /> 
              <OfferTextField setFunc={(value: string) => setLicensePlate(value)} label='Placa do Veículo' /> 
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '10px'}}>
                <Button style={{backgroundColor: 'white', color: 'black'}} type="submit" variant="contained" color="primary">
                    Criar Ambulância
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
import { Stack, Button, Modal, Box, Typography, TextField, hexToRgb } from '@mui/material';
import { useState } from 'react';
import { Offer, User, Request } from '../../types';
import { SimpleOffer } from '../SimpleOffer/SimpleOffer';

interface UpdateRequestModalProps{
  open: boolean;
  closeModal: () => void
  updateStatus: (newStatus: string) => Promise<void>
  request: Request
  changeTab: (tab: number) => void
}

export const UpdateRequestModal = (props: UpdateRequestModalProps): React.ReactElement => {

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'rgba(130, 127, 208, 0.9)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const textFieldStyle = {
    background: 'inherit',
    borderRadius: '8px',
    marginTop: '5px',
    marginBottom: '5px',
  };

  const newStatus = (currStatus: string | undefined) => {
    if(currStatus == "ongoing") return "patient_collected"
    return "finished"
  }

  const handleStatusChange = async () => {
    await props.updateStatus(newStatus(props.request.status))
    props.closeModal()
    if(props.request.status == "patient_collected") {
      props.changeTab(5)
    }
    if(props.request.status == "ongoing") {
      props.changeTab(4);
      props.changeTab(1)
    }
  }

  return (
       <Modal
          open={props.open}
          onClose={props.closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography textAlign='center' color="white" id="modal-modal-title" variant="h6" component="h2">
              {
                props.request.status == "ongoing" ?
                  "Já buscou o paciente ?" : "Já deixou o paciente no local especificado ?"
              }
            </Typography>
            <div style={{ width: "100%", height: 80, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: '40px'}}>
                      <Button sx={{ backgroundColor: 'red', marginRight: 1 }} variant="contained" onClick={() => props.closeModal()}>Não</Button>
                      <Button sx={{ backgroundColor: 'green', marginRight: 2 }} variant="contained" onClick={() => { handleStatusChange() }}>Sim</Button>
            </div>
          </Box>
        </Modal>
  );
}

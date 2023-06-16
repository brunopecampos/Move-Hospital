import { Stack, Button, Modal, Box, Typography, TextField } from '@mui/material';
import { useState } from 'react';

interface DashboardHeaderProps {
    username: string
}

export const DashboardHeader = (props: DashboardHeaderProps): React.ReactElement => {

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [description, setDescription] = useState<Date>(new Date())
  const [transferenceTime, setTransferenceTime] = useState<Date>(new Date())
  const [ambulanceType, setAmbulanceType] = useState<string>("")
  const [responsibleName, setResponsibleName] = useState<string>("")
  const [responsiblePhone, setResponsiblePhone] = useState<string>("")


  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: "#504DA6",
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const textFieldStyle = {
    background: 'inherit',
    borderRadius: '8px',
    marginTop: '10px',
    marginBottom: '10px',
    fontSize: '5px',
  };

  return (
    <>
      <Stack direction="row" spacing={60} height={100}>
       <h1>Olá {props.username}</h1>
       <Button variant="contained" onClick={handleOpen}>Nova solicitação</Button>
       <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography color="white" id="modal-modal-title" variant="h6" component="h2">
              Nova Solicitação
            </Typography>
            <TextField
                label="Tipo de Serviço"
                type="name"
                fullWidth
                required
                onChange={(e) => console.log(e.target.value)}
                style={textFieldStyle}
                variant="filled"
                color='secondary'
              />
          </Box>
        </Modal>
      </Stack> 
    </>
  );
}

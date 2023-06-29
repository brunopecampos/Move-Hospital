import { Stack, Button, Modal, Box, Typography, TextField } from '@mui/material';
import { useState } from 'react';

interface DashboardHeaderProps {
    username: string
}

export const DashboardHeader = (props: DashboardHeaderProps): React.ReactElement => {

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [description, setDescription] = useState<string>("")
  const [ambulanceType, setAmbulanceType] = useState<string>("")
  const [responsibleName, setResponsibleName] = useState<string>("")
  const [responsiblePhone, setResponsiblePhone] = useState<string>("")
  const [transferenceTime, setTransferenceTime] = useState<Date>(new Date())
  const [destinationAddress, setDestinationAddress] = useState<string>("")
  const [destinationName, setDestinationName] = useState<string>("")

  const [patientName, setPatientName] = useState<string>("")
  const [patientAge, setPatientAge] = useState<number>(0)
  const [patientGender, setPatientGender] = useState<string>("")
  const [patientClinicalCondition, setPatientClinicalCondition] = useState<string>("")
  const [patientPhone, setPatientPhone] = useState<string>("")
  const [patientObservations, setPatientObservations] = useState<string>("")

  const handleSubmit = () => {

  }

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'rgba(80, 77, 166, 0.9)',
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

  return (
    <>
      <Stack direction="row" spacing={60} height={100}>
       <h1>Olá {props.username}</h1>
       <Button variant="contained" sx={{height: 40, alignSelf: 'center'}} onClick={handleOpen}>Nova solicitação</Button>
       <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <form onSubmit={() => handleSubmit()}>
              <Typography color="white" id="modal-modal-title" variant="h6" component="h2">
                Detalhes da Solicitação
              </Typography>
              <TextField
                label="Nome do Destino"
                type="name"
                fullWidth
                required
                onChange={(e) => setDestinationName(e.target.value)}
                style={textFieldStyle}
                variant="filled"
                color='secondary'
                size='small'
              />
              <TextField
                label="Endereço de Destino"
                type="name"
                fullWidth
                required
                onChange={(e) => setDestinationAddress(e.target.value)}
                style={textFieldStyle}
                variant="filled"
                color='secondary'
                size='small'
              />
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Nome do Responsável"
                  type="name"
                  fullWidth
                  required
                  onChange={(e) => setResponsibleName(e.target.value)}
                  style={textFieldStyle}
                  variant="filled"
                  color='secondary'
                  size='small'
                />
                <TextField
                  label="Telefone do Responsável"
                  type="name"
                  fullWidth
                  required
                  onChange={(e) => setResponsiblePhone(e.target.value)}
                  style={textFieldStyle}
                  variant="filled"
                  color='secondary'
                  size='small'
                />
              </Stack>
              <Stack direction="row" spacing={2}>
              <TextField
                label="Data e Horário da Transferência"
                type="name"
                fullWidth
                required
                onChange={(e) => {/* setTransferenceTime(e.target.value)*/} }
                style={textFieldStyle}
                variant="filled"
                color='secondary'
                size='small'
              />
              <TextField
                label="Tipo de Ambulância"
                type="name"
                fullWidth
                required
                onChange={(e) => setAmbulanceType(e.target.value)}
                style={textFieldStyle}
                variant="filled"
                color='secondary'
                size='small'
              />
              </Stack>
              <TextField
                label="Descrição da Transferência"
                type="name"
                fullWidth
                required
                onChange={(e) => setDescription(e.target.value)}
                style={textFieldStyle}
                variant="filled"
                color='secondary'
                size='small'
              />
              <Typography color="white" id="modal-modal-title" variant="h6" component="h2">
                Detalhes da Paciente
              </Typography>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Nome"
                  type="name"
                  fullWidth
                  required
                  onChange={(e) => setPatientName(e.target.value)}
                  style={textFieldStyle}
                  variant="filled"
                  color='secondary'
                  size='small'
                />
                <TextField
                  label="Idade"
                  type="name"
                  fullWidth
                  required
                  onChange={(e) => setPatientAge(Number(e.target.value))}
                  style={textFieldStyle}
                  variant="filled"
                  color='secondary'
                  size='small'
                />
                <TextField
                  label="Gênero"
                  type="name"
                  fullWidth
                  required
                  onChange={(e) => setPatientGender(e.target.value)}
                  style={textFieldStyle}
                  variant="filled"
                  color='secondary'
                  size='small'
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Condição Clínica"
                  type="name"
                  fullWidth
                  required
                  onChange={(e) => setPatientClinicalCondition(e.target.value)}
                  style={textFieldStyle}
                  variant="filled"
                  color='secondary'
                  size='small'
                />
                <TextField
                  label="Telefone"
                  type="name"
                  fullWidth
                  required
                  onChange={(e) => setPatientPhone(e.target.value)}
                  style={textFieldStyle}
                  variant="filled"
                  color='secondary'
                  size='small'
                />
              </Stack>
              <TextField
                label="Observações"
                type="name"
                fullWidth
                required
                onChange={(e) => setPatientObservations(e.target.value)}
                style={textFieldStyle}
                variant="filled"
                color='secondary'
                size='small'
              />
            </form>
          </Box>
        </Modal>
      </Stack> 
    </>
  );
}

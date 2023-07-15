import { Stack, Button, Modal, Box, Typography, TextField } from '@mui/material';
import { useState } from 'react';
import httpClient from "../../httpClient";

interface DashboardHeaderProps {
    username: string
    userId: string;
    changeTab: (tab: number) => void
}

export const DashboardHeader = (props: DashboardHeaderProps): React.ReactElement => {

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [description, setDescription] = useState<string>("")
  const [ambulanceType, setAmbulanceType] = useState<string>("")
  const [responsibleName, setResponsibleName] = useState<string>("")
  const [responsiblePhone, setResponsiblePhone] = useState<string>("")
  const [transferenceTime, setTransferenceTime] = useState<string>("")
  const [destinationAddress, setDestinationAddress] = useState<string>("")
  const [destinationName, setDestinationName] = useState<string>("")

  const [patientName, setPatientName] = useState<string>("")
  const [patientAge, setPatientAge] = useState<number>(0)
  const [patientGender, setPatientGender] = useState<string>("")
  const [patientClinicalCondition, setPatientClinicalCondition] = useState<string>("")
  const [patientPhone, setPatientPhone] = useState<string>("")
  const [patientObservations, setPatientObservations] = useState<string>("")

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      let url = "//localhost:5000/hospital/" + props.userId + "/request"
      const resp = await httpClient.post(url, {
        "ambulance_type": ambulanceType,
			  "destination_name": destinationName,
			  "destination_address": destinationAddress,
			  "description": description,
			  "transference_time": transferenceTime,
			  "responsible_name": responsibleName,
			  "responsible_phone": responsiblePhone,
			  "patient_name": patientName,
			  "patient_age": patientAge,
			  "patient_gender": patientGender,
			  "patient_clinical_condition": patientClinicalCondition,
			  "patient_phone": patientPhone,
			  "patient_observations": patientObservations,
    });
    handleClose()
    props.changeTab(2)
    props.changeTab(3)
    } catch (error: any) {
      alert("Erro ao criar transferência");
    }
  }

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

  const textFieldStyle = {
    background: 'inherit',
    borderRadius: '8px',
    marginTop: '5px',
    marginBottom: '5px',
  };

  return (
    <>
      <div style={{height: 50, marginBottom: 20, width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px'}}>
       <span style={{fontSize: 20, fontWeight: 'bold', maxWidth: "200px"}}>Olá, {props.username}</span>
       <Button variant="contained" sx={{height: 40, alignSelf: 'center'}} onClick={handleOpen}>Nova solicitação</Button>
       <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <form onSubmit={(e) => handleSubmit(e)}>
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
                type="datetime-local"
                fullWidth
                required
                onChange={(e) => {
                  const inputDateTime = new Date(e.target.value);
                  const formattedDateTime = inputDateTime.toISOString().slice(0, 19).replace('T', ' ');
                  setTransferenceTime(formattedDateTime);}}
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
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '10px'}}>
                <Button style={{backgroundColor: 'white', color: 'black'}} type="submit" variant="contained" color="primary">
              Criar Solicitação
              </Button>

              </div>
            </form>
          </Box>
        </Modal>
      </div> 
    </>
  );
}

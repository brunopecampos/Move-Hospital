import React, {useState, useEffect} from 'react';
import httpClient from '../../httpClient';
import { Request, User } from '../../types';
import Box from '@mui/material/Box';
import { Button, Container, Stack, Card } from '@mui/material';
import { ThemeContext } from '@emotion/react';

export interface SimpleRequestProps {
  request: Request
}

export const SimpleRequest = (props: SimpleRequestProps): React.ReactElement => 
{
  const [details, setDetails] = useState<Boolean> (false)
  const [patient, setPatient] = useState<string> ("Placeholder")
  const [provider, setProvider] = useState<string> ("Placeholder")
  const requestDetails = () => {
    setDetails(!details)
  }

  return (
    <>
      <Stack direction="row" spacing={5} height={100} alignItems='center'>
        <RequestTextField title="Tipo de Ambulancia" content={props.request.ambulance_type} />
        <RequestTextField title="Destino" content={props.request.destination_name} />
        <RequestTextField title="Data de Transferência" content={props.request.transference_time.toDateString()} />
        <Container sx={{width: 150}}>
          <Button sx={{height: 40}} variant="contained" onClick={() => requestDetails()}> {details ? "Esconder" : "Detalhes"}</Button>
        </Container>
      </Stack>
      {details ? <>

        <Stack direction="row" spacing={5} height={100} alignItems='center'>
          <RequestTextField title="Nome do responsável" content={props.request.responsible_name}></RequestTextField>
          <RequestTextField title="Criação da Transferência" content={props.request.created.toDateString()}></RequestTextField>
          <RequestTextField title="Nome do Paciente" content={patient}></RequestTextField>
          <RequestTextField title="Empresa Responsável" content={provider}></RequestTextField>
        </Stack>
        <Stack direction="row" spacing={5} height={100} alignItems='center'>
          <RequestTextField width={340} title="Descrição" content={props.request.description}></RequestTextField>
          <RequestTextField width={340} title="Endereço" content={props.request.destination_address}></RequestTextField>
        </Stack>
        </> : <></>}
    </>
  );
}

const RequestTextField = (props: {title: string, content: string, width?: number}): React.ReactElement => {
  return (
    <Container sx={{width: props.width ?? 150}}>
      <p style={{
        fontWeight: 700,
        fontSize: 11,
        wordWrap: 'break-word'
      }}>{props.title}</p>
      <p style={{
        color: 'grey',
        fontSize: 12,
        wordWrap: 'break-word'
      }}>{props.content}</p>
    </Container>
  )
}
import React, {useState, useEffect} from 'react';
import httpClient from '../../httpClient';
import { Offer, Request, User } from '../../types';
import Box from '@mui/material/Box';
import { Button, Container, Stack, Card } from '@mui/material';
import { ThemeContext } from '@emotion/react';
import { OfferModal } from '../OfferModal/OfferModal';

export interface SimpleRequestProps {
  request: Request
  isHospital: boolean
  type: String
}

export const SimpleRequest = (props: SimpleRequestProps): React.ReactElement => 
{
  const [details, setDetails] = useState<Boolean> (false)
  const [patient, setPatient] = useState<string> ("Placeholder")
  const [provider, setProvider] = useState<string> ("Placeholder")
  const requestDetails = () => {
    setDetails(!details)
  }

  const [offers, setOffers] = useState<Offer[]> ([
    {
        code: "aaaaaa",
        price: 50.00,
        status: "created",
        driver_id: "aaaa",
        ambulance_id: "aaaa"
    },
    {
        code: "bbbbbb",
        price: 100.00,
        status: "created",
        driver_id: "aaaa",
        ambulance_id: "aaaa"
    }
  ])

  const checkNewOffers = () : Offer[] => {
    /* fazer requisição para checar ofertas */
    return [
      {
          code: "aaaaaa",
          price: 50.00,
          status: "created",
          driver_id: "aaaa",
          ambulance_id: "aaaa"
      },
      {
          code: "bbbbbb",
          price: 100.00,
          status: "created",
          driver_id: "aaaa",
          ambulance_id: "aaaa"
      }
    ]
  }

  const showOffers = () => {
    /* fazer requisição para checar ofertas */
    const offers = checkNewOffers()

  }

  return (
    <>
      <Stack direction="row" height={100} alignItems='center'>
        <RequestTextField title="Destino" content={props.request.origin_name} />
        <RequestTextField title="Destino" content={props.request.destination_name} />
        <RequestTextField title="Data de Transferência" content={props.request.transference_time.toDateString()} />
        <RequestTextField title="Status" content={props.type == "pending" ? "Aguardando Resposta" : ""} />
      </Stack>
      {details ? <>
        <Stack direction="row" height={100} alignItems='center'>
          <RequestTextField title="Nome do responsável" content={props.request.responsible_name}></RequestTextField>
          <RequestTextField title="Criação da Transferência" content={props.request.created.toDateString()}></RequestTextField>
          <RequestTextField title="Nome do Paciente" content={patient}></RequestTextField>
          <RequestTextField title="Empresa Responsável" content={provider}></RequestTextField>
        </Stack>
        <Box display='flex' alignItems='center'>
          <RequestTextField width={300} title="Descrição" content={props.request.description}></RequestTextField>
          <RequestTextField width={300} title="Endereço" content={props.request.destination_address}></RequestTextField>
        </Box>
        </> : <></>
      }
      <Stack direction="row" height={50} justifyContent='center' alignItems='center'>
        <Container sx={{width: 150}}>
          <Button sx={{height: 40}} variant="contained" onClick={() => requestDetails()}>{details ? "Esconder" : "Detalhes"}</Button>
        </Container>
        {
          props.isHospital ?
            props.type == "pending" ?
              <OfferModal requestId={props.request.id} />
            :
          
          <></> :
          <></>
        }
      </Stack>
      
    </>
  );
}

const RequestTextField = (props: {title: string, content: string, width?: number}): React.ReactElement => {
  return (
    <Box sx={{width: props.width ?? 150, padding: "5px"}}>
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
    </Box>
  )
}
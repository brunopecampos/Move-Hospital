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

  const getRequestStatus = (type: String, request: Request) : string => {
    if(type == "pending") return "Aguardando resposta"
    if(type == "scheduled") return "Marcado"
    if(type == "finished") return "concuida"
    /* Ongoing */
    if(request.status == "ongoing") return "Buscando paciente"
    return "Paciente Coletado"
  }

  return (
    <>
      <Stack direction="row" height={100} alignItems='center'>
        <RequestTextField title="Origem" content={props.request.origin_name} />
        <RequestTextField title="Destino" content={props.request.destination_name} />
        <RequestTextField title="Data de Transferência" content={props.request.transference_time.toDateString()} />
        <RequestTextField title="Status" content={getRequestStatus(props.type, props.request)} />
      </Stack>

      {details ? <>
        <Stack direction="row" height={100} alignItems='center'>
          <RequestTextField title="Nome do responsável" content={props.request.responsible_name}></RequestTextField>
          <RequestTextField title="Telefone do Responsável" content={props.request.responsible_phone}></RequestTextField>
          <RequestTextField title="Criação da Transferência" content={props.request.created.toDateString()}></RequestTextField>
          <RequestTextField title="Tipo de Ambulância" content={provider}></RequestTextField>
        </Stack>

        <Stack direction="row" height={100} alignItems='center'>
          <RequestTextField width={95} title="Nome do Paciente" content={props.request.patient_name}></RequestTextField>
          <RequestTextField width={95} title="Idade do Paciente" content={props.request.patient_age.toString()}></RequestTextField>
          <RequestTextField width={95} title="Gênero" content={props.request.patient_gender}></RequestTextField>
          <RequestTextField width={95} title="Condição" content={props.request.patient_clinical_condition}></RequestTextField>
          <RequestTextField width={95} title="Telefone" content={props.request.patient_phone}></RequestTextField>
          <RequestTextField width={95} title="Observações" content={props.request.patient_observations}></RequestTextField>
        </Stack>

        <Box display='flex' alignItems='center'>
          <RequestTextField width={200} title="Descrição" content={props.request.description}></RequestTextField>
          <RequestTextField width={200} title="Endereço de Origem" content={props.request.origin_address}></RequestTextField>
          <RequestTextField width={200} title="Endereço de Entrega" content={props.request.destination_address}></RequestTextField>
        </Box>

        { props.type == "ongoing" || props.type == "scheduled" || props.type == "finished" ?
            <Stack direction="row" height={100} alignItems='center'>
              <RequestTextField title="Empresa Contratada" content={props.request.provider_name}></RequestTextField>
              <RequestTextField title="Preço do Serviço" content={props.request.price?.toString()}></RequestTextField>
              <RequestTextField title="Motorista" content={props.request.driver_name}></RequestTextField>
              <RequestTextField title="Modelo da Ambulância" content={props.request.ambulance_type}></RequestTextField>
            </Stack>


          :
          <></> }

          { props.type == "finished" ?
            <>
              <Stack direction="row" height={100} alignItems='center'>

                <RequestTextField width={600} title="Avaliação 0 a 10" content={props.request.avaliation?.toString()}></RequestTextField>
              </Stack>

            </> 
            :
            <>
            </>
          }
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

const RequestTextField = (props: {title: string, content: string | undefined, width?: number}): React.ReactElement => {
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
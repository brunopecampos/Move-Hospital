import React, { useState, useEffect } from 'react';
import httpClient from '../../httpClient';
import { Offer, Request, User } from '../../types';
import Box from '@mui/material/Box';
import { Button, Container, Stack, Card, TextField, Typography } from '@mui/material';
import { ThemeContext } from '@emotion/react';
import { OffersModal } from '../OffersModal/OffersModal';
import { CreateOfferModal } from '../CreateOfferModal/CreateOfferModal';
import hospital1 from "../../images/hospital1.png"
import { UpdateRequestModal } from '../UpdateRequestModal/UpdateRequestModal';

export interface SimpleRequestProps {
  request: Request
  isHospital: boolean
  type: String
  user: User
  changeTab: (tab: number) => void
}

export const SimpleRequest = (props: SimpleRequestProps): React.ReactElement => {
  const [details, setDetails] = useState<Boolean>(false)
  const [patient, setPatient] = useState<string>("Placeholder")
  const [provider, setProvider] = useState<string>("Placeholder")

  const [listOfferModal, setListOfferModal] = useState<boolean>(false)
  const [offers, setOffers] = useState<Offer[]>([])
  const closeOfferList = () => setListOfferModal(false)
  const handleListOffers = async () => {

    try {
      const url = "//localhost:5000/hospital/" + props.user.id + "/request/" + props.request.id + "/offer";
      const resp = await httpClient.get(url);
      console.log(resp.data)
      setOffers(resp.data);
      setListOfferModal(true);
    } catch (error) {
      alert("Error getting requests")
    }

  }

  const [updateStatusModal, setUpdateStatusModal] = useState<boolean>(false)
  const closeUpdateStatus = () => setUpdateStatusModal(false)
  const updateRequestStatus = async (newStatus: string) => {
    try {
      const url = "//localhost:5000/provider/" + props.user.id + "/request/" + props.request.id + "/" + newStatus;
      const resp = await httpClient.patch(url);
      if (newStatus == "finished") props.changeTab(5)
      else if (newStatus == "ongoing") props.changeTab(2)
    } catch (error) {
      alert("Error getting requests")
    }
  }

  const [makeOfferModal, setMakeOfferModal] = useState<boolean>(false)
  const closeMakeOffer = () => setMakeOfferModal(false)


  const requestDetails = () => {
    setDetails(!details)
  }

  const getRequestStatus = (type: String, request: Request): string => {
    if (type == "pending") return "Aguardando resposta"
    if (type == "scheduled") return "Marcado"
    if (type == "concluded") return "Concluída"
    /* Ongoing */
    if (request.status == "ongoing") return "Buscando paciente"
    return "Paciente Coletado"
  }

  const [rating, setRating] = useState<string>("")
  const avaliate = async (rating: string) => {
    try {
      const url = "//localhost:5000/hospital/" + props.user.id + "/request/" + props.request.id;
      const resp = await httpClient.patch(url, {
        "rating": Number(rating)
      });
    } catch (error) {
      alert("Error getting requests")
    }
  }

  return (
    <>
      <div style={{ height: 200, width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }} >
          <img style={{ width: 150, height: 150 }} src={hospital1} alt="Description of the image" />
          <span style={{ marginTop: "10px", color: "#504DA6", fontWeight: 'bold' }}>{props.request.origin_name}</span>
        </div>
        <div style={{ padding: 10, width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }} >
          <div style={{ width: "100%", height: 80, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '10px' }}>
            <RequestTextField title="Destino" content={props.request.destination_name} />
            <RequestTextField title="Hora da Trasferência" content={props.request.transference_time.toString()} />
            <RequestTextField title="Status" content={getRequestStatus(props.type, props.request)} />
          </div>
          <div style={{ width: "100%", height: 80, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start', marginTop: '40px' }}>
            {
              props.isHospital ?
                props.type == "pending" ?
                  <>
                    <Button sx={{ backgroundColor: 'red', marginRight: 2 }} variant="contained" onClick={() => { }}>Excluir Transferência</Button>
                    <Button sx={{ backgroundColor: 'green', marginRight: 2 }} variant="contained" onClick={() => handleListOffers()}>Ver Propostas</Button>
                    <OffersModal user={props.user} request={props.request} open={listOfferModal} closeModal={closeOfferList} offers={offers} />
                  </>
                  : props.type == "scheduled" ?
                    <>
                      <Button sx={{ backgroundColor: 'red', marginRight: 2 }} variant="contained" onClick={() => { }}>Excluir Transferência</Button>
                    </>
                    : props.type == "ongoing" ?
                      <Button sx={{ backgroundColor: 'green', marginRight: 2 }} variant="contained" onClick={() => { }}>Ver Localização</Button>
                      : <>
                          {
                          props.request.avaliation == null ?
                            <>
                            <TextField
                              label="Avaliação de 0 a 10"
                              type="number"
                              required
                              onChange={(e) => { setRating((e.target.value))}}
                              style={{
                                borderRadius: '8px',
                                fontSize: '4px',
                                paddingRight: '10px',
                              }}
                              variant="outlined"
                              color='primary'
                              size='small'
                            />
                            
                              <Button sx={{ backgroundColor: 'green', marginRight: 2 }} variant="contained" onClick={() => { avaliate(rating)}}>Avaliar</Button>
                            </>
                            
                            : <>
                            <Typography style={{
                              color: '#504DA6',
                              paddingTop: '10px',
                              paddingRight: '10px'
                            }}>Avaliação: {props.request.avaliation}</Typography>
                            </>
                            
                          }
                        </>

                :
                props.type == "pending" ?
                  <>
                    <Button sx={{ backgroundColor: 'green', marginRight: 1 }} variant="contained" onClick={() => setMakeOfferModal(true)}>Fazer Proposta</Button>
                    <CreateOfferModal user={props.user} closeModel={closeMakeOffer} requestId={props.request.id} open={makeOfferModal} />
                  </>
                  : props.type == "ongoing" ?
                    <>
                      <Button sx={{ backgroundColor: 'green', marginRight: 1 }} variant="contained" onClick={() => { setUpdateStatusModal(true) }}>Atualizar Status</Button>
                      <UpdateRequestModal request={props.request} open={updateStatusModal} closeModal={closeUpdateStatus} updateStatus={updateRequestStatus} />
                    </>
                    : props.type == "scheduled" ?
                      <>
                        <Button sx={{ backgroundColor: 'green', marginRight: 2 }} variant="contained" onClick={() => { updateRequestStatus("ongoing") }}>Começar Transferência</Button>
                        <Button sx={{ backgroundColor: 'red', marginRight: 1 }} variant="contained" onClick={() => { }}>Excluir Transferência</Button>
                      </>
                      : /* finished */
                      <>
                        
                      </>
            }
            <Button sx={{ backgroundColor: '#504DA6' }} variant="contained" onClick={() => { requestDetails() }}>{details ? "Esconder" : "Detalhes"}</Button>
          </div>
        </div>
      </div>
      {details ? <>
        <Stack direction="row" height={100} alignItems='center'>
          <RequestTextField title="Nome do responsável" content={props.request.responsible_name}></RequestTextField>
          <RequestTextField title="Telefone do Responsável" content={props.request.responsible_phone}></RequestTextField>
          <RequestTextField title="Criação da Transferência" content={props.request.created}></RequestTextField>
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

        {props.type == "ongoing" || props.type == "scheduled" || props.type == "finished" ?
          <Stack direction="row" height={100} alignItems='center'>
            <RequestTextField title="Empresa Contratada" content={props.request.provider_name}></RequestTextField>
            <RequestTextField title="Preço do Serviço" content={props.request.price?.toString()}></RequestTextField>
            <RequestTextField title="Motorista" content={props.request.driver_name}></RequestTextField>
            <RequestTextField title="Modelo da Ambulância" content={props.request.ambulance_type}></RequestTextField>
          </Stack>


          :
          <></>}

        {props.type == "finished" ?
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
    </>
  );
}

const RequestTextField = (props: { title: string, content: string | undefined, width?: number }): React.ReactElement => {
  return (
    <Box sx={{ width: props.width ?? 150, padding: "5px" }}>
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
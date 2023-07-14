import React, {useState, useEffect} from 'react';
import httpClient from '../../httpClient';
import { Offer, Request, User } from '../../types';
import Box from '@mui/material/Box';
import { Button, Container, Stack, Card, Typography } from '@mui/material';
import { ThemeContext } from '@emotion/react';

export interface SimpleOfferProps {
  offer: Offer
  offerIndex: number
  closeModal: () => void
  request: Request
  user: User
  changeTab: (tab: number) => void
}

export const SimpleOffer = (props: SimpleOfferProps): React.ReactElement => 
{
  const acceptOffer = async () => {
    /* send request to accept offer */

    try {
      const url = "//localhost:5000/hospital/" + props.user.id + "/request/" + props.request.id + "/offer/" + props.offer.id + "/approve"; 
      const resp = await httpClient.patch(url);
      props.closeModal()
      props.changeTab(2)
    } catch (error) {
      alert("Error accepting offer")
    }

  }

  return (
    <Box sx={{backgroundColor: 'white', padding: "30px"}} >
      <Typography color="#504DA6" id="modal-modal-title" variant="h6" component="h2">
        Proposta {props.offerIndex + 1}
      </Typography>
      <Stack direction="row" spacing={5} height={100} alignItems='center' sx={{backgroundColor: 'white'}}>
        <OfferTextField title="Empresa" content={props.offer.provider_name} />
        <OfferTextField title="Avaliação" content={props.offer.provider_rating?.toString()} />
        <OfferTextField title="Valor" content={props.offer.price.toString()} />
        <OfferTextField title="Motorista" content={props.offer.driver_name} />
        <OfferTextField title="Data de envio" content={props.offer.created?.toString()} />
        <Container sx={{width: 150}}>
          <Button sx={{height: 40, backgroundColor: 'green', paddingTop: "30px", paddingBottom: "30px"}} variant="contained" onClick={() => acceptOffer()}> Aceitar Oferta</Button>
        </Container>
      </Stack>
    </Box>
  );
}

export const OfferTextField = (props: {title: string, content: string | undefined, width?: number}): React.ReactElement => {
  return (
    <Container sx={{width: props.width ?? 150}}>
      <p style={{
        fontWeight: 700,
        fontSize: 13,
        wordWrap: 'break-word'
      }}>{props.title}</p>
      <p style={{
        color: 'grey',
        fontSize: 14,
        wordWrap: 'break-word'
      }}>{props.content}</p>
    </Container>
  )
}
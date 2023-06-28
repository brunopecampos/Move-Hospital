import React, {useState, useEffect} from 'react';
import httpClient from '../../httpClient';
import { Offer, Request, User } from '../../types';
import Box from '@mui/material/Box';
import { Button, Container, Stack, Card, Typography } from '@mui/material';
import { ThemeContext } from '@emotion/react';
import { OfferModal } from '../OfferModal/OfferModal';

export interface SimpleOfferProps {
  offer: Offer
  offerIndex: number
  closeModal: () => void
}

export const SimpleOffer = (props: SimpleOfferProps): React.ReactElement => 
{
  const acceptOffer = () => {
    /* send request to accept offer */

    props.closeModal()
  }

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
    /* make request to accept offer */

    /*  */
    const offers = checkNewOffers()
  }

  return (
    <Box sx={{backgroundColor: 'white', padding: "30px"}} >
      <Typography color="#504DA6" id="modal-modal-title" variant="h6" component="h2">
        Proposta {props.offerIndex + 1}
      </Typography>
      <Stack direction="row" spacing={5} height={100} alignItems='center' sx={{backgroundColor: 'white'}}>
        <RequestTextField title="Empresa" content={props.offer.code} />
        <RequestTextField title="Valor" content={props.offer.price.toString()} />
        <RequestTextField title="Distância até ponto de embarque" content={props.offer.status} />
        <RequestTextField title="Avaliação" content={props.offer.status} />
        <Container sx={{width: 150}}>
          <Button sx={{height: 40, backgroundColor: 'green', paddingTop: "30px", paddingBottom: "30px"}} variant="contained" onClick={() => acceptOffer()}> Aceitar Oferta</Button>
        </Container>
      </Stack>
    </Box>
  );
}

const RequestTextField = (props: {title: string, content: string | undefined, width?: number}): React.ReactElement => {
  return (
    <Container sx={{width: props.width ?? 150}}>
      <p style={{
        fontWeight: 700,
        fontSize: 14,
        wordWrap: 'break-word'
      }}>{props.title}</p>
      <p style={{
        color: 'grey',
        fontSize: 15,
        wordWrap: 'break-word'
      }}>{props.content}</p>
    </Container>
  )
}
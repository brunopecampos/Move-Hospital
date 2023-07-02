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
          driver_name: "aaaa",
          ambulance_id: "aaaa"
      },
      {
          code: "bbbbbb",
          price: 100.00,
          status: "created",
          driver_name: "aaaa",
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
        <OfferTextField title="Empresa" content={props.offer.code} />
        <OfferTextField title="Valor" content={props.offer.price.toString()} />
        <OfferTextField title="Distância até ponto de embarque" content={props.offer.status} />
        <OfferTextField title="Avaliação" content={props.offer.status} />
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
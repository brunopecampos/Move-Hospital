import React, {useState, useEffect} from 'react';
import httpClient from '../../httpClient';
import { Ambulance, Offer, Request, User } from '../../types';
import Box from '@mui/material/Box';
import { Button, Container, Stack, Card } from '@mui/material';
import { ThemeContext } from '@emotion/react';
import { SimpleRequest } from '../SimpleRequest/SimpleRequest';
import { DashboardHeader } from '../DashboardHeader/DashboardHeader';
import { OfferTextField, SimpleOffer } from '../SimpleOffer/SimpleOffer';
import hospital1 from "../../images/hospital1.png"


const hOffers: Offer[] = [{
    price: 20.0,
    hospital_name: "Hospital santa monica",
    origin_address: "Rua corinto 512",
    destination_address: "Rua Alvares Moraes 123",
    transference_time: new Date(),
    driver_name: "Joao",
    ambulance_model: "Ducato",
    ambulance_license_place: "ada-1231",
},
{
    price: 60.0,
    hospital_name: "Hospital 9 de Julho",
    origin_address: "Rua Jose 512",
    destination_address: "Rua Dias Morato123",
    transference_time: new Date(),
    driver_name: "Rafa",
    ambulance_model: "Doblo",
    ambulance_license_place: "jsd-1323",
},
]


export interface OffersTabProps {
  type: string
}

export const OffersTab = (props: OffersTabProps): React.ReactElement => {
  const [requests, setRequests] = useState<Offer[]>(hOffers)

  const createUrl = (user: User) => {
    return "//localhost:5000/" + user.user_type + props.type
  }

  const isHospital = (user: User) => {
    return user.user_type == "hospital"
  }

  useEffect(() => {
    (async () => {
      try {
        /*const resp = await httpClient.get(createUrl(props.user));
        setRequests([...resp.data])*/
      } catch (error) {
        console.log("Not authenticated or error in request");
      }
    })();
  }, []);


  const listOffers = hOffers.map((item, index) => (
    <>
      <OfferItem offer={item} />
      <hr />
    </>
  ))  

  

  return (
    <Box sx={{
      padding: "50px",
    }}>
      <Container>
        <Card elevation={3}  sx={{
          padding: 5
        }}>
          <span style={{
            fontSize: 20,
            fontWeight: 900,
            color: "#504DA6",
          }} >Ofertas em aberto</span>
          {
            listOffers
          }
        </Card>
      </Container>
    </Box>
  );
}

const OfferItem = (props: {offer: Offer}) : React.ReactElement => {
    const cancelOffer = () => {
    
    }

    return (
      <div style={{height: 250, width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'space-between', marginTop: '10px'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}} >
          <img style={{width: 150, height: 150}} src={hospital1} alt="Description of the image" />
          <span style={{marginTop: "10px", color: "#504DA6", fontWeight: 'bold'}}>{props.offer.hospital_name}</span>
        </div>
        <div style={{width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}} >
          <div style={{width: "100%",  height: 80, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '10px'}}>
            <OfferTextField title='Preço' content={props.offer.price.toString()} />
            <OfferTextField title='Endereço de Origem' content={props.offer.origin_address} />
            <OfferTextField title='Endereço de Destino' content={props.offer.destination_address} />
          </div>
          <div style={{width: "100%", height: 80, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '10px'}}>
            <OfferTextField title='Hora da Transferência' content={props.offer.transference_time?.toDateString()} />
            <OfferTextField title='Ambulância' content={props.offer.ambulance_model + " - " + props.offer.ambulance_license_place} />
            <OfferTextField title='Motorista' content={props.offer.driver_name} />
          </div>
          <div style={{width: "100%", height: 20, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start', marginTop: '10px'}}>
            <Button sx={{backgroundColor: 'red'}} variant="contained" onClick={() => cancelOffer()}>Cancelar Oferta</Button>
          </div>
        </div>
      </div>
    )
}
import React, {useState, useEffect} from 'react';
import httpClient from '../../httpClient';
import { Ambulance, Offer, Request, User } from '../../types';
import Box from '@mui/material/Box';
import { Button, Container, Stack, Card, Typography } from '@mui/material';
import { ThemeContext } from '@emotion/react';
import ambulanceImg from "../../images/ambulance.png"


export interface SimpleAmbulanceProps {
  ambulance: Ambulance
  changeTab: (tab: number) => void
}

export const SimpleAmbulance = (props: SimpleAmbulanceProps): React.ReactElement => 
{

  return (
    <div style={{width: "650px", height: 80, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
      <img style={{ width: 80, height: 41 }} src={ambulanceImg} alt="Description of the image" />
      <AmbulanceTextField text={props.ambulance.ambulance_type}  />
      <AmbulanceTextField text={props.ambulance.factory_model} marginLeft={"60px"} />
      <AmbulanceTextField text={props.ambulance.license_plate} marginLeft={"50px"} />
      <Button sx={{ backgroundColor: 'red' }} variant="contained" onClick={() => {}}>Deletar</Button>
    </div>
  );
}

export const AmbulanceTextField = (props: {text: string, width?: number, marginLeft?: string}): React.ReactElement => {
  return (
    <div style={{width: props.width ? props.width : "100px", marginLeft: props.marginLeft ? props.marginLeft : "30px"}}>
      <span style={{color: "#504DA6", fontSize: '16px'}}>{props.text}</span>
    </div>
  )
}
import React, {useState, useEffect} from 'react';
import httpClient from '../../httpClient';
import { Request, User } from '../../types';
import Box from '@mui/material/Box';
import { Button, Container, Stack, Card } from '@mui/material';
import { ThemeContext } from '@emotion/react';
import { SimpleRequest } from '../SimpleRequest/SimpleRequest';
import { DashboardHeader } from '../DashboardHeader/DashboardHeader';



const hResquests: Request[] = [{
    id: "aaa",
    description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    ambulance_type: "aaaa",
    responsible_name: "aaaaa",
    created: new Date(),
    transference_time: new Date(),
    origin_name: "alksdfjlsd",
    origin_address: "sdfdlskjf",
    destination_address: "rua aaaaaaaaaaa numero aaaaaaa",
    destination_name: "hospital aaaaaaaa",
    status: "ongoing",
    patient_name: "aaaa",
    patient_age: 10,
    patient_gender: "m",
    patient_clinical_condition: "blabla",
    patient_phone: "123123123",
    patient_observations: "blelble",
    responsible_phone: "aaaaaaaaa"
},
{
    id: "bbb",
    description: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    ambulance_type: "bbbb",
    responsible_name: "bbbbb",
    created: new Date(),
    transference_time: new Date(),
    destination_address: "rua bbbbbbbbbbb numero bbbbbbb",
    destination_name: "hospital bbbbbbbb",
    status: "ongoing",
    patient_name: "aaaa",
    patient_age: 10,
    patient_gender: "m",
    patient_clinical_condition: "blabla",
    patient_phone: "123123123",
    patient_observations: "blelble",
    responsible_phone: "bbbbbbbbb",
    origin_name: "alksdfjlsd",
    origin_address: "sdfdlskjf",
},
]

export interface RequestsTabProps {
  user: User,
  type: string
}

export const RequestsTab = (props: RequestsTabProps): React.ReactElement => {
  const [requests, setRequests] = useState<Request[]>(hResquests)

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


  const listRequests = requests.map((item, index) => (
    <>
      <SimpleRequest request={item} isHospital={isHospital(props.user)} type={props.type} ></SimpleRequest>
      <hr />
    </>
  ))  

  return (
    <Box sx={{
      padding: "50px",
    }}>
      <Container>
        {
          isHospital(props.user) ?
            <DashboardHeader username={props.user.name} />
          : <h1>Novas Solicitações</h1>
        }
        <Card elevation={3}  sx={{
          padding: 5
        }}>
          <span style={{
            fontSize: 20,
            fontWeight: 900,
            color: "#504DA6",
          }} >Transferências em Andamento:</span>
          {
            listRequests
          }
        </Card>
      </Container>
    </Box>
  );
}
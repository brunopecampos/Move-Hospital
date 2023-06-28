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
    destination_address: "rua aaaaaaaaaaa numero aaaaaaa",
    destination_name: "hospital aaaaaaaa",
    status: "ongoing",
    hospital_id: "aaaaa",
    patient_id: "aaaaaa",
    offer_id: "aaaaaa",
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
    hospital_id: "bbbbb",
    patient_id: "bbbbbbb",
    offer_id: "bbbbbb",
    responsible_phone: "bbbbbbbbb"
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
    status: "created",
    hospital_id: "bbbbb",
    patient_id: "bbbbbbb",
    offer_id: "bbbbbb",
    responsible_phone: "bbbbbbbbb"
}
]

export interface RequestsCardProps {
  user: User,
  header?: boolean
  type: string
}

export const RequestsCard = (props: RequestsCardProps): React.ReactElement => {
  const [requests, setRequests] = useState<Request[]>(hResquests)

  const createUrl = (user: User) => {
    return "//localhost:5000/" + user.user_type + props.type
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
      <SimpleRequest request={item}></SimpleRequest>
      <hr />
    </>
  ))  

  return (
    <Box sx={{
      padding: "50px",  minHeight: '100vh' 
    }}>
      <Container>
        {
          props.header ?
            <DashboardHeader username={props.user.email} />
          : <></>
        }
        <Card elevation={3}  sx={{
          marginTop: 10,
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
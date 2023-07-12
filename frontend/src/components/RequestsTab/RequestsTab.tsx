import React, {useState, useEffect} from 'react';
import httpClient from '../../httpClient';
import { Request, User } from '../../types';
import Box from '@mui/material/Box';
import { Button, Container, Stack, Card, Typography } from '@mui/material';
import { ThemeContext } from '@emotion/react';
import { SimpleRequest } from '../SimpleRequest/SimpleRequest';
import { DashboardHeader } from '../DashboardHeader/DashboardHeader';

export interface RequestsTabProps {
  user: User,
  type: string
  label: string
  changeTab: (tab: number) => void
}

export const RequestsTab = (props: RequestsTabProps): React.ReactElement => {
  const [requests, setRequests] = useState<Request[]>([])

  const getUrl = () => {
    const base = "//localhost:5000/";
    return base + props.user.user_type + "/" + props.user.id + "/request/" + props.type;
  }

  useEffect(() => {
    (async () => {
      try {
        const url = getUrl()
        const resp = await httpClient.get(url);
        setRequests(resp.data)
        console.log(requests)
      } catch (error) {
        alert("Error getting requests")
      }
    })();
  }, []);

  const createUrl = (user: User) => {
    return "//localhost:5000/" + user.user_type + props.type
  }

  const isHospital = (user: User) => {
    return user.user_type == "hospital"
  }

  const listRequests = requests.map((item, index) => (
    <>
      <SimpleRequest changeTab={props.changeTab} user={props.user} request={item} isHospital={isHospital(props.user)} type={props.type} ></SimpleRequest>
      <hr />
    </>
  ))  

  return (
    <Box sx={{
      padding: "50px",
      minHeight: "600px"
    }}>
      <Container>
        {
          isHospital(props.user) ?
            <DashboardHeader userId={props.user.id} username={props.user.name} />
          : <></>
        }
        <Card elevation={3}  sx={{
          padding: 5
        }}>
          <span style={{
            fontSize: 20,
            fontWeight: 900,
            color: "#504DA6",
          }} >{props.label}:</span>
          {
            requests.length > 0 ? listRequests :
            <div style={{ width: "650px", height: 80, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '50px' }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Ainda não há nenhuma...
              </Typography>
            </div>
          }
        </Card>
      </Container>
    </Box>
  );
}
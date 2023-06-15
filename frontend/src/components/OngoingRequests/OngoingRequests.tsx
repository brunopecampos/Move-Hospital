import React, {useState, useEffect} from 'react';
import httpClient from '../../httpClient';
import { Offer, User } from '../../types';
import loginImage from "../../images/login-logo.png"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Container, Stack } from '@mui/material';

export interface OngoingRequestsProps {
  user: User,
}



export const OngoingRequests = (props: OngoingRequestsProps): React.ReactElement => {
  const [offers, setOffers] = useState<Offer[]>([])

  const createUrl = (user: User) => {
    return "//localhost:5000/" + user.user_type + "/offer/resquest/created"
  }

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get(createUrl(props.user));
        setOffers([...resp.data])
      } catch (error) {
        console.log("Not authenticated or error in request");
      }
    })();
  }, []);

  return (
    <Box sx={{
      padding: "50px"
    }}>
      <Stack>
        <Container>
          <h1>Olá {props.user.email}</h1>
          <Button variant="contained">Nova solicitação</Button>
        </Container>
      </Stack>
    </Box>
  );
}
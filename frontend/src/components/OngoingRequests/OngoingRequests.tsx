import * as React from 'react';
import loginImage from "../../images/login-logo.png"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export interface OngoingRequestsProps {
  isHospital: boolean,
  username: string,
}

export const OngoingRequests = (props: OngoingRequestsProps): React.ReactElement => {
  return (
    <h1>Ongoing Requests</h1>
  );
}
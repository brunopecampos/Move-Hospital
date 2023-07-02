import * as React from 'react';
import loginImage from "../../images/login-logo.png"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { RequestsTab } from '../RequestsTab/RequestsTab';
import { User, Hospital } from '../../types';
import { ProfileForm } from '../ProfileForm/Profile';
import { OffersTab } from '../OfferTab/OfferTab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

interface ProviderDashboardProps {
  user: User | null;
  logout: () => {};
}

const ProviderDashboard  = (props: ProviderDashboardProps): React.ReactElement => {
  const [value, setValue] = React.useState(1);
  const [name, setName] = React.useState('');
  const [cnpj, setCnpj] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [employee_name, setEmployeeName] = React.useState('');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hospital: Hospital = {
      name,
      cnpj,
      address,
      email,
      employee_name
    };

    console.log(hospital);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: '#F5F5F5', display: 'flex'}}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        textColor='secondary'
        indicatorColor='secondary'
        sx={{ borderRight: 1, borderColor: 'divider', backgroundColor: '#504DA6', fontSize: "30px"}}
      >
        <img src={loginImage} alt="Description of the image" style={{width: "80%", alignSelf: 'center'}}/>
        <Tab label="Transferências em Andamento" {...a11yProps(1)} />
        <Tab label="Novas transferências" {...a11yProps(2)} />
        <Tab label="Suas ofertas" {...a11yProps(3)} />
        <Tab label="Transferências marcadas" {...a11yProps(4)} />
        <Tab label="Meu Perfil" {...a11yProps(5)} />
        <Tab label="Sair" {...a11yProps(6)} onClick={() => props.logout()} />
      </Tabs>
      <TabPanel value={value} index={0}></TabPanel>
      <TabPanel value={value} index={1}>
        {
          props.user ?
          <RequestsTab user={props.user} type="ongoing" />
          : <></>
        }
      </TabPanel>
      <TabPanel value={value} index={2}>
        {
          props.user ?
          <RequestsTab user={props.user} type="pending" />
          : <></>
        }
      </TabPanel>
      <TabPanel value={value} index={3}>
        {
          props.user ?
          <OffersTab type="accepted" />
          : <></>
        }
      </TabPanel>
      <TabPanel value={value} index={4}>
        {
          props.user ?
          <RequestsTab user={props.user} type="finished" />
          : <></>
        }
      </TabPanel>
      <TabPanel value={value} index={5}>
      {
          props.user ?
          <ProfileForm />
          : <></>
        }
      </TabPanel>
      <TabPanel value={value} index={6}></TabPanel>
    </Box>
  );
}

export default ProviderDashboard;
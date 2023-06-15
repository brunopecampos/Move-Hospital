import * as React from 'react';
import loginImage from "../../images/login-logo.png"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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

export default function VerticalTabs() {
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: "100vh"}}
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
        <Tab label="Página INicial" {...a11yProps(1)} />
        <Tab label="Meu Perfil" {...a11yProps(2)} />
        <Tab label="Sair" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}></TabPanel>
      <TabPanel value={value} index={1}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Three
      </TabPanel>
    </Box>
  );
}

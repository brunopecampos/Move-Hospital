import { Stack, Button, Modal, Box, Typography, TextField, hexToRgb } from '@mui/material';
import { useState } from 'react';
import { Offer } from '../../types';
import { SimpleOffer } from '../SimpleOffer/SimpleOffer';

interface OffersModalProps{
    requestId: string | undefined
}

export const OffersModal = (props: OffersModalProps): React.ReactElement => {

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  const [offers, setOffers] = useState<Offer[]> ([
    {
        code: "aaaaaa",
        price: 50.00,
        status: "created",
        driver_id: "aaaa",
        ambulance_id: "aaaa"
    },
    {
        code: "bbbbbb",
        price: 100.00,
        status: "created",
        driver_id: "aaaa",
        ambulance_id: "aaaa"
    }
  ])

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'rgba(80, 77, 166, 0.8)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const textFieldStyle = {
    background: 'inherit',
    borderRadius: '8px',
    marginTop: '5px',
    marginBottom: '5px',
  };

  const listRequests = offers.map((item, index) => (
    <>
      <SimpleOffer closeModal={() => { setOpen(false) }} offer={item} offerIndex={index}></SimpleOffer>
    </>
  ))

  return (
    <>
       <Button sx={{height: 40}} variant="contained" onClick={handleOpen}> Novas Ofertas </Button>
       <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            
            {
            listRequests
            }
          </Box>
        </Modal>
    </>
  );
}

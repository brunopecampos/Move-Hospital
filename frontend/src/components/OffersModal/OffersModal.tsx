import { Stack, Button, Modal, Box, Typography, TextField, hexToRgb } from '@mui/material';
import { useState } from 'react';
import { Offer } from '../../types';
import { SimpleOffer } from '../SimpleOffer/SimpleOffer';

interface OffersModalProps{
  offers: Offer[]
  open: boolean
  closeModal: () => void
}

export const OffersModal = (props: OffersModalProps): React.ReactElement => {

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

  const listRequests = props.offers.map((item, index) => (
    <>
      <SimpleOffer closeModal={props.closeModal} offer={item} offerIndex={index}></SimpleOffer>
    </>
  ))

  return (
       <Modal
          open={props.open}
          onClose={() => {}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            
            {
            listRequests
            }
          </Box>
        </Modal>
  );
}

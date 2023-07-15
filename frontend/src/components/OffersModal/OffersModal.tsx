import { Stack, Button, Modal, Box, Typography, TextField, hexToRgb } from '@mui/material';
import { useState } from 'react';
import { Offer, User, Request } from '../../types';
import { SimpleOffer } from '../SimpleOffer/SimpleOffer';

interface OffersModalProps{
  offers: Offer[]
  open: boolean
  closeModal: () => void
  user: User
  request: Request
  changeTab: (tab: number) => void
}

export const OffersModal = (props: OffersModalProps): React.ReactElement => {

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'rgba(130, 127, 208, 0.9)',
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
      <SimpleOffer changeTab={props.changeTab} user={props.user} request={props.request} closeModal={props.closeModal} offer={item} offerIndex={index}></SimpleOffer>
    </>
  ))

  return (
       <Modal
          open={props.open}
          onClose={props.closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <> 
            {
              props.offers.length > 0 ?
              listRequests
              : 
            <div style={{ color: 'white', width: "650px", height: 80, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '50px' }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Ainda não há nenhuma propsta. 
                Aguarde um pouco...
              </Typography>
            </div>
            }
            </>
          </Box>
        </Modal>
  );
}

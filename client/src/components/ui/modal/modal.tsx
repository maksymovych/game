import * as React from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
};

type ModalProps = {
  body: string;
  setIsOpen: boolean;
  children?: JSX.Element;
};

export default function ModalUnstyledDemo({
  setIsOpen,
  body,
  children,
}: ModalProps) {
  const [open, setOpen] = React.useState(setIsOpen);
  const handleClose = () => setOpen(false);

  return (
    <StyledModal
      aria-labelledby='unstyled-modal-title'
      aria-describedby='unstyled-modal-description'
      open={open}
      onClose={handleClose}
      BackdropComponent={Backdrop}
    >
      <Box sx={style}>
        <h2 id='unstyled-modal-title'>{body}</h2>
        {children}
      </Box>
    </StyledModal>
  );
}

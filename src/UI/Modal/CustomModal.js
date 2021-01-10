import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@material-ui/core';

const CustomModal = props => {
  const {show, handleCancel, handleConfirm, modalBody, modalHeading, isDeleting} = props;

  return (
    <>
      <Dialog open={show} onClose={handleCancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{modalHeading}</DialogTitle>
        <DialogContent>
          {modalBody}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} >
            Cancel
          </Button>
          <Button onClick={handleConfirm} color={isDeleting ? 'secondary' : 'primary'}>
            {isDeleting ? 'Delete' : 'Post'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CustomModal;
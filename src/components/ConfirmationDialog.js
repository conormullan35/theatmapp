import React, { useEffect } from 'react';
import ReactDOM from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmationDialog = (props) =>{

  //Import props
  const {balance} = props;
  const {setBalance} = props;
  const {value} = props;
  const {setIsLoading} = props;
  const {isDisabled} = props;
  const {setVisible} = props;
  const {showDialog} = props;
  const {setShowDialog} = props;
  const {setOpen} = props;
  const {open} = props;

  //Toggle values when state changes
  useEffect(()=>{
    if(open){
      setOpen(false);
    }
    if(!open && showDialog==true){
      setOpen(true);
    }

  }, [showDialog] );

  //Toggle values when close is clicked
  const handleClose = () => {
    setShowDialog(false);
    setOpen(false)
  };

  const handleOpen = () => {
    //Only allow withdrawl if within constraints of balance/overdraft
    if(balance-value>=-100){
        if(value%5===0){
          setIsLoading((prevLoading) => !prevLoading)
          setVisible((prevLoading) => !prevLoading)
          setBalance(prevBal => prevBal - value);
          setOpen(false)
          isDisabled(true)
        }
        else alert ('This machine only dispenses £5, £10 and £20 notes.');
      }
      //If exceeding the limits, throw an error
      if(balance-value<-100) alert('You have surpassed your overdraft amount');
      setShowDialog(false);
  }
  
  return (
    <React.Fragment>
      {props.children}
      {open ? (
        <div>
        <Dialog
          open={open}
          onClose={()=>handleClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Cash Withdrawl"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to withdraw £{props.value}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>handleClose()} color="primary">
              Cancel
            </Button>
            <Button id='openBtn' onClick={()=>handleOpen()} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>) : null}
    </React.Fragment>
  );
}

export default ConfirmationDialog;
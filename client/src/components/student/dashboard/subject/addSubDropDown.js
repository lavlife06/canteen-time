import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Button, Menu,  MenuItem, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) =>( {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '15ch',
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '50ch',
  },
}));

const AddClassDropDown = ({handleToggle, openAddSub}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleToggle();
  }

  return (
    <Fragment>
      <Drawer open={openAddSub} onClose={handleToggle}  anchor='bottom'>
        <div style={{marginLeft: 20}}>
          <h2>Enter Subject Code</h2>
        </div>
        <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="on">
          <div>
            <TextField
              id="outlined-multiline-static"
              label="Subject Code"
              className={classes.textField}
              variant="outlined"
              value={code}
              required
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div style={{margin: 20, display: 'flex'}}>
            <div>
              <Button variant="contained" color="primary" type="submit" >
                Submit
              </Button>
            </div>
            <div style={{marginLeft: 20}}>
              <Button variant="contained" color="secondary" onClick={handleToggle}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Drawer>
    </Fragment>
  );
}
 
export default AddClassDropDown;
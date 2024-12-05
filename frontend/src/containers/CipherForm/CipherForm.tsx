import Grid from '@mui/material/Grid2';
import { CircularProgress, IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { decodeMessage, encodeMessage } from '../../thunks/cipherThunk.ts';
import { selectDecodedMessage, selectEncodedMessage, selectLoading } from '../../slices/cipherSlice.ts';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { password } from '../../../../globalConstants.ts';
import { toast } from 'react-toastify';

const initialState = {
  encodeMessage: '',
  password: '',
  decodeMessage: '',
};

const CipherForm = () => {
  const [form, setForm] = useState({...initialState});
  const dispatch = useAppDispatch();
  const selectEncoded: string = useAppSelector(selectEncodedMessage);
  const selectDecoded: string = useAppSelector(selectDecodedMessage);
  const isLoading: boolean = useAppSelector(selectLoading);

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (selectEncoded) {
      setForm((prevState) => (
        {
          ...prevState,
          decodeMessage: selectEncoded
        }
      ));
    }
  }, [selectEncoded]);

  useEffect(() => {
    if (selectDecoded) {
      setForm((prevState) => (
        {
          ...prevState,
          encodeMessage: selectDecoded
        }
      ));
    }
  }, [selectDecoded]);

  const onEncodeClick: () => Promise<void> = async () => {
    if (form.password !== password) {
      toast.error('Invalid password');
      return;
    }

    if (!form.encodeMessage.trim().length) {
      toast.error('Invalid message');
      return;
    }

    const messageObj = {message: form.encodeMessage, password: form.password};
    await dispatch(encodeMessage(messageObj));
  };

  const onDecodeClick: () => Promise<void> = async () => {
    if (form.password !== password) {
      toast.error('Invalid password');
      return;
    }

    if (!form.decodeMessage.trim().length) {
      toast.error('Invalid message');
      return;
    }

    const messageObj = {message: form.decodeMessage, password: form.password};
    await dispatch(decodeMessage(messageObj));
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm(prevState => ({...prevState, [name]: value}));
  };

  return (
    <Grid style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '50px'
    }}>
      {
        isLoading ? <CircularProgress/> :
          <>
            <form onSubmit={onSubmitForm}>
              <Grid container direction="column" spacing={2}>
                <Grid size={{xs: 12}}>
                  <TextField
                    id="encodeMessage"
                    name="encodeMessage"
                    label="Encode message"
                    value={form.encodeMessage}
                    onChange={onInputChange}
                  />
                </Grid>

                <Grid size={{xs: 12}} style={{
                  display: 'flex',
                  justifyContent: 'between',
                  alignItems: 'center',
                }}>

                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    value={form.password}
                    onChange={onInputChange}
                  />

                  <IconButton
                    component="button"
                    type="button"
                    color="secondary"
                    onClick={onEncodeClick}
                  >
                    <ArrowDownwardIcon/>
                  </IconButton>

                  <IconButton
                    component="button"
                    type="button"
                    color="secondary"
                    onClick={onDecodeClick}
                  >
                    <ArrowUpwardIcon/>
                  </IconButton>
                </Grid>

                <Grid size={{xs: 12}}>
                  <TextField
                    id="decodeMessage"
                    name="decodeMessage"
                    label="Decode message"
                    value={form.decodeMessage}
                    onChange={onInputChange}
                  />
                </Grid>
              </Grid>
            </form>
          </>
      }
    </Grid>
  );
};

export default CipherForm;
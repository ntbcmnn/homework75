import { createSlice } from '@reduxjs/toolkit';
import { decodeMessage, encodeMessage } from '../thunks/cipherThunk.ts';
import { RootState } from '../app/store.ts';

interface ICipherState {
  encodedMessage: string;
  decodedMessage: string;
  loading: boolean;
  error: boolean;
}

const initialState: ICipherState = {
  encodedMessage: '',
  decodedMessage: '',
  loading: false,
  error: false,
};

export const selectEncodedMessage = (state: RootState) => state.cipher.encodedMessage;
export const selectDecodedMessage = (state: RootState) => state.cipher.decodedMessage;
export const selectLoading = (state: RootState) => state.cipher.loading;

const cipherSlice = createSlice({
  name: 'cipher',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(encodeMessage.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(encodeMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.encodedMessage = action.payload.message;
      })
      .addCase(encodeMessage.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(decodeMessage.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(decodeMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.decodedMessage = action.payload.message;
      })
      .addCase(decodeMessage.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  }
});

export const cipherReducer = cipherSlice.reducer;
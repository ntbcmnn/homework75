import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi.ts';
import { IMessageForm } from '../types';

export const encodeMessage = createAsyncThunk(
  'encode/encodeMessage',
  async (obj: IMessageForm) => {
    const response = await axiosApi.post('/encode', {...obj});
    return response.data;
  }
);

export const decodeMessage = createAsyncThunk(
  'decode/decodeMessage',
  async (obj: IMessageForm) => {
    const response = await axiosApi.post('/decode', {...obj});
    return response.data;
  }
);
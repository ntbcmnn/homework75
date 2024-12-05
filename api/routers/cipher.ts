import express from 'express';
import {IMessage} from '../types';
import {password} from '../../globalConstants';

const vigenere = require('caesar-salad').Vigenere;
const cipherRouter = express.Router();

cipherRouter.post('/encode', (req, res) => {
    const {message, password: reqPassword} = req.body as IMessage;

    if (!message || reqPassword !== password) {
        console.error('Message and password are required.');
    }

    const response: string = JSON.stringify({message: vigenere.Cipher(reqPassword).crypt(message)});
    res.send(response);
});

cipherRouter.post('/decode', (req, res) => {
    const {message, password: reqPassword} = req.body as IMessage;

    if (!message || reqPassword !== password) {
        console.error('Message and password are required.');
    }

    const response: string = JSON.stringify({message: vigenere.Decipher(reqPassword).crypt(message)});
    res.send(response);
});

export default cipherRouter;
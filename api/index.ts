import express from 'express';
import cipherRouter from './routers/cipher';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/', cipherRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
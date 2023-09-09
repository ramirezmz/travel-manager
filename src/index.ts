import express from 'express';
import cors from 'cors';
import router from './routes/routes';

const app = express();

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

app.use(cors())
app.use(express.json())

app.use(router)
app.listen(PORT, async () => {
    console.log(`Server is running on port ${BASE_URL}🚀`);
})
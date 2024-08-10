import express from 'express';
import router from './routes/tasks.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/tasks", router);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
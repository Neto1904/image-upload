import express from 'express';
import cors from 'cors';
import routes from './routes';
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(routes);
app.listen(8080, () => {
  console.log(`App runningx on port ${PORT}`);
});

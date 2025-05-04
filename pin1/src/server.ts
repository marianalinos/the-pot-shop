import express, { Express } from 'express';
import routes from './routes';
import { json } from 'body-parser';
import cors from 'cors';

const app: Express = express();
const port = String(process.env.SERVERPORT);
app.use(cors());

app.use(json());
app.use(routes);

app.listen(port, () => {
	console.log('[SERVER] Rodando em http://localhost:' + port);
});

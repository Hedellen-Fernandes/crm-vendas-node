import express from 'express';
import routes from './routes';
import SqlStrategy from '@sqlStrategies/sqlStrategy';

const app = express();
const sqlStrategy = new SqlStrategy();

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

sqlStrategy.connect();

app.use(express.json());

app.use(routes);

export default app;
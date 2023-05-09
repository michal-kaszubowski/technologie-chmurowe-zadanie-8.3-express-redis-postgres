const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const { Client } = require('pg');

const app = express();
app.use(bodyParser.json());

const redisClient = redis.createClient({
    socket: {
        host: 'redis',
        port: '6379'
    }
});

const pgClient = new Client({
    user: 'postgres',
    host: 'postgres',
    database: 'mydb',
    password: 'password',
    port: 5432
});

redisClient.on('error', err => console.error('Redis error:', err));

async function main() {
    await redisClient.connect();
    await pgClient.connect();

    await pgClient.query('CREATE TABLE IF NOT EXISTS data (data VARCHAR)');

    app.get('/', (req, res) => res.send('Hello there!\n'));

    app.get('/cache', (req, res) => {
        redisClient
            .get('value')
            .then(rep => res.send(rep));
    });

    app.post('/cache', (req, res) => {
        let data = req.body.cache;
        redisClient
            .set('value', data)
            .then(res.send('OK'));
    });

    app.get('/data', (req, res) => {
        pgClient
            .query('SELECT * FROM data')
            .then(rep => res.send(rep.rows))
            .catch(err => console.error(err));
    });

    app.post('/data', (req, res) => {
        let data = req.body.data;
        pgClient
            .query('INSERT INTO data(data) VALUES ($1)', [data])
            .then(res.send('OK'))
            .catch(err => console.error(err));
    });

    app.listen(3000, () => console.log('Server is UP & RUNNING on port 3000!'));
}

main();

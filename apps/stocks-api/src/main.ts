/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';
import * as https from 'https';
const expiresIn = 20 * 1000 // 20s;
const init = async () => {
  const server = new Server({
    port: 3333,
    host: 'localhost'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return {
        hello: 'world'
      };
    }
  });

  // TODO: move to routes/stocks
  const getStocks = async (symbol, period, token) => {
    // TODO: add variable for `sandbox.iexapis.com`
    const url = `https://sandbox.iexapis.com/beta/stock/${symbol}/chart/${period}?token=${token}`;
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let json = ''
        res.on('data', (data) => json += data);
        res.on('end', () => {
          const response = JSON.parse(json);
          resolve(response);
        })
      }).on('error', (error) => {
        reject(error);
      });

    })
  };
  server.method('getStocks', getStocks, {
    cache: {
        expiresIn,
        generateTimeout: 2000
    },
    generateKey: (symbol, period) => `${symbol}:${period}`
  });

  server.route({
    method: 'GET',
    path: '/stock/{symbol}/{period}',
    options: {
      cors: {
        origin: ['*']
      },
    },
    handler: async function(req, h) {
      const { symbol, period } = req.params;
      const { token } = req.query
      return await server.methods.getStocks(symbol, period, token);
    }
  });


  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mail = require('./mail');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (request, response, next) => {
  return response.json({message: 'Server working!!'});
});

app.post('/send', (request, response, next) => {
  const {email, name, subject, message} = request.body;
  
  mail(email, name, subject, message).then(res => response.json(res)).catch(error => response.json(error))
});

const server = http.createServer(app);

const port = process.env.PORT || 3030;
server.listen(port);

console.log('Server listening on ' + port);

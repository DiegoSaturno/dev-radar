const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const routes = require('./routes');
const cors = require('cors');
const { setupWebsocket } = require('./config/websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://dev-radar:dev-radar-omnistack@cluster0-ok4rn.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen('3333', () => console.log('App listening on port 3333'));

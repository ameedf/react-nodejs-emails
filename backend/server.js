const express = require('express');
const bodyParser = require('body-parser');
const messagesRouter = require('./messages/messagesRouter');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  const {method, path} = req;
  console.log(`${Date.now()} - Request started: ${method} ${path}`);
  next();
  console.log(`${Date.now()} - Request ended:   ${method} ${path}`);
});

app.use('/messages', messagesRouter);

const PORT = 4000;

app.get('/', (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));


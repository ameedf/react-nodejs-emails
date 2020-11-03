const express = require('express');
const router = express.Router();
//   '/messages...'

const messages = [
  { id: 1, from: "user1@gmail.com", to: "dest1@gmail.com", subject: "Hello", body: "This is a message" },
  { id: 2, from: "user2@gmail.com", to: "dest2@gmail.com", subject: "Hello", body: "This is a message" },
  { id: 3, from: "user3@gmail.com", to: "dest3@gmail.com", subject: "Hello", body: "This is a message" },
  { id: 4, from: "user4@gmail.com", to: "dest4@gmail.com", subject: "Hello", body: "This is a message" },
];
let nextId = 5;

router.get('/', (req, res) => {
  res.send(messages);
});

router.get('/:messageId', (req, res) => {
  const id = parseInt(req.params.messageId);
  const message = messages.find(m => m.id === id);
  if (message) {
    res.send(message);
  } else {
    res.status(400).send({ error: `Cannot find message with ID '${id}'` });
  }
});

router.delete('/:messageId', (req, res) => {
  const id = parseInt(req.params.messageId);
  const messageIndex = messages.findIndex(m => m.id === id);
  if (messageIndex >= 0) {
    const deleted = messages.splice(messageIndex, 1)[0];
    res.send(deleted);
  } else {
    res.status(400).send({ error: `Cannot find message with ID '${id}'` });
  }
});

router.post('/', (req, res) => {
  const message = req.body;
  const newMessage = { id: nextId, ...message };
  nextId++;
  messages.push(newMessage);
  res.send(newMessage);
});

module.exports = router;
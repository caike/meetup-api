const express = require("express");
const app = express();
const cors = require("permissive-cors");
app.use(cors());

const fs = require("fs");
const events = JSON.parse(fs.readFileSync("events.json"));

app.get("/events", (req, res) => res.json(events));

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

app.post("/events", jsonParser, (req, res) => {
  const { event } = req.body;
  const isDateTaken = events.events.find(e => e.date === event.date);
  if (isDateTaken) {
    res.sendStatus(400);
    return false;
  }
  events.events = events.events.concat(event);
  res.sendStatus(201);
});

module.exports = app;

import express, { json } from "express";
import morgan from "morgan";

const PORT = process.env.PORT || 3001;

const server = express();
server.use(express.json());
server.use(express.static("dist"));

morgan.token("json_req", function (req, res) {
  return JSON.stringify(req.body);
});
server.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :json_req",
  ),
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const getMaxId = () =>
  (
    Math.max(...persons.map((p) => Number.parseInt(p.id))) +
    (Math.round(Math.random() * 10) + 1)
  ).toString();

const nameExists = (name) => persons.find((p) => p.name === name);

server.get("/api/persons", (request, response) => {
  response.json(persons);
});

server.get("/api/persons/info", (request, response) => {
  const requestTime = Date();
  const personsCount = persons.length;

  const htmlTemplate =
    `<p>Phonebook has info for ${personsCount} people</p>` +
    `<p>${requestTime.toString()}</p>`;
  response.end(htmlTemplate);
});

server.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).json({ error: "invalid person id" });
  }
});

server.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);
  if (person) {
    persons = persons.filter((p) => p.id !== id);
    response.status(204).end();
  } else {
    response.status(404).json({ error: "invalid person id" });
  }
});

server.post("/api/persons", (requests, response) => {
  const body = requests.body;
  if (!body.name || !body.number) {
    return response.status(400).json({ error: "invalid person entry" });
  } else if (nameExists(body.name)) {
    return response
      .status(409)
      .json({ error: `Person ${body.name} already exists` });
  } else {
    const newPerson = { ...body, id: getMaxId() };
    persons = persons.concat(newPerson);
    response.status(201).json(newPerson);
  }
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

import config from 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import Entry from './models/entry.js'

const PORT = process.env.PORT || 3001

const server = express()
server.use(express.json())
server.use(express.static('dist'))

morgan.token('json_req', function (req, res) {
  return JSON.stringify(req.body)
})

server.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :json_req',
  ),
)

server.get('/api/persons', (request, response) => {
  Entry.find({}).then((persons) => {
    response.json(persons)
  })
})

server.get('/api/persons/info', (request, response) => {
  const requestTime = Date()

  Entry.countDocuments({}).then((personsCount) => {
    const htmlTemplate =
      `<p>Phonebook has info for ${personsCount.toString()} people</p>` +
      `<p>${requestTime.toString()}</p>`
    response.end(htmlTemplate)
  })
})

server.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Entry.findById(id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).json({ error: 'invalid person id' })
      }
    })
    .catch((error) => next(error))
})

server.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Entry.findByIdAndDelete(id)
    .then((person) => {
      if (person) {
        response.status(204).end()
      } else {
        response.status(404).json({ error: 'invalid person id' })
      }
    })
    .catch((error) => next(error))
})

server.post('/api/persons', (requests, response, next) => {
  const body = requests.body
  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'invalid person entry' })
  } else {
    Entry.findOne({ name: body.name }).then((result) => {
      if (result) {
        response
          .status(409)
          .json({ error: `Person ${body.name} already exists` })
      } else {
        // ik this could use new Entry(body); but eh
        const newEntry = new Entry({ name: body.name, number: body.number })

        newEntry
          .save()
          .then((newPerson) => {
            response.status(201).json(newPerson)
          })
          .catch((error) => next(error))
      }
    })
  }
})

server.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  const id = request.params.id
  Entry.findById(id)
    .then((person) => {
      if (person) {
        person.name = name
        person.number = number

        return person
          .save()
          .then((updatedPerson) => {
            response.json(updatedPerson)
          })
          .catch((error) => next(error))
      } else {
        return response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'Invalid request id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

server.use(errorHandler)

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

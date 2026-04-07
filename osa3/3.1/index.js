const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const morgan = require('morgan')

app.use(express.json())

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  { name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2
  },
  { name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3
  },
  { name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4
  }
]

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
  return maxId + 1
}

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  console.log(body)
  const exists = persons.find(p => p.name === body.name)
  if (exists) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }
  persons = persons.concat(person)
  res.status(201).json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)

  const exists = persons.some(p => p.id === id)

  if (!exists) {
    return res.status(404).end()
  }

  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})


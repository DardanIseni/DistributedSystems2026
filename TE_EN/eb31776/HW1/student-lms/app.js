const express = require('express')
const { ValidationError } = require('sequelize')
const db = require('./config/database')
const Student = require('./models/Student')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

const pickFields = (body = {}) =>
    Object.fromEntries(Student.editable.filter(key => key in body).map(key => [key, body[key]]))

app.param('id', async (req, res, next, id) => {
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: `"${id}" is not a valid student id` })
    }
    try {
        req.student = await Student.findByPk(id)
        if (!req.student) {
            return res.status(404).json({ error: `No student found with id ${id}` })
        }
        next()
    } catch (err) {
        next(err)
    }
})

app.get('/students', async (req, res) => {
    const list = await Student.findAll({ order: [['id', 'ASC']] })
    res.json({ count: list.length, students: list })
})

app.get('/students/:id', (req, res) => {
    res.json(req.student)
})

app.post('/student', async (req, res) => {
    const created = await Student.create(pickFields(req.body))
    res.status(201).json(created)
})

app.put('/students/:id', async (req, res) => {
    const changes = pickFields(req.body)
    if (!Object.keys(changes).length) {
        return res.status(400).json({ error: `Send at least one of: ${Student.editable.join(', ')}` })
    }
    await req.student.update(changes)
    res.json(req.student)
})

app.delete('/students/:id', async (req, res) => {
    const { id, name } = req.student
    await req.student.destroy()
    res.json({ message: `Student ${name} (id ${id}) was deleted` })
})

app.use((req, res) => {
    res.status(404).json({ error: `${req.method} ${req.originalUrl} does not exist` })
})

app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
        return res.status(400).json({ error: err.errors.map(e => e.message) })
    }
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Request body is not valid JSON' })
    }
    console.error(err)
    res.status(500).json({ error: 'Something went wrong on the server' })
})

db.sync()
    .then(() => app.listen(PORT, () => console.log(`Student LMS listening on http://localhost:${PORT}`)))
    .catch(err => {
        console.error('Could not start the server:', err.message)
        process.exit(1)
    })

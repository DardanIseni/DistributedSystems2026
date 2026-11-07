const express = require('express');
const sequelize = require('./config/database');
const Student = require('./models/Student');

const app = express();
app.use(express.json());

app.get('/students', async (_req, res, next) => {
  try {
    res.json(await Student.findAll());
  } catch (error) {
    next(error);
  }
});

app.get('/students/:id', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    return res.json(student);
  } catch (error) {
    return next(error);
  }
});

app.post('/student', async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
});

app.put('/students/:id', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await student.update(req.body);
    return res.json(student);
  } catch (error) {
    return next(error);
  }
});

app.delete('/students/:id', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await student.destroy();
    return res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    return next(error);
  }
});

app.use((error, _req, res, _next) => {
  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({ error: 'Internal server error' });
});

async function start() {
  await sequelize.sync();
  app.listen(3000, () => console.log('Running on port 3000'));
}

if (require.main === module) {
  start().catch((error) => {
    console.error('Unable to start the application:', error);
    process.exit(1);
  });
}

module.exports = { app, start };

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Mock user database
const users = [];

// Secret key for JWT
const SECRET_KEY = '9ea980d94b63e3931fc5badbb42e71ff66243297263dae8bc6dc4c4598c14733';

// Sign up endpoint
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (users.some(user => user.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'User registered successfully' });
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Start the server
app.listen(5000, () => {
  console.log('Auth server is running on port 5000');
});

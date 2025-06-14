const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// DB Connection
require('./config/db');

// Routes
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get("/", (req, res) => {
  res.send("SaaS Backend Working ✅");
});


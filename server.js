
const express = require ('express')
const app = express ()

// Database connection using credentials from .env file
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  
  // Check database connection
  db.getConnection((err) => {
    if (err) {
      console.error('Error connecting to database:', err.message);
    } else {
      console.log('Connected to the database.');
    }
  });
  
  // Question 1: Retrieve all patients
  app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error retrieving patients' });
      } else {
        res.status(200).json(results);
      }
    });
  });
  
  // Question 2: Retrieve all providers
  app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error retrieving providers' });
      } else {
        res.status(200).json(results);
      }
    });
  });
  
  // Question 3: Filter patients by First Name
  app.get('/patients/:firstName', (req, res) => {
    const { firstName } = req.params;
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
    db.query(query, [firstName], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error retrieving patients by first name' });
      } else {
        res.status(200).json(results);
      }
    });
  });
  
  // Question 4: Retrieve all providers by their specialty
  app.get('/providers/specialty/:specialty', (req, res) => {
    const { specialty } = req.params;
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
    db.query(query, [specialty], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error retrieving providers by specialty' });
      } else {
        res.status(200).json(results);
      }
    });
  });


 // listen to the server
 const PORT = 3000
 app.listen(PORT, () => {
   console.log(`server is runnig on http://localhost:${PORT}`)
 })
 
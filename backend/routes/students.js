const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all students (with optional search)
router.get('/', async (req, res) => {
  try {
    const { search, department, year } = req.query;
    let query = 'SELECT * FROM students';
    const params = [];
    const conditions = [];

    if (search) {
      params.push(`%${search}%`);
      conditions.push(`(name ILIKE $${params.length} OR email ILIKE $${params.length})`);
    }
    if (department) {
      params.push(department);
      conditions.push(`department = $${params.length}`);
    }
    if (year) {
      params.push(parseInt(year));
      conditions.push(`year = $${params.length}`);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET single student
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST create student
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, department, year } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    const result = await pool.query(
      'INSERT INTO students (name, email, phone, department, year) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, phone, department, year]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update student
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, department, year } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    const result = await pool.query(
      'UPDATE students SET name=$1, email=$2, phone=$3, department=$4, year=$5 WHERE id=$6 RETURNING *',
      [name, email, phone, department, year, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE student
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET stats
router.get('/stats/summary', async (req, res) => {
  try {
    const total = await pool.query('SELECT COUNT(*) FROM students');
    const byDept = await pool.query(
      'SELECT department, COUNT(*) as count FROM students GROUP BY department ORDER BY count DESC'
    );
    const byYear = await pool.query(
      'SELECT year, COUNT(*) as count FROM students GROUP BY year ORDER BY year'
    );
    res.json({
      total: parseInt(total.rows[0].count),
      byDepartment: byDept.rows,
      byYear: byYear.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;


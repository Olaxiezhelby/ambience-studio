const router = require('express').Router();
const pool   = require('../db');

// NEVER expose salary, email, phone, password in these routes
const PUB = 'id, first_name, last_name, role, bio, specialties, cover_url, avatar_url, join_date';

// GET /api/public/employees?q=&role=&sort=
router.get('/employees', async (req, res) => {
  try {
    const { q, role, sort } = req.query;
    let sql = `SELECT ${PUB} FROM employees WHERE visible_public=1 AND status='active'`;
    const p = [];
    if (role) { sql += ' AND role=?'; p.push(role); }
    if (q) {
      sql += ' AND (first_name LIKE ? OR last_name LIKE ?)';
      p.push('%' + q + '%', '%' + q + '%');
    }
    sql += sort === 'experienced' ? ' ORDER BY join_date ASC' : ' ORDER BY first_name ASC';
    const [rows] = await pool.execute(sql, p);
    res.json(rows.map(r => ({ ...r, specialties: JSON.parse(r.specialties || '[]') })));
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/public/employees/:id
router.get('/employees/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT ${PUB} FROM employees WHERE id=? AND visible_public=1 AND status='active'`,
      [req.params.id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Not found' });
    const emp = { ...rows[0], specialties: JSON.parse(rows[0].specialties || '[]') };
    const [portfolio] = await pool.execute(
      "SELECT id, title, media_url, description FROM portfolio_items WHERE employee_id=? AND visibility='public'",
      [req.params.id]
    );
    res.json({ ...emp, portfolio });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

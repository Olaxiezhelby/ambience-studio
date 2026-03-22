const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const pool   = require('../db');
const crypto = require('crypto');
router.use(authenticate);
router.get('/me', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT id,first_name,last_name,email,phone,role,bio,specialties,cover_url,avatar_url,join_date FROM employees WHERE id=?',[req.user.id]);
    if (!rows[0]) return res.status(404).json({ error: 'Not found' });
    res.json({ ...rows[0], specialties: JSON.parse(rows[0].specialties || '[]') });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});
router.patch('/me', async (req, res) => {
  const { bio, phone, specialties, avatar_url, cover_url } = req.body;
  await pool.execute('UPDATE employees SET bio=?,phone=?,specialties=?,avatar_url=?,cover_url=? WHERE id=?',
    [bio,phone,JSON.stringify(specialties||[]),avatar_url,cover_url,req.user.id]);
  res.json({ success: true });
});
router.get('/me/salary', async (req, res) => {
  const [salaries] = await pool.execute('SELECT * FROM salaries WHERE employee_id=? ORDER BY effective_from DESC',[req.user.id]);
  const [payslips] = await pool.execute('SELECT * FROM payslips WHERE employee_id=? ORDER BY period_from DESC',[req.user.id]);
  res.json({ salaries, payslips });
});
router.get('/me/portfolio', async (req, res) => {
  const [rows] = await pool.execute('SELECT * FROM portfolio_items WHERE employee_id=?',[req.user.id]);
  res.json(rows);
});
router.post('/me/portfolio', async (req, res) => {
  const { title, description, media_url, visibility } = req.body;
  const id = crypto.randomUUID();
  await pool.execute('INSERT INTO portfolio_items (id,employee_id,title,description,media_url,visibility) VALUES (?,?,?,?,?,?)',
    [id,req.user.id,title,description,media_url,visibility||'public']);
  res.status(201).json({ id, title, description, media_url, visibility });
});
router.delete('/me/portfolio/:itemId', async (req, res) => {
  await pool.execute('DELETE FROM portfolio_items WHERE id=? AND employee_id=?',[req.params.itemId,req.user.id]);
  res.json({ success: true });
});
router.get('/me/assignments', async (req, res) => {
  const [rows] = await pool.execute('SELECT * FROM tasks WHERE assignee_id=? ORDER BY start_at ASC',[req.user.id]);
  res.json(rows);
});
module.exports = router;

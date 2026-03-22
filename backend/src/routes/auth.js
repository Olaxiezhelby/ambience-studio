const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const pool   = require('../db');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.execute(
      'SELECT * FROM employees WHERE email = ?', [email]
    );
    const emp = rows[0];
    if (!emp || !(await bcrypt.compare(password, emp.password_hash)))
      return res.status(401).json({ error: 'Invalid credentials' });
    if (emp.status === 'inactive')
      return res.status(403).json({ error: 'Account deactivated' });

    await pool.execute(
      'UPDATE employees SET last_login_at = NOW() WHERE id = ?', [emp.id]
    );

    const token = jwt.sign(
      { id: emp.id, role: emp.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    res.json({
      token,
      role: emp.role,
      id: emp.id,
      firstName: emp.first_name,
      avatarUrl: emp.avatar_url
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

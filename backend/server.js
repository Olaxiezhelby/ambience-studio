require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

// ── Middleware ───────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate-limit public listing endpoints (anti-scraping)
app.use('/api/public', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests' }
}));

// ── Routes ───────────────────────────────────────────────────
app.use('/api/auth',   require('./src/routes/auth'));
app.use('/api/public', require('./src/routes/public'));
app.use('/api/staff',  require('./src/routes/staff'));
app.use('/api/admin',  require('./src/routes/admin'));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', studio: 'Ambience' }));

// 404 fallback
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// ── Start ────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n  ◈  Ambience Backend running at http://localhost:${PORT}`);
  console.log(`     Environment: ${process.env.NODE_ENV || 'development'}\n`);
});

const router = require('express').Router();
const { authenticate, requireRole } = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const pool   = require('../db');
const crypto = require('crypto');
router.use(authenticate, requireRole('admin'));
router.get('/employees', async (req, res) => {
  const { role, status, visibility } = req.query;
  let sql = 'SELECT id,first_name,last_name,email,phone,role,bio,specialties,cover_url,avatar_url,visible_public,status,join_date,last_login_at FROM employees WHERE 1=1';
  const p = [];
  if (role) { sql+=' AND role=?'; p.push(role); }
  if (status) { sql+=' AND status=?'; p.push(status); }
  if (visibility!==undefined) { sql+=' AND visible_public=?'; p.push(visibility=='true'?1:0); }
  const [rows] = await pool.execute(sql, p);
  res.json(rows.map(r=>({ ...r, specialties: JSON.parse(r.specialties||'[]') })));
});
router.post('/employees', async (req, res) => {
  try {
    const { first_name,last_name,email,phone,role,bio,specialties,join_date,visible_public } = req.body;
    const id = crypto.randomUUID();
    const tempPwd = await bcrypt.hash('TempPass123!', 10);
    await pool.execute('INSERT INTO employees (id,first_name,last_name,email,phone,password_hash,role,bio,specialties,join_date,visible_public) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
      [id,first_name,last_name,email,phone,tempPwd,role,bio,JSON.stringify(specialties||[]),join_date,visible_public?1:0]);
    res.status(201).json({ id,first_name,last_name,email,role });
  } catch(e) {
    if(e.code==='ER_DUP_ENTRY') return res.status(409).json({ error:'Email exists' });
    res.status(500).json({ error:'Server error' });
  }
});
router.patch('/employees/:id', async (req, res) => {
  const allowed=['first_name','last_name','email','phone','role','bio','specialties','cover_url','avatar_url','visible_public','status','join_date'];
  const updates=[],p=[];
  for(const key of allowed) if(req.body[key]!==undefined){ updates.push(key+'=?'); p.push(key==='specialties'?JSON.stringify(req.body[key]):req.body[key]); }
  if(!updates.length) return res.status(400).json({ error:'Nothing to update' });
  p.push(req.params.id);
  await pool.execute('UPDATE employees SET '+updates.join(',')+' WHERE id=?', p);
  res.json({ success:true });
});
router.delete('/employees/:id', async (req, res) => {
  await pool.execute("UPDATE employees SET status='inactive',visible_public=0 WHERE id=?",[req.params.id]);
  res.json({ success:true });
});
router.get('/employees/:id/salary', async (req, res) => {
  const [salaries]=await pool.execute('SELECT * FROM salaries WHERE employee_id=? ORDER BY effective_from DESC',[req.params.id]);
  const [payslips]=await pool.execute('SELECT * FROM payslips WHERE employee_id=? ORDER BY period_from DESC',[req.params.id]);
  res.json({ salaries, payslips });
});
router.post('/employees/:id/salary', async (req, res) => {
  const { base_amount,allowances,deductions,cycle,effective_from }=req.body;
  const id=crypto.randomUUID();
  await pool.execute('INSERT INTO salaries (id,employee_id,base_amount,allowances,deductions,cycle,effective_from,created_by) VALUES (?,?,?,?,?,?,?,?)',
    [id,req.params.id,base_amount,allowances||0,deductions||0,cycle||'monthly',effective_from,req.user.id]);
  res.status(201).json({ id });
});
router.post('/tasks', async (req, res) => {
  const { assignee_id,title,target_type,target_id,start_at,end_at,priority,note }=req.body;
  const id=crypto.randomUUID();
  await pool.execute('INSERT INTO tasks (id,assignee_id,title,target_type,target_id,start_at,end_at,priority,note,created_by) VALUES (?,?,?,?,?,?,?,?,?,?)',
    [id,assignee_id,title,target_type,target_id||null,start_at,end_at||null,priority||'normal',note||null,req.user.id]);
  res.status(201).json({ id });
});
router.get('/tasks', async (req, res) => {
  const { assigneeId }=req.query;
  let sql="SELECT t.*,CONCAT(e.first_name,' ',e.last_name) AS assignee_name FROM tasks t JOIN employees e ON t.assignee_id=e.id WHERE 1=1";
  const p=[];
  if(assigneeId){ sql+=' AND t.assignee_id=?'; p.push(assigneeId); }
  const [rows]=await pool.execute(sql+' ORDER BY t.start_at ASC',p);
  res.json(rows);
});
module.exports = router;

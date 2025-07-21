const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // /index.html будет доступен по /

// Читать расписание
app.get('/api/schedule', (req, res) => {
  const file = path.join(__dirname, 'public', 'schedule.txt');
  res.send(fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '');
});

// Записать расписание
app.post('/api/schedule', (req, res) => {
  const { password, data } = req.body;
  if (password !== 'pass123') return res.status(401).send('Неверный пароль');
  fs.writeFileSync(path.join(__dirname, 'public', 'schedule.txt'), data, 'utf8');
  res.send('ok');
});

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));

// Server requirements
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Routes
app.get('/', (req, res) => res.render('index'))
app.post('/', (req, res) => {
  console.log('Title:', req.body.title);
  console.log('Body:', req.body.body);
  res.render('index');
})
app.get('/new', (req, res) => res.render('new'))

// Start server
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

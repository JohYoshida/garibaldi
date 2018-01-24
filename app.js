// Server requirements
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Temporary article database
const articles = [
  {title: 'Article Example', text: 'This is what an article looks like'}
];

// Middleware
app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => res.render('index', {articles}));
app.post('/', (req, res) => {
  articles.push({
    title: req.body.title,
    text: req.body.text
  });
  res.redirect('/');
});
app.get('/new', (req, res) => res.render('new'));

// Start server
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

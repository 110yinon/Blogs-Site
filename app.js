const express = require('express');
const morgan = require('morgan');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000, () => console.log('listening on port 3000'));

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// db object
const blogs = [
    { id: 1, title: 'bb the king', snippet: 'bb is the king', body: 'lorem loremlorem lorem lorem loremlorem loremlorem loremlorem loremlorem lorem' },
    { id: 2, title: 'sara', snippet: 'sara the queen of balfur', body: 'lorem loremlorem lorem lorem loremlorem loremlorem loremlorem loremlorem lorem' },
    { id: 3, title: 'kuni isra flag', snippet: 'some kuni with israel flag', body: 'lorem lorem lorem loremlorem loremlorem loremlorem loremlorem loremlorem lorem' },
    { id: 4, title: 'kuni lamel', snippet: 'a kuni man with a briefcase', body: 'lorem lorem lorem loremlorem loremlorem loremlorem loremlorem lorem' }
];

app.get('/', (req, res) => {
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blog', (req, res) => {
    res.render('create', { title: 'Create' });
});

app.get('/blogs/:id', (req, res) => {
    console.log(req.params.id);
    const blog = blogs.filter(blog => blog.id == req.params.id);
    res.render('blog', { title: 'Blog', blog:blog[0] });
});

app.use((req, res) => {
    res.status(404).render('404', { title: 'Page not found' });
});
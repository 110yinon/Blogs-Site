const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for requests & db connection
mongoose.connect('mongodb://localhost:27017/myDB')
    .then(result => app.listen(3000, () => console.log('listening on port 3000')))
    .catch(err => console.log(err))

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    Blog.find()
        .then(result => {
            console.log(result);
            res.render('index', { title: 'Home', blogs: result });
        })
        .catch(err => console.log(err))
});

app.get('/blogs', (req, res) => {
    res.redirect('/');
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => {
            console.log('blog added:\n', result);
            res.redirect('/');
        })
        .catch(err => console.log(err))
});

app.delete('/blogs/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id)
        .then(result => {
            console.log(result);
            res.json({ redirect: '/' });
        })
        .catch(err => console.log(err))
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blog', (req, res) => {
    res.render('create', { title: 'Create' });
});

app.get('/blogs/:id', (req, res, next) => {
    Blog.findById(req.params.id)
        .then(result => {
            console.log(result);
            res.render('blog', { title: 'Blog', blog: result });
        })
        .catch(err => {
            console.log(err);
            next();
        })

});

app.use((req, res) => {
    res.status(404).render('404', { title: 'Page not found' });
});
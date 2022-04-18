const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const errorsController = require('./controllers/errorsController');
const { writeCrash } = require('./writeCrash');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for requests & db connection
mongoose.connect('mongodb://localhost:27017/myDB')
    .then(result => app.listen(3000, () => console.log('listening on port 3000')))
    .catch(err => {
        console.log('\n\n\n--------- failed to connect to DB---------');
        console.log(err.stack)
        console.log('-------------------------------------');
        writeCrash(err.stack); 
    });

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));


// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blog', (req, res) => {
    res.render('create', { title: 'Create' });
});

// blogs routes
app.use('/blogs', blogRoutes);

// 404 page
app.use(errorsController.page_not_found);
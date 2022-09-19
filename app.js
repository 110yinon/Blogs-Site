require('dotenv').config();
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

const port = 3000 | process.env.PORT;

// listen for requests & db connection
mongoose.connect(process.env.MONGO_URI)
    // .then(result => app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`)))
    .then(result => app.listen(port, () => console.log(`listening on port ${port}`)))
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
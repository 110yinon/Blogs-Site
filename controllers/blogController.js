const Blog = require('../models/blog');
const errorsController = require('./errorsController');
const { writeCrash } = require('../writeCrash');


const blog_index = (req, res) => {
    Blog.find()
        .then(result => {
            console.log(result);
            res.render('index', { title: 'Home', blogs: result });
        })
        .catch(err => console.log(err))
}

const create_blog = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => {
            console.log('blog added:\n', result);
            res.redirect('/');
        })
        .catch(err => console.log(err))
}

const delete_blog = (req, res) => {
    Blog.findByIdAndRemove(req.params.id)
        .then(result => {
            console.log(result);
            res.json({ redirect: '/' });
        })
        .catch(err => console.log(err))
}

const blog_details = (req, res, next) => {
    Blog.findById(req.params.id)
        .then(result => {
            console.log(`\n-------------resolved------------\n${result}\n`);
            console.log('-------------------------------------');
            res.render('blog', { title: 'Blog', blog: result });
        })
        .catch(err => {
            console.log('\n\n\nblog_details Error - findById failed:');
            console.log(err);
            console.log('-------------------------------------');
            const errStr = `stack:\n${err.stack}\nmessageFormat: ${err.messageFormat},\nstringValue: ${err.stringValue},\nkind: ${err.kind},\nvalue: ${err.value},\npath: ${err.path},\nreason: ${err.reason.stack},\nvalueType: ${err.valueType}\n\n\n\n\n`;
            writeCrash(errStr);

            errorsController.page_not_found(req, res);
        })

}

module.exports = {
    blog_index,
    create_blog,
    delete_blog,
    blog_details
};
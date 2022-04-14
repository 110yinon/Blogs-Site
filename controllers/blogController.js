const Blog = require('../models/blog');

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
            console.log(result);
            res.render('blog', { title: 'Blog', blog: result });
        })
        .catch(err => {
            console.log(err);
            next();
        })

}

module.exports = {
    blog_index,
    create_blog,
    delete_blog,
    blog_details
};
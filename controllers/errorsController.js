const page_not_found = (req, res) => {
    res.status(404).render('404', { title: 'Page not found' });
}

module.exports = { page_not_found }
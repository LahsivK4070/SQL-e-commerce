exports.error404 = (req, res, next) => {
    res.status(404).render('error', { docTitle: 'Page not Found', path: '/error' });
};
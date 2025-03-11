app.use((req, res, next) => {
    if (req.path.includes('/css') || req.path.includes('/js') || req.path.includes('/json')) {
        return res.status(403).send('Erişim engellendi.');
    }
    next();
});

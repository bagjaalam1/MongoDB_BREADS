//mendefinisikan api endpoint yg mengarahkan method find.all dari post controller

module.exports = (app) => {
    const posts = require('../controllers/post.controller')

    const router = require('express').Router();

    router.get('/', posts.findAll)
    router.post('/', posts.create)

    app.use('/api/posts', router)
    return router;
}
//mendefinisikan api endpoint yg mengarahkan method find.all dari post controller

module.exports = (app) => {
    const breads = require('../controllers/bread.controller')

    const router = require('express').Router();

    router.get('/', breads.findAll)
    router.post('/add', breads.create)
    router.get('/edit/:id', breads.findOne)
    router.put('/edit/:id', breads.update)
    router.delete('/:id', breads.delete)

    app.use('/api', router)
    return router;
}
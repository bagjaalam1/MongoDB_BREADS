const db = require('../models')
const Bread = db.breads //memanggil collection breads

exports.findAll = (req, res) => {
    Bread.find()
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "error ketika mengambil data"
            })
        })
}

exports.create = (req, res) => {
    //membuat objek data bread
    const bread = new Bread({
        stringdata: req.body.stringdata,
        integerdata: req.body.integerdata,
        floatdata: req.body.floatdata,
        datedata: req.body.datedata,
        boolean: req.body.booleandata ? req.body.booleandata : false
    })

    //melakukan query untuk membuat dokumen ke dalam bread
    bread.save(bread)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.status(409).send({
                message: err.message || "error ketika membuat data"
            })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id

    Bread.findById(id)
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.status(409).send({
                message: err.message || "error ketika mencari data"
            })
        })
}

exports.update = (req, res) => {
    const id = req.params.id

    Bread.findByIdAndUpdate(id, req.body)
        .then(result => {
            if (!result) {
                res.status(404).send({
                    message: "bread not found"
                })
            }

            res.send({
                message: "bread was updated"
            })
        })
        .catch(err => {
            res.status(409).send({
                message: err.message || "error ketika edit data"
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id

    Bread.findByIdAndRemove(id)
        .then(result => {
            if (!result) {
                res.status(404).send({
                    message: "bread not found"
                })
            }

            res.send({
                message: "bread was deleted"
            })
        })
        .catch(err => {
            res.status(409).send({
                message: err.message || "error ketika delete data"
            })
        })
}
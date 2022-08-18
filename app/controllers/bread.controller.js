const db = require('../models')
const Bread = db.breads //memanggil collection breads

exports.findAll = (req, res) => {
    Bread.find()
        .then((data) => {
            res.status(200).json({data})
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
        boolean: req.body.boolean ? req.body.boolean : false
    })

    //melakukan query untuk membuat dokumen ke dalam bread
    bread.save(bread)
        .then((data) => {
            res.send(data)
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
        .then(data => {
            res.send(data)
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
        .then(data => {
            if (!data) {
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
        .then(data => {
            if (!data) {
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
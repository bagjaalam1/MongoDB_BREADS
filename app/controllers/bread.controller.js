const db = require('../models')
const Bread = db.breads //memanggil collection breads

exports.findAll = async (req, res) => {

    try {

        let query = {}
        const stringCheck = req.query.stringcheck == 'false' ? false : true
        const integerCheck = req.query.integercheck == 'false' ? false : true
        const floatCheck = req.query.floatcheck == 'false' ? false : true
        const dateCheck = req.query.datecheck == 'false' ? false : true
        const booleanCheck = req.query.booleancheck == 'false' ? false : true

        //pencarian
        if (req.query.stringdata && stringCheck) {
            query.stringdata = new RegExp(`${req.query.stringdata}`, 'i')
        }

        if (req.query.integerdata && integerCheck) {
            query.integerdata = Number(req.query.integerdata)
        }

        if (req.query.floatdata && floatCheck) {
            query.floatdata = Number(req.query.floatdata)
        }

        if (req.query.boolean && booleanCheck) {
            query.boolean = req.query.boolean == 'true' ? true : false;
        }

        if (req.query.startDate && req.query.endDate && dateCheck) {
            query.datedata = {
                $gte: req.query.startDate,
                $lte: req.query.endDate,
            };
        } else if (req.query.startDate && dateCheck) {
            query.datedata = {
                $gte: req.query.startDate,
            };
        } else if (req.query.endDate && dateCheck) {
            query.datedata = {
                $lte: req.query.endDate,
            };
        }

        let page = req.query.page || 1;
        const limit = 3;
        const offset = page > 0 ? (page - 1) * limit : 0;

        const totalResult = await Bread.count(query)
        const pages = Math.ceil(totalResult / limit)
        console.log(offset)
        const data = await Bread
            .find(query)
            .skip(offset)
            .limit(limit)
            .sort({"datedata":-1})

        res.json(
            {
                data,
                page: Number(page),
                pages
            }
        )
    } catch (err) {
        console.log(err.stack);
    }
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
    console.log(id)
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
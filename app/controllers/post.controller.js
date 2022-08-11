const db = require('../models')
const Post = db.posts //memanggil collection posts

exports.findAll = (req, res) => {
    Post.find()
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "error ketika mengambil data"
        })
    })
}

exports.create = (req, res) => {
    //membuat objek data post
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        published: req.body.published ? req.body.published : false
    })

    //melakukan query untuk membuat dokumen ke dalam post
    post.save(post)
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.status(409).send({
            message: err.message || "error ketika membuat data"
        })
    })
}
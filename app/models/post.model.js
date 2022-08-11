module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            title: String,
            body: String,
            published: Boolean
        },
        //mencatat kapan data akan dibuat
        { timestamps: true }
    )

    schema.method("toJson", function(){
        const {__v, _id, ...Object} = this.toObject()
        object.id = _id
        return object
    })

    const Post = mongoose.model("posts", schema)
    return Post
}
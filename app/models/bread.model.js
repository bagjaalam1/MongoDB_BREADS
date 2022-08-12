module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            stringdata: String,
            integerdata: Number,
            floatdata: Number,
            datedata: String,
            boolean: Boolean
        },
        //mencatat kapan data akan dibuat
        { timestamps: true }
    )

    schema.method("toJson", function(){
        const {__v, _id, ...Object} = this.toObject()
        object.id = _id
        return object
    })

    const Post = mongoose.model("breads", schema)
    return Post
}
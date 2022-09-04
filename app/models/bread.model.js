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

    const Post = mongoose.model("breads", schema)
    return Post
}
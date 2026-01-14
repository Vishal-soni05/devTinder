const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://itsvishalsoni:qmMlenzK63aTu13g@vishalnode.jk6vmdz.mongodb.net/devTinder"
    )
};

module.exports = connectDB;


const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email format");
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: [18, 'Must be at least 18 got {VALUE}'],
    },
    gender: {
        type: String,
    },
    skills: {
        type: [String],
        default: true

    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("User", userSchema);
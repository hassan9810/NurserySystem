const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: [true, "id is required"]
    },
    fullname: {
        type: String,
        maxLength: 10,
        minLength: 5,
        required: [true, "Full name is required"]
    },
    tpassword: {
        type: String,
        required: [true, "Password is required"]
    },
    temail: {
        type: String,
        required: [true, "E-mail is required"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/]
    },
    timage: {
        type: String,
        maxLength: 20,
        required: [true, "Image is required"],
    }
})
mongoose.model("teachers", schema);

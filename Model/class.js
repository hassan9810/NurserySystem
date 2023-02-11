const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({
    _id: Number,
    className: {
        type: String,
        required: [true, "Class name is required"],
        maxLength: 10,
        minLength: 5
    },
    classSupervisor: {
        type: mongoose.Types.ObjectId,
        ref: "teachers"
    },
    classChildren: [{
        type: Number,
        ref: "child"
    }]
})
schema.plugin(AutoIncrement, { id: 'class_id_counter', inc_field: '_id' });
mongoose.model("class", schema);
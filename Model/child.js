const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const addressSchema = new mongoose.Schema({
    city: { type: String, required: true, maxLength: 20, minLength: 5 },
    street: { type: String, required: true, maxLength: 20, minLength: 5 },
    building: { type: Number, required: true, maxLength: 20, minLength: 5 },
},
    {
        _id: false
    }
);

const schema = new mongoose.Schema({
    _id: Number,
    childage: {
        type: Number
    },
    childfullname: {
        type: String,
        required: [true, "Child Name is required"],
        maxLength: 10,
        minLength: 5
    },
    childlevel: {
        type: String,
        enum: ["PreKG", "KG1", "KG2"],
    },
    childaddress: addressSchema
});
schema.plugin(AutoIncrement, { id: 'child_id_counter', inc_field: '_id' });
mongoose.model("child", schema);
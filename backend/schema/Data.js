const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        id: Number,
        item: String,
        type: String,
        button: String
    }
);

module.exports= mongoose.model("Data", DataSchema);

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    time: {
        type: Date,
        required: true
    }
},
{
    timestamps: true
})

export default mongoose.model('Todo', todoSchema);

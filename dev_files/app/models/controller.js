import mongoose from 'mongoose'

var ControllerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, unique: true},
    controller_type: {type: String, enum: ['mobile', 'hardware', 'web']},
    status: Boolean,
    ip: String,
    updated: { type: Date, default: Date.now() },
});

export default mongoose.model('Controller', ControllerSchema)

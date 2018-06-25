import mongoose from 'mongoose'

var ControllerSchema = mongoose.Schema({
    name: {type: String, unique: true},
    controller_type: {type: String, enum: ['mobile', 'hardware', 'web']},
    status: Boolean,
    ip: String,
    updated: { type: Date, default: Date.now() },
});

export default mongoose.model('Controller', ControllerSchema)

import mongoose from 'mongoose'

var LightSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    alternate_id: String,
    name: {type: String, unique: true},
    light_type: {type: String, enum: ['hue', 'strip', 'web']},
    color_type: {type: String, enum: ['rgb', 'w']},
    dimable: Boolean,
    ip: String,
    created: { type: Date, default: Date.now() },
    updated: { type: Date, default: Date.now() },
    state: { type: mongoose.Schema.Types.ObjectId, ref: 'LightState' }
});

export default mongoose.model('Light', LightSchema)

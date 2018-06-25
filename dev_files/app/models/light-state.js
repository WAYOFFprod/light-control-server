import mongoose from 'mongoose'

var LightStateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    status: Boolean,
    bri: Number,
    hue: Number,
    sat: Number,
    ct: Number,
    colormode: String,
    reachable: Boolean,
    updated: { type: Date, default: Date.now() },
    created: { type: Date, default: Date.now() },
    light: { type: mongoose.Schema.Types.ObjectId, ref: 'Light' }
});

export default mongoose.model('LightState', LightStateSchema)

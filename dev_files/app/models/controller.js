import mongoose from 'mongoose'

var Schema = mongoose.Schema;

var ControllerSchema = new Schema({
    id: {
      type: Number,
      unique: true,
      min: 0
    },
    name: String,
    controller_type: {type: String, enum: ['software', 'hardware']},
    controller_model: {type: String, enum: ['simple', 'toggle'] },
    status: String,
    ip: String,
    updated: { type: Date, default: Date.now },
}, {
  collection: 'controllers'
});

module.export = mongoose.model('controller', ControllerSchema)

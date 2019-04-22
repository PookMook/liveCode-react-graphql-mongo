const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique:true,
    required: true
  },
  tokens: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Token'
    }
  ],
  passwords:[
    {
      type: Schema.Types.ObjectId,
      ref: 'Password'
    }
  ],
  displayName: {
    type: String,
    unique:true,
    required: true
  },
  admin: {
    type:Boolean,
    default:false
  },
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);

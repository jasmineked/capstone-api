const mongoose = require('mongoose')

const budgetSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  nowOrLater: {
    type: Boolean,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Budget', budgetSchema)

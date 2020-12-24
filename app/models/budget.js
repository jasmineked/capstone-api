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
  dueDate: {
    type: Date,
    required: false
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

const mongoose = require('mongoose')

const balanceSchema = new mongoose.Schema({
    checkingAmnt: { 
        type: Number,
        required: true
    },
    savingsAmnt: {
        type: Number,
        required: true
    },
    savingsGoal: {
        type: Number,
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

module.exports = mongooose.model('Balance', balanceSchema)
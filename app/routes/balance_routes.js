const express = require('express')
const passport = require('passport')
const Balance = require('../models/balance')

const customErrors= require('../../lib/custom_errors')
const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

router.post('/balances', requireToken, (req, res, next) => {
    req.body.balance.owner = req.user.id

    Balance.create(req.body.balance)
    .then(balance => {
        res.status(201).json({ balance: balance.toObject() })
    })
    .catch(next)
})
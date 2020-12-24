// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

const Budget = require('../models/budget')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()
 
router.post('/budgets', requireToken, (req, res, next) => {
  req.body.budget.owner = req.user.id
  Budget.create(req.body.budget)
    .then(budget => {
      res.status(201).json({ budget: budget.toObject() })
    })
    .catch(next)
})

router.get('/budgets', requireToken, (req, res, next) => {
  Budget.find({owner: req.user.id})
    .then(budgets => {
      return budgets.map(budget => budget.toObject())
    })
    .then(budgets => res.status(200).json({ budgets: budgets }))
    .catch(next)
})

router.patch('/budgets/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.budget.owner
  Budget.findById(req.params.id)
    .then(handle404)
    .then(budget => {
      requireOwnership(req, budget)
      return budget.updateOne(req.body.budget)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
module.exports = router

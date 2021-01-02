// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

const Budget = require('../models/budget')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const budget = require('../models/budget')
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

router.get('/budgets/:id', requireToken, (req, res, next) => {
  Budget.findById(req.params.id)
    .then(handle404)
    .then(budget => res.status(200).json({ budget: budget.toObject() }))
    .catch(next)
})

router.delete('/budgets/:id', requireToken, (req, res, next) => {
  Budget.findById(req.params.id)
    .then(handle404)
    .then(budget => {
      // throw an error if current user doesn't own `item`
      requireOwnership(req, budget)
      // delete the item ONLY IF the above didn't throw
      budget.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router

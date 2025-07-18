const express = require('express')
const router = express.Router()
const User = require('../models/User')
const ClaimHistory = require('../models/claimHistory')

// Claim random points
router.post('/', async (req, res) => {
  const { userId } = req.body

  const user = await User.findById(userId)
  if (!user) return res.status(404).json({ error: 'User not found' })

  const points = Math.floor(Math.random() * 10) + 1
  user.totalPoints += points
  await user.save()

  const history = new ClaimHistory({
    userId: user._id,
    claimedPoints: points
  })
  await history.save()

  res.json({
    message: 'Points claimed',
    claimedPoints: points,
    user
  })
})

module.exports = router
const asyncHandler = require("express-async-handler")
const Offer = require("../models/offerModel");
const User = require("../models/userModel")

// @desc Get all offers
// @route GET /api/offers
// @access public
const getOffers = asyncHandler(async (req, res) => {
    const offers = await Offer.find()
    res.status(200).json(offers)
})

// @desc Get offer by id
// @route GET /api/offers/:id
// @access public
const getOffer = asyncHandler(async (req, res) => {
    const offer = await (Offer.findById(req.params.id))
    res.status(200).json(offer)
})

// @desc Get offers by search query
// @route GET /api/offers/search/:searchQuery
// @access public
const getSearchOffer = asyncHandler(async (req, res) => {
    const queryParam = req.params.searchQuery
    const offers = await Offer.find({ title: { $regex: queryParam, $options: 'i' } })
    res.status(200).json(offers)
})

// @desc Set offer
// @route POST /api/offers
// @access private
const setOffer = asyncHandler(async (req, res) => {
    const { title, description, pay, contact } = req.body

    if (!title || !description) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    const offer = await Offer.create({
        user: req.user.id,
        title,
        description,
        pay,
        contact
    })

    res.status(201).json(offer)
})

// @desc Update offer
// @route PUT /api/offers/:id
// @access private
const updateOffer = asyncHandler(async (req, res) => {
    const offer = await Offer.findById(req.params.id)

    if (!offer) {
        res.status(400)
        throw new Error("Offer not found")
    }

    // check if user exists
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    // check if the IDs match
    if (offer.user.toString() === user.id) {
        const updatedOffer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedOffer)
    } else {
        res.status(401)
        throw new Error("User not authorized")
    }

})

// @desc Delete offer
// @route DELETE /api/offers/:id
// @access private
const deleteOffer = asyncHandler(async (req, res) => {
    const offer = await Offer.findById(req.params.id)

    if (!offer) {
        res.status(400)
        throw new Error("Offer not found")
    }

    // check if user exists
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    // check if the IDs match
    if (offer.user.toString() === user.id) {
        await offer.remove()
        res.status(200).json({ id: req.params.id })
    } else {
        res.status(401)
        throw new Error("User not authorized")
    }
})

//@desc Get all the offers for a user
//@route GET /api/offers/me
//@access private
const getUserOffers = asyncHandler(async (req, res) => {
    const offers = await Offer.find({ user: req.user.id })

    res.status(200).json(offers)
})

module.exports = {
    getOffers,
    getOffer,
    getSearchOffer,
    getUserOffers,
    setOffer,
    updateOffer,
    deleteOffer
}

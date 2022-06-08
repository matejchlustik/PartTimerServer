const { Router } = require("express")
const router = Router()
const {
    getOffers,
    getOffer,
    getSearchOffer,
    getUserOffers,
    setOffer,
    updateOffer,
    deleteOffer
} = require("../controllers/offerController")
const { protect } = require("../middleware/authMiddleware")

router.route("/").get(getOffers).post(protect, setOffer)
router.route("/me").get(protect, getUserOffers)
router.route("/:id").get(getOffer).put(protect, updateOffer).delete(protect, deleteOffer)
router.route("/search/:searchQuery").get(getSearchOffer)


module.exports = router
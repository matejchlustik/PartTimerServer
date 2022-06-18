const mongoose = require("mongoose")

const offerSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: [true, "Please add a title"]
    },
    description: {
        type: String,
        required: [true, "Please add description"]
    },
    pay: {
        type: String,
        required: [true, "Please add pay"]
    },
    contact: {
        type: String,
        required: [true, "Please add contact info"]
    },
    location: {
        type: String,
        required: [true, "Please add location"]
    }
},
    {
        timestamps: true
    })

const Offer = mongoose.model("Offer", offerSchema)
module.exports = Offer

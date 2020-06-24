const mongoose = require('mongoose');
const tripSchema = new mongoose.Schema({
    startPoint: {
        type: String,
        required: [true, 'Please enter a title !'],
        match: [/^(\w\s?){4,}$/, 'Name should contains not less than 4 english letter, numbers and whitespase!']
    },
    endPoint: {
        type: String,
        required: [true, 'Please enter a title !'],
        match: [/^(\w\s?){4,}$/, 'Name should contains not less than 4 english letter, numbers and whitespase!']
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        maxlength: [50, 'It is allow maximum 50 characters!']
    } || 'No description',
    imageUrl: {
        type: String,
        required: [true, 'Please add image !'],
        match: [/^(https?)\:\/\/.*/, 'Image url should begins with http or https!']
    } || 'https://www.imghack/com/id?389872',
    buddies: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    creatorId: { type: mongoose.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Trip', tripSchema);
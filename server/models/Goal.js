const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const goalSchema = new Schema({
    goalText: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    startDate: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    endDate: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
        validate: {
            validator: function (endDate) {
                return endDate > this.startDate;
            }
        }
    },
});

const Goal = model('Goal', goalSchema);

module.exports = Goal;
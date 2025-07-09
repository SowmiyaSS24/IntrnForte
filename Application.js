const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    seeker: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    dateApplied: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);

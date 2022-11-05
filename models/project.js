const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
    name: String,
    totalCost: Number,
    company: String,
    description: String,
    startDate: String,
    endDate: String,
    location: String,
    image: String
})

module.exports = mongoose.model('Project', projectSchema);

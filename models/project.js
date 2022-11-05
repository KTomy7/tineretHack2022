const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
    projectId: Number,
    name: String,
    totalCost: Number,
    company: String,
    description: String,
    startDate: Date,
    endDate: Date,
    location: String,
    image: String,
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

module.exports = mongoose.model('Project', projectSchema);

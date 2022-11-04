const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
    name: String,
    totalCost: Number,
    company: String,
    description: String,
    startDate: Date,
    endDate: Date,
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

const Project = mongoose.model('Project', projectSchema);

Project.insertMany([
    { name: 'Primul', totalCost: 69, company: 'afw', description: 'fa', startDate: '11-11-2001', endDate: '12-12-2012', Product: null }
]);

module.exports = mongoose.model('Project', projectSchema);

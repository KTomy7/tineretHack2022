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
    image: String,
    services: [{
        nume: String,
        cantitate: Number,
        unitateMasura: String,
        pretUnitarMaterial: Number,
        pretUnitarManopera: Number,
        pretUnitarTotal: Number,
        valoareTotalaMaterial: Number,
        valoareTotalaManopera: Number,
        valoareTotala: Number
    }]
})

module.exports = mongoose.model('Project', projectSchema);

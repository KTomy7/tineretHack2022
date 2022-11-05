const Location = require('./location');
const Project = require('./project');
const Product = require('./product');
const mongoose = require('mongoose');
const Admin = require('./admin');

mongoose.connect('mongodb://127.0.0.1:27017/tineretHack');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB!');
});

const seedData = async () => {
    await Location.deleteMany({});
    await Project.deleteMany({});
    await Admin.deleteMany({});

    await Location.insertMany([
        { name: 'Cluj-Napoca' },
        { name: 'Dej' },
        { name: 'Gherla' },
        { name: 'Turda' },
        { name: 'Campia ' },
        { name: 'Huedin ' },
        { name: 'Aghiresu' },
        { name: 'Aiton' },
        { name: 'Alunis' },
        { name: 'Apahida' }
    ]);

    await Project.insertMany([
        { name: "Pavaj in Turda", totalCost: 69, company: "Fratii Jder SRL", description: "100% cinstit", startDate: "10-10-2012", endDate: "12-12-2012", location: "Turda", products: null },
        { name: "Amenajare camin cultural", totalCost: 69, company: "Fratii Jder SRL", description: "100% cinstit", startDate: "10-10-2012", endDate: "12-12-2012", location: "Turda", products: null },
        { name: "Modernizare birt", totalCost: 69, company: "Fratii Jder SRL", description: "100% cinstit", startDate: "10-10-2012", endDate: "12-12-2012", location: "Huedin", products: null }
    ]);



    const admin = new Admin({ email: "admin@gmail.com", username: "admin" });
    const registeredAdmin = await Admin.register(admin, "admin");
}

seedData().then(() => {
    mongoose.connection.close();
})

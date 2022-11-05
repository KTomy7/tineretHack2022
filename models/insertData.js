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
        { projectId: 1, name: "Pavaj in Turda", totalCost: 69, company: "Fratii Jder SRL", description: "100% cinstit", startDate: "10-10-2012", endDate: "12-12-2012", location: "Turda", image: "https://images.unsplash.com/photo-1626885930974-4b69aa21bbf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGNvbnN0cnVjdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", products: null },
        { projectId: 2, name: "Amenajare camin cultural", totalCost: 69, company: "Fratii Jder SRL", description: "100% cinstit", startDate: "10-10-2012", endDate: "12-12-2012", location: "Turda", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uc3RydWN0aW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60", products: null },
        { projectId: 3, name: "Modernizare birt", totalCost: 69, company: "Fratii Jder SRL", description: "100% cinstit", startDate: "10-10-2012", endDate: "12-12-2012", location: "Aiton", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y29uc3RydWN0aW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60", products: null },
        { projectId: 4, name: "Modernizare gara", totalCost: 69, company: "Fratii Jder SRL", description: "100% cinstit", startDate: "10-10-2012", endDate: "12-12-2012", location: "Dej", image: "https://plus.unsplash.com/premium_photo-1661476116614-0b35face5f2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNvbnN0cnVjdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", products: null }
    ]);



    const admin = new Admin({ email: "admin@gmail.com", username: "admin" });
    const registeredAdmin = await Admin.register(admin, "admin");
}

seedData().then(() => {
    mongoose.connection.close();
})

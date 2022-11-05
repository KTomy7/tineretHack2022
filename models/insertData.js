const Location = require('./location');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/tineretHack');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB!');
});

const seedData = async () => {
    await Location.deleteMany({});

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
}

seedData().then(() => {
    mongoose.connection.close();
})

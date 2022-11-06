const Location = require('./location');
const Project = require('./project');
const Product = require('./product');
const dateFactura = require("../imageToText");
const mongoose = require('mongoose');
const Admin = require('./admin');
const { contextSourcesMap } = require('tailwindcss/lib/lib/sharedState');

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
        { name: 'Apahida' },
        { name: 'Belis' },
        { name: 'Huedin' },
        { name: 'Cluj Napoca' },
        { name: 'Dej' },
        { name: 'Mociu' },
        { name: 'Gilau' }
    ]);

    const servicesArray = await imageToText();
    const newServiceArray = [];


    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            newServiceArray[i] = servicesArray[i][j];
        }
    }
    console.log("buuuun", newServiceArray);

    await Project.insertMany([
        {
            name: "Pavaj in Turda", totalCost: 69, company: "Fratii Jder SRL", description: "100% cinstit", startDate: "10-10-2012", endDate: "12-12-2012", location: "Turda", image: "https://images.unsplash.com/photo-1626885930974-4b69aa21bbf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGNvbnN0cnVjdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
            services: [{
                nume: newServiceArray[0],
                cantitate: newServiceArray[1],
                unitateMasura: newServiceArray[2],
                pretUnitarMaterial: newServiceArray[3],
                pretUnitarManopera: newServiceArray[4],
                pretUnitarTotal: newServiceArray[5],
                valoareTotalaMaterial: newServiceArray[5],
                valoareTotalaManopera: newServiceArray[5],
                valoareTotala: newServiceArray[5]
            }]
        },
        { name: "Amenajare camin cultural", totalCost: 69, company: "Fratii Jder SRL", description: "100% cinstit", startDate: "10-10-2012", endDate: "12-12-2012", location: "Turda", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uc3RydWN0aW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60", products: null },
        { name: "Modernizare birt", totalCost: 69, company: "Fratii Jder SRL", description: "100% cinstit", startDate: "10-10-2012", endDate: "12-12-2012", location: "Aiton", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y29uc3RydWN0aW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60", products: null },
        { name: "Modernizare gara", totalCost: 69, company: "Fratii Jder SRL", description: "100% cinstit", startDate: "10-10-2012", endDate: "12-12-2012", location: "Dej", image: "https://plus.unsplash.com/premium_photo-1661476116614-0b35face5f2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNvbnN0cnVjdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", products: null },
        { name: "Restaurare Statuia Libertatii", totalCost: 69, company: "Fratii Jder SRL", description: "100% cinstit", startDate: "10-10-2012", endDate: "12-12-2012", location: "Beius City", image: "https://plus.unsplash.com/premium_photo-1661476116614-0b35face5f2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNvbnN0cnVjdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", products: null },
        { name: "Restaurare Statuia PLM", totalCost: 69, company: "Fratii Jder SRL", description: "100% cinstit", startDate: "10-10-2012", endDate: "12-12-2012", location: "Turda", image: "https://plus.unsplash.com/premium_photo-1661476116614-0b35face5f2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNvbnN0cnVjdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", products: null }
    ]);



    const admin = new Admin({ email: "admin@gmail.com", username: "admin" });
    const registeredAdmin = await Admin.register(admin, "admin");
}

seedData().then(() => {
    mongoose.connection.close();
})



async function imageToText() {
    const tesseract = require("node-tesseract-ocr")

    const config = {
        lang: "ron",
        oem: 1,
        psm: 3,
    }

    function containsNumbers(str) {
        return /\d/.test(str);
    }

    let nume = [];
    let k = 0;

    let splitBara = [];

    let text = await tesseract
        .recognize("image4.png", config);
    // console.log("Result:", text)
    text = text.replaceAll('[', '|')
    text = text.replaceAll(']', '|')
    text = text.replaceAll('(', '|')
    text = text.replaceAll(')', '|')
    text = text.replaceAll('_', '')
    text = text.replaceAll(192, 19.20)
    text = text.replaceAll('1.117 44', '1,117.44')
    text = text.replaceAll('-', '', '.');
    text = text.replaceAll('4344', 43.44);
    text = text.replaceAll('145', 14.5);
    text = text.replaceAll('512', 6.12);

    splitted = text.split('\n');


    numeLucrare = [];
    numeUnitate = [];
    cantitate = [];
    pretUnitMat = [];
    pretUnitMan = [];
    pretUnitTot = [];
    valTotMat = [];
    valTotMan = [];
    valTot = [];
    let vectorValori = [];

    for (let i = 0; i < splitted.length; i++) {
        splitted[i] = splitted[i].trim();
        if (containsNumbers(splitted[i]));
        {

            splitBara = splitted[i].split('|');

            for (let j = 0; j < splitBara.length; j++) {
                splitBara[j] = splitBara[j].trim();
                //console.log(splitBara[j]);
                if (splitBara[j].includes("Furnizare")) {
                    numeLucrare.push(splitBara[j]);
                    numeUnitate.push(splitBara[j + 1]);
                    cantitate.push(splitBara[j + 2]);
                    pretUnitMat.push(splitBara[j + 3]);
                    pretUnitMan.push(splitBara[j + 4]);
                    pretUnitTot.push(splitBara[j + 5]);
                    valTotMat.push(splitBara[j + 6]);
                    valTotMan.push(splitBara[j + 7]);
                    valTot.push(splitBara[j + 8]);

                }
            }

        }

    }


    // console.log(numeLucrare);
    // for (i = 0; i < 9; i++) {

    // }
    services = [];
    services.push(numeLucrare);
    services.push(numeUnitate);
    services.push(cantitate);
    services.push(pretUnitMat);
    services.push(pretUnitMan);
    services.push(pretUnitTot);
    services.push(valTotMan);
    services.push(valTotMat);
    services.push(valTot);

    console.log("services", services);
    return services;

}

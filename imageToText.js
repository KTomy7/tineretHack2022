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
let servicesArray = [];
let splitBara = [];

tesseract
    .recognize("image4.png", config)
    .then((text) => {
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


        services = [{ numeLucrare, numeUnitate, cantitate, pretUnitMan, pretUnitMan, pretUnitTot, valTotMan, valTotMat, valTot }];
        servicesArray = services;

    })
    .catch((error) => {
        console.log(error.message)
    })

module.exports = servicesArray;
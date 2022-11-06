var Tesseract = require('tesseract.js');

Tesseract.recognize(
    "pulmea.png",
    'eng',
    { logger: m => console.log(m) }
).then(({ data: { text } }) => {
    console.log(text);
})
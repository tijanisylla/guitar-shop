const fs = require('fs');
const path = require('path');
const { loremIpsum } = require('lorem-ipsum');

// Data Imports
const rawAcoustic = require('./acoustic.raw.json');
const rawClassical = require('./classical.raw.json');
const rawElectric = require('./electric.raw.json');

// NOTE - this will overwrite the output file
const OUTPUT_FILE = path.join(__dirname, './guitars.json');

// used for lorem-ipsum
const guitarWords = fs.readFileSync(path.join(__dirname, './guitar-words.txt'), { encoding: 'utf-8' }).split(/\s+/);


function mapProductToGuitar(product) {
    /*
        Example Product:

        {

            "name": "Gibson Les Paul Studio Electric Guitar",
            "productID": "site1prodL54490",
            "sku": "site1prod501158",
            "defaultSkuUrl": "/guitars/gibson-les-paul-studio-electric-guitar/l54490000003000",
            "openBoxUrl": "/guitars/open-box-gibson-les-paul-studio-electric-guitar",
            "path": "/guitars/gibson-les-paul-studio-electric-guitar",
            "thumb": "https://media.musiciansfriend.com/is/image/MMGS7/Les-Paul-Studio-Electric-Guitar-Smokehouse-Burst/L54490000003000-00-220x220.jpg",
            "itemType": "New",
            "desc": "",
            "rating": "9",
            "reviews": "13",
            "price": "$1,599.00",
            "savings": "$150.00 (9%)",
            "maxSavingsMSRP": "$1,749.00",
            "minRegularPrice": "1599.0",
            "salePrice": "1599.0",
        }
    */

    const nameParsed = product.name.match(/(\w+)(.+) ([a-zA-Z-]+ Guitar)/)
    if (!nameParsed) {
        console.warn(`excluding non parsable name "${product.name}"`);
        return null;
    }

    return {
        model_name: product.name,

        // https://www.npmjs.com/package/lorem-ipsum
        description: loremIpsum({
            count: 3,                // Number of "words", "sentences", or "paragraphs"
            format: "plain",         // "plain" or "html"
            paragraphLowerBound: 3,  // Min. number of sentences per paragraph.
            paragraphUpperBound: 7,  // Max. number of sentences per paragarph.
            sentenceLowerBound: 5,   // Min. number of words per sentence.
            sentenceUpperBound: 15,  // Max. number of words per sentence.
            units: "paragraphs",      // paragraph(s), "sentence(s)", or "word(s)"
            words: guitarWords,
        }),

        // simply grab first word in model name
        brand_name: nameParsed[1],

        price: product.salePrice,

        // convert from out of 10, to out of 5 (if 0, simply set as 3)
        rating: product.rating * 0.5 || 3,

        image_url: product.thumb,

        category: nameParsed[3],
    }

}


const guitars = (
    []
    .concat(rawAcoustic.products)
    .concat(rawElectric.products)
    .concat(rawClassical.products)
    .map(mapProductToGuitar)
    .filter(Boolean)  // remove any non-parsible
    .sort((a, b) => b.rating - a.rating)
);

console.info(`writing ${guitars.length} guitars to ${OUTPUT_FILE}`);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(guitars, null, 4));

const Promise = require('bluebird');
const extract = Promise.promisify(require('pdf-text-extract'));
const gpacal = require('./gpaCalculator');
const jsonGene = require('./JSONgenerator');

async function readPDF(filePath) {
    try {
        const txt = await extract(filePath);
        // console.log(txt.join('\n'));
        return txt.join('\n');
    } catch (err) {
        throw new Error(err);
    }
}

async function scrape_transcript(filePath) {
    const txt = await readPDF(filePath);
    const courses = await jsonGene.txt_to_JSON(txt);
    gpacal.courses_add_fpo(courses);

    let transcriptJSON = {};
    transcriptJSON.courses = courses;
    transcriptJSON.fpo_avg = gpacal.courses_avg_fpo(transcriptJSON.courses);
    console.log(transcriptJSON);
    return transcriptJSON;
}


exports.scrape_transcript = scrape_transcript;
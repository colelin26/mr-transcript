const REGEXES = {
    // term fetches groups in a course
    term: /Level:\s+([0-9][A-Z])\s+Load:\s((\w|-)+)\s+Form Of Study: ([\w]{9}|[\w|-]{5}\s[\w]{8})/,
    // term_global fetches all courses in global
    terms: /Level:\s+([0-9][A-Z])\s+Load:\s((\w|-)+)\s+Form Of Study: ([\w]{9}|[\w|-]{5}\s[\w]{8})/g,
    // course fetch groups in a course
    course_finished: /(\w+)\s+(\d+\w?)\s+(((\w|-)+\s+)+)(\d.\d\d)\s+(\d.\d\d)\s+(\d+|\w+)\n/,
    // course
    course_unfinished: /((\w+)\s+(\d+\w?)\s+((((\w|-)+ +)+)(\w|-)+))\n/,
    // finished_courses_global fetch all courses in a block
    courses_finished_global: /(((\w+)\s+(\d+\w?)\s+(((\w|-)+\s+)+)(\d.\d\d)\s+(\d.\d\d)\s+(\d+|\w+))\n)/g,
    // courses_unfinish_global fetches all courses that haven't finished in a block
    courses_unfinish_global: /(((\w+)\s+(\d+\w?)\s+((((\w|-)+ +)+)(\w|-)+))\n)/g,
    // courses_block_global fetch courses_block
    courses_block_global: /((((\w+)\s+(\d+\w?)\s+(((\w|-)+\s+)+)(\d.\d\d)\s+(\d.\d\d)\s+(\d+|\w+))\n)+)|((((\w+)\s+(\d+\w?)\s+(((\w|-)+\s+)+))\n)+)\s+Milestones/g,
};

const SELECTORS = {
    termInfoSelector: {
        level: 1,
        course_load: 2,
        form_of_study: 4,
    },
    courseFinishedInfoSelector: {
        course_letter: 1,
        course_number: 2,
        course_name: 3,
        attempted_credit: 6,
        earned_credit: 7,
        percentage_grade: 8,
    },
    courseUnfinishedInfoSelector: {
        course_letter: 2,
        course_number: 3,
        course_name: 4,
    }
}

const TONUMBER = {
    courseFinished: [6, 7, 8],
    courseUnfinished: [3],
}

class Block {
    constructor(arr){
        this.arr = arr;
    };
    // Given data and lookUpTable, produce an object where keys are the same 
    // as the one in the lookUpTable but the values are the corresdence from the data
    lookUpAndMerge(lookUpTable, filterArr, dataGroup) {
        let resultObj = {};
        for (let variable in lookUpTable) {
            resultObj[variable] = dataGroup[lookUpTable[variable]].trim();
            if (filterArr != undefined) {
                if (filterArr.includes(lookUpTable[variable])) {
                    console.log(resultObj);
                    if (!isNaN(+resultObj[variable])) resultObj[variable] = +resultObj[variable];
                }
            }
        }
        return resultObj;
    };
    InfoGenerator(Str) {
        const Groups = Str.match(this.REGEX);
        return this.lookUpAndMerge(this.InfoSelector, this.toNumber, Groups);
    };

}

class termBlock extends Block{
    constructor(arr){
        super(arr);
        this.REGEX = REGEXES.term;
        this.InfoSelector = SELECTORS.termInfoSelector;
    }
}

class courseFinishedBlock extends Block{
    constructor(arr){
        super(arr);
        this.REGEX = REGEXES.course_finished;
        this.InfoSelector = SELECTORS.courseFinishedInfoSelector;
        this.toNumber = TONUMBER.courseFinished;
    }
}

class courseUnfinishedBlock extends Block{
    constructor(arr){
        super(arr);
        this.REGEX = REGEXES.course_unfinished;
        this.InfoSelector = SELECTORS.courseUnfinishedInfoSelector;
        this.toNumber = TONUMBER.courseUnfinished;
    }
}

function combineBlocks(coursesBlock, ...otherBlocks) {
    let coursesArr = [];
    for (let i = 0; i < coursesBlock.length; i++) {
        const coursesFinished = new courseFinishedBlock(coursesBlock[i].match(REGEXES.courses_finished_global));
        const coursesUnfinished = new courseUnfinishedBlock(coursesBlock[i].match(REGEXES.courses_unfinish_global));
        if (coursesFinished.arr != null) {
            for (let j = 0; j < coursesFinished.arr.length; j++) {
                let eachCourse = coursesFinished.InfoGenerator(coursesFinished.arr[j]);
                for (let m = 0; m < otherBlocks.length; m++) {
                   
                    eachCourse = Object.assign(otherBlocks[m].InfoGenerator(otherBlocks[m].arr[i]),eachCourse);
                }
                coursesArr.push(eachCourse);
            }
        }
        if (coursesUnfinished.arr != null) {
            for (let j = 0; j < coursesUnfinished.arr.length; j++) {
                let eachCourse = coursesUnfinished.InfoGenerator(coursesUnfinished.arr[j]);
                for (let m = 0; m < otherBlocks.length; m++) {
                    eachCourse = Object.assign(otherBlocks[m].InfoGenerator(otherBlocks[m].arr[i]),eachCourse);
                }
                coursesArr.push(eachCourse);
            }
        }
       
    }
    return coursesArr;
}

exports.txt_to_JSON = async function txt_to_JSON(txt) {
    try {
        let result_courses_block_global = txt.match(REGEXES.courses_block_global);
        let result_terms = new termBlock(txt.match(REGEXES.terms));
        let courses_arr = combineBlocks(result_courses_block_global, result_terms);
        return courses_arr;
    } catch(err) {
        throw new Error(err);
    }
}


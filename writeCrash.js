// const fs = require('fs');
const fsPromises = require('fs/promises');
const { format } = require('date-fns');

const writeCrash = async (err) => {

    const now = format(new Date(), 'MM_dd_yyyy--H_mm_ss');
    const filename = `./logs/crashLog ${now}.txt`;
    // fs.writeFile(filename, `${err}`, e => console.log('writeFile finished:', e));

    try {
        await fsPromises.mkdir('./logs', { recursive: true });
        let rtnObj = await fsPromises.writeFile(filename, `${err}`); // rtnObj undefined when success
        console.log('writeCrash success:', filename); 
    }
    catch (error) {
        console.log('-----------writeCrash failed:\n-----------', error);
        throw new Error('writeCrash failed', { cause: error });
    }


};

module.exports = { writeCrash };


// const fsPromises = require('fs/promises');

// const writeLog = async (contentFile) => {
//     console.log('writeLog start');

//     const filename = './logs+++++++/log.txt';
//     try {
//         const rtnObj = await fsPromises.writeFile(filename, contentFile)
//         console.log('writeFile finished:', rtnObj); // undefined if success
//     }
//     catch (error) {
//         console.log('Error, cannot write file:', error);
//         throw new Error(
//             { title: "error from writeFile", errObj: error }
//         );
//     }
// };

// module.exports = { writeLog };



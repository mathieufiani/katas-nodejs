import * as fs from "fs";

// this function allow to read dynamically
let stream = fs.createReadStream('./input.json', 'utf8');

// we initialize a buffer to store each json object
let buf = '';
let isSaving = false

// id from the command line
let id = process.argv[2]


/**
 * This function check for a given id correspond to the id of an object.
 * if true, the stream is terminated and the name of the object is logged
 * @param idToFind id from the command line
 * @param obj object to check if same id
 */
const getNameFromId = (idToFind, obj) => {
    if(parseInt(idToFind) === obj.id) {
        console.log(obj.name);
        stream.close();
    }
}

/**
 * starting the read stream
 */
stream.on('data',  (chunk)=>{
    const chunkArray = chunk.split(''); // converting the Buffer to array
    chunkArray.map((bit)=>{
        if(bit === '{') {
            isSaving = !isSaving;
        }
        if (isSaving) {
            buf += bit;
        }
        if(bit === '}') { // meaning that the json object is full
            isSaving = false;
            const objBuf = JSON.parse(buf)
            getNameFromId(id, objBuf);
            // initializing the buf for the next object
            buf = '';
        }
    })
})
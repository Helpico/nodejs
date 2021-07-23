// Unique words from frequency 5000 vocabulary
// The length of final chunked array is 44 with 100 words in each subarray, except the last.
// This means that the last subaray is results[43] and the first is results[0]

class ChunksService {
	constructor (vocInputsObj) {
		this.words = vocInputsObj.words;
	}
	
	chunkData(chunkSize, chunkIndex) {
		try {
			const englishWords= this.words.map(obj => obj['word_en']);
			const uniqueWords = [...new Set(englishWords)];
			var index = 0;
			var arrayLength = uniqueWords.length;
			var tempArray = [];
			var myChunk;
				
			for (index = 0; index < arrayLength; index += chunkSize) {
				myChunk = uniqueWords.slice(index, index+chunkSize);
				// Do something if you want with the group
				tempArray.push(myChunk);	
			}
			console.log(JSON.stringify(tempArray[chunkIndex]));
			return tempArray[chunkIndex];	
			
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = ChunksService;


/*
const STATIC = require('./Static.JS'); // Put this at the top
var chunksService = new ChunksService(STATIC.vocInputs);
const chunk = chunksService.chunkData(4, 0);
console.log(chunk); 
*/


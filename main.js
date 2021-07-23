const STATIC = require('./Static.JS');
const ChunksService = require('./ChunksService.js');
const FetchService = require('./FetchService.js');
const ProcessService = require('./ProcessService.js')
const InsertService = require('./InsertService.js');

const chunksService = new ChunksService(STATIC.vocInputs); 
const fetchService = new FetchService(STATIC.fetchConfig);
const processService = new ProcessService(STATIC.vocInputs);
const insertService = new InsertService(STATIC.insertConfig);


(async () => {
	
// 1. number of displayed words, 2. array index of a chunk
const chunkWords = chunksService.chunkData(200, 0); 

	try {
		let i = 0;
 		for (const wordToFetch of chunkWords) { // first hundred of unique frequency words
 			console.time('getData time');
 			console.log('First Indicator ', ++i);
 			console.log(wordToFetch);
		
			let fetched = await fetchService.fetchData(wordToFetch);
			let processed = await processService.processData(fetched);
			let inserted = await insertService.insertData(processed);
		
			console.log('Last Indicator ', i);
			console.timeEnd('getData time');	
		}
	} catch (error) {
		console.error(error);
	}
})();



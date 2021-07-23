// ATTACH MODULES
const fs = require('fs');
const path = require('path');

class ProcessService {
	constructor(vocInputsObj) {
		this.words = vocInputsObj.words;
	}
	
	async processData(fetchedData) {
		
	    try {
	    	const data1 = await fnRewriteChunkToMakeSureAllKyesAreInPlace.call(fetchedData);
	    	const data0 = await fnShortenAndLowCasePartsOfSpeech.call(this.words);
	        const data2 = await fnFillInEmptyHowCommonsFields.call(data1);
	        const data3 = await fnBringAllPartAndHowCommonValuesToLowCase.call(data2);
	        const data4 = await fnCopyIndexesFromWordsArrayIntoGglArray.call(data3, data0);
			const data5 = await fnAgainRewriteVocsToMakeSureAllKyesAreInPlace.call(data4);
			const data6 = await fnConvertWordObjectsInArraysWithValues.call(data5);
			
	        return data6;
	        
	    } catch (error) {
	        console.error(error);
	    }	
	}
}

module.exports = ProcessService;




/**
* 	ALL FUNCTIONS' STORE
*/

// REWRITING PARTS_OF_SPEECH TO BE SURE THAT NO KEYS ARE ABSENT 
function fnShortenAndLowCasePartsOfSpeech() {
	
	// AND LOW CASE 'part' VALUES
	return this.map(wordObj => {
		return {
			"index":wordObj["index"], 
			"wordEn":wordObj.word_en, 
			"part":wordObj.part.toLowerCase().trim() // LOW CASE
			};
	});
}


// REWRITE GGL WORD OBJECTS TO BE SURE EACH 'KEY' PROPERTY IS NOT ABSENT
function fnRewriteChunkToMakeSureAllKyesAreInPlace(voc_chunk) {
		
		// Make the array as you wish by props and rearrange order of the properties
		return this.map(wordObj => {
			return {
				"wordEn":wordObj.wordEn,
				"wordRu":wordObj.wordRu,
				"part":wordObj.part,
				"inner":wordObj.inner,
				"synonyms":wordObj.synonyms,
				"howCommon":wordObj.howCommon,
				"dominaRu":wordObj.dominaRu
			};
		});
		
}


// FILL IN ALL EMPTY 'howCommon' VALUES WITH "Rare translation"
function fnFillInEmptyHowCommonsFields() {
	// Plug in the result of the previous function
	return this.map((obj) => {
	    if (obj.howCommon === '' || obj.howCommon === null) {
			obj.howCommon = 'Rare translation';
		}
		
		return obj;
	});
}


// LOW CASE ALL 'part' & 'howCommon' VALUES
function fnBringAllPartAndHowCommonValuesToLowCase() {
	
	return this.map(wordObj => {
		return {
			"wordEn":wordObj.wordEn.trim(),
			"wordRu":wordObj.wordRu,
			"part":wordObj.part.toLowerCase().trim(),
			"inner":wordObj.inner,
			"synonyms":wordObj.synonyms,
			"howCommon":wordObj.howCommon.toLowerCase().trim(),
			"dominaRu":wordObj.dominaRu
			};
	});

}


// ADDING 'INDEX' PROPERTY FROM FREQUENCY TABLE TO GGL ONE
function fnCopyIndexesFromWordsArrayIntoGglArray(parts) {
	
	let vocs = this; // !!!
		
	vocs.forEach(function (voc) {
    	parts.forEach(function(word) {
        	if (voc.wordEn === word.wordEn && voc.part === word.part)
        	{
            	voc.index = word.index;        
        	}
        	// if (voc.wordEn === word.wordEn && voc.part === "verb" && word.part === "auxiliary verb")
        	// {
            // 	voc.index = word.index;        
        	// }
        	if (voc.wordEn === word.wordEn && voc.part === "verb" && word.part === "auxiliary verb" || voc.wordEn === word.wordEn && voc.part === "abbreviation" && word.part === "other" || voc.wordEn === word.wordEn && voc.part === "particle" && word.part === "other" || voc.wordEn === word.wordEn && voc.part === "phrase" && word.part === "other" || voc.wordEn === word.wordEn && voc.part === "article" && word.part === "other" || voc.wordEn === word.wordEn && voc.part === "suffix" && word.part === "other" || voc.wordEn === word.wordEn && voc.part === "pronoun" && word.part === "other" || voc.wordEn === word.wordEn && voc.part === "em_ty")
            {
			   	voc.index = word.index;        
			}
            
    	});
	});
	
	return vocs;

}


// AGAIN REWRITE VOC OBJECTS TO BE SURE EACH 'KEY' PROPERTY IS NOT ABSENT
function fnAgainRewriteVocsToMakeSureAllKyesAreInPlace() { // Especially 'index' property
	// Some voc objects naturally lack index. !!! To add them later !!!
	return this.map(wordObj => {
		return {
			"sourceL":wordObj.wordEn,
			"targetL":wordObj.wordRu,
			"part":wordObj.part,
			"indexF":wordObj.index,
			"innerF":wordObj.inner,
			"synonyms":wordObj.synonyms,
			"howCommon":wordObj.howCommon,
			"domina":wordObj.dominaRu
			};
	});

};

	
// FINAL BEFORE DB-DATA-INSERT: CONVERT WORD OBJECTS INTO ARRAYS WITH THE OBJECTS' VALUES
function fnConvertWordObjectsInArraysWithValues() {
	
	let finalDataForInsert = [];	
	
	// !!! Final cleaned big array of ggl voc ready to be inserted
	this.forEach((obj) => {
		finalDataForInsert.push(Object.values(obj));	
	});
	
	return finalDataForInsert;

}	
 


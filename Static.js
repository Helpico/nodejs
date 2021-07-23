
const fs = require('fs');
const path = require('path');

class Static {
	
	
	static vocInputs = {
		words: this.readFileSync('words_with_frequency.js'),
	};
	
	/*
	static multiInputs = {
		words: this.readFileSync('multis_with_frequency.js'),
	};
	*/	
	
	// Russian: 'ru'
	// Ukrainian: 'uk'
	// Polish: 'pl'
	// Spanish: 'es'
	// Deutch: 'de'
	// French: 'fr'
	// Portuguese: 'pt'
	// Italian: 'it'
	// Roman: 'ro' 
	// Nerthelands: 'nl' 
	
	// Greek: 'el' // processing...
	
	// Check: 'cs'
	// Sweden: 'sv'
	// Hungary: 'hu'
	// Bulgaria: 'bg'
	// Denmark: 'da'
	// Finland: 'fi'
	// Slovakia: 'sk'
	// Croatia: 'hr'
	// Lithuania: 'lt'
	// Slovenia: 'sl'
	// Latvia: 'lv'
	// Estonia: 'et'
	// Serbian: 'sr'
	// Norvegian: 'no'
	// Вьетнамский: 'vi'
	// Индонезийский: 'id'
	// Узбекcкий: 'uz'
	// Таджикский 'tg'
	
	// Difficult languages:
	// Turkish: 'tr' (has parts of words seperately)
	
		
    static fetchConfig = {
    	sourceLanguage: 'en',
		targetLanguage: 'el',
	    get url() {
	    	return `https://translate.google.com/#view=home&op=translate&sl=${this.sourceLanguage}&tl=${this.targetLanguage}&text=`
		}
	}
	    
    
	static insertConfig = {
		host: 'localhost',
		user: 'root',
  		password: '',
  		database: 'languages'
	};
	
	
	static readFileSync(fileName) {
		let json = fs.readFileSync(path.join(__dirname, fileName), 'utf8');
		return JSON.parse(json);
	}
}

module.exports = Static;



/*
// READS ANY FILE ASYNCRONIOUSLY
function readFileAsync(file_path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(file_path, 'utf8', function (err, data) {
            if (err)
                reject(err);
            else
                resolve(JSON.parse(data));
        });
    });
}
*/

 
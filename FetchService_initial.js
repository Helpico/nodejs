const puppeteer = require('puppeteer');


class FetchService {
	constructor(fetchConfigObj) {
		this.url = fetchConfigObj.url;
	}
	async fetchData(wordToFetch) {
	  const browser = await puppeteer.launch();
	  const context = await browser.createIncognitoBrowserContext();
	  const page = await context.newPage();
	  const yourSelector = '.tlid-translation.translation';
	  
	  try {
	 	await page.goto(`${this.url}${wordToFetch}`, {waitUntil: 'networkidle2'});
		// await page.waitFor(2000);
		// await page.waitForSelector('.tlid-translation.translation > span'); // dominaRu
		try {
		  await page.waitForSelector(yourSelector, {timeout: 2000});
		} catch (e) {
		  if (e) {
		    throw new Error(e); // Do something if this is a timeout.
		  }
		}
			
		const html = await page.evaluate(() => {
			
			  var table = document.querySelector('.gt-baf-table');
			  var table_cells = table.getElementsByTagName('td');
			  var cells = Array.from(table_cells); 
			  
			  // Get rid of useless text
			  var patt = new RegExp(['Frequency', 'Indicates how often a translation appears in public documents'].join('|'), 'gi');
			  for (var cell of cells) { cell.innerHTML =  cell.innerHTML.replace(patt, ''); }
			  
			  // Define variables
			  var partName = "", wordRu = "", synonyms = "", howCommon = [], inner = 1;
			  
			  // Do the content scraping
			  var tr = table.querySelectorAll('tr');
			  var wordEn = document.querySelector('#source').value.trim();
			  var dominaRu = document.querySelector('.tlid-translation.translation > span').innerText;
			  // document.querySelector('#source').value = ''; // empty textarea for the typing bellow
			  
			  // Store loop data
			  let outcome = [];
			  for (var i = 0; i < tr.length; i++) {
			  	
			    var row = tr[i].querySelectorAll('td');
			    if (row.length === 1) {
			    	partName = row[0].innerText;
				} else if (row.length > 1) {
					for (var a = 0; a < row.length; a++) {
			        	wordRu = row[0].innerText.trim();
			        	synonyms = row[1].innerText.split(', ').toString();
			        	howCommon = row[2].querySelector('div').title;
			      	}
			    outcome.push({dominaRu,part:partName.toLowerCase().trim(),wordEn,wordRu,synonyms,howCommon,inner});
			    inner++;	

			    }		    
			  }
			  return outcome;
		});
		return html;
	    
	  } catch (err) {
			console.log('ERR ', err.message);
	  } finally {
			await browser.close();	
	  } 	
	}	

	
};


module.exports = FetchService;

	



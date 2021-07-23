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
		  await page.waitForSelector(yourSelector, {timeout: 1000});
		} catch (e) {
		  if (e) {
		    throw new Error(e); // Do something if this is a timeout.
		  }
		}
			
		const html = await page.evaluate(() => {
			
			   var arrContainer = [];
  var wordEn = document.querySelector('#source').value.trim();
  var dominaRu = document.querySelector('.tlid-translation.translation > span') ? document.querySelector('.tlid-translation.translation > span').innerText : "em_ty";
var tbl = document.querySelector('.gt-baf-table');
if (!tbl) {
  try {

    if (tbl === null) throw {"dominaRu":dominaRu, "part":"em_ty", "wordEn":wordEn, "wordRu":"em_ty", "synonyms":"em_ty", "howCommon":"em_ty", "inner":0}; 

    } catch (err) {
      arrContainer.push(err);
    }

  } else {

              var table_cells = tbl.getElementsByTagName('td');
			  var cells = Array.from(table_cells); 
			  
			  // Get rid of useless text
			  var patt = new RegExp(['Frequency', 'Indicates how often a translation appears in public documents'].join('|'), 'gi');
			  for (var cell of cells) { cell.innerHTML =  cell.innerHTML.replace(patt, ''); }
			  
			  // Define variables
			  var partName = "", synonyms = "", howCommon = [], inner = 1;
			  
			  // Do the content scraping
			  var tr = tbl.querySelectorAll('tr');
			  // var wordEn = document.querySelector('#source').value.trim();
			  // var dominaRu = document.querySelector('.tlid-translation.translation > span').innerText;
			  // document.querySelector('#source').value = ''; // empty textarea for the typing bellow
			  
			  // Store loop data
			  
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
			    arrContainer.push({dominaRu,part:partName.toLowerCase().trim(),wordEn,wordRu,synonyms,howCommon,inner});
			    inner++;	

			    }		    
			  }
    
  			}

			return arrContainer;
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

	



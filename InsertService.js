const mysql = require('mysql');
// Два входящих параметра: 1. 'configObj' в конструкторе 2. 'insertion' в методе insertData (это данные, которые заливаем) 
  

class InsertService {
	constructor(insertObjFromStatic) {
		this.configObj = insertObjFromStatic;
	}
	
	async insertData(insertionData) {
		try {
			// Open connection & set entry parameters
			const connection = mysql.createConnection(this.configObj);	
		
			// Connect to the MySQL server
			connection.connect(function(err) {
			  if (err) {
			    return console.error('error: ' + err.message);
			  }


			// CREATE TABLE IF NOT EXISTS
			let sql_create = `create table if not exists el (
								id int primary key auto_increment,
								sourceL varchar(200) not null,
								targetL varchar(200),
								part varchar(100),
								indexF int(10),
								innerF int(5),
								synonyms varchar(600),
								howCommon varchar(100),
								domina varchar(200)
							)`;


			connection.query(sql_create, function (err, result) {
			    if (err) throw err;
				    console.log(`Table el is created!`);
			});



	    // INSERT INTO TABLE
		const sql = `INSERT INTO el (sourceL, targetL, part, indexF, innerF, synonyms, howCommon, domina) VALUES ?`;
			
			
			/**
			* This is the data format for multiple rows to insert
			
			  const insertionData = [
			  	["people","mensen","noun",62,1,"people,men,persons,folk","common translation","mensen"],
			  	["people","personen","noun",62,2,"persons,people","common translation","mensen"],
			  	["people","volk","noun",62,3,"people,nation,folk,commons,demos","uncommontranslation","mensen"]
			  ];
			   
			*/
			 
						  
			connection.query(sql, [ insertionData ], function (err, result) {
			    if (err) throw err;
			    console.log("Number of records inserted: " + result.affectedRows);
			    
			});
			
					
			// END CONNECTION
			connection.end(function(err) {
			    if (err) {
			      console.log(err.message);
			    }
			    console.log("Connection ended");
			  });
			});	
		} catch (error) {
			
			throw new Error(error);
			
		} 
		
	}
	
	
}


module.exports = InsertService;



/*
// RU_EXTRA
create table if not exists ru_extra (

	id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    sourceL VARCHAR(128) NOT NULL,
    targetL VARCHAR(128),
    part VARCHAR(100),
    indexF INT DEFAULT 0,
    innerF TINYINT DEFAULT 0,
    synonyms VARCHAR(256),
    howCommon VARCHAR(64),
    domina VARCHAR(128)
    
);

*/

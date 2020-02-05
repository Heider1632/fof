var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
var app = express();


app.set('view engine', 'pug');

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/', async function(req, res) {
	//variables para recoger datos
	let recongized = []
	let runTask = []

	//llamo a matriz 
	let { matriz } = require("./data/matriz");

	// 
	let text = req.body.text;
	//
	text.split(" ").forEach(function(word) {

        if(matriz[word] != undefined){

            recongized.push(matriz[word]);
                
        } 
            
    });
	// compara y ordera los protocolos 
    function compareValues(key, order='asc') {
	  return function(a, b) {
	    if(!a.hasOwnProperty(key) || 
	       !b.hasOwnProperty(key)) {
	  	  return 0; 
	    }
	    
	    const varA = (typeof a[key] === 'string') ? 
	      a[key].toUpperCase() : a[key];
	    const varB = (typeof b[key] === 'string') ? 
	      b[key].toUpperCase() : b[key];
	      
	    let comparison = 0;
	    if (varA > varB) {
	      comparison = 1;
	    } else if (varA < varB) {
	      comparison = -1;
	    }
	    return (
	      (order == 'desc') ? 
	      (comparison * -1) : comparison
	    );
	  };
	}
   	

   	const ListOfProcess = recongized.sort(compareValues('total', 'desc'));

   	ListOfProcess.forEach(task => {
   		
   		let current_datetime = new Date()

   		console.log(current_datetime);

   		runTask.push({ task: task.algorith, time: current_datetime.getSeconds() + "." + current_datetime.getUTCMilliseconds() });
   		
   	})

   	console.log(runTask);

   	/*for (const task of runTask){
   		await task()
   	}*/

    res.render('result', { runTask });

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
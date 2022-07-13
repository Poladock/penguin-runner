// Entry Point of the API Server

const express = require('express');

/* Creates an Express application.
The express() function is a top-level
function exported by the express module.
*/
const app = express();
const Pool = require('pg').Pool;

const pool = new Pool({
	user: 'root',
	host: 'penguin.cthj9ikk8a7m.ap-northeast-1.rds.amazonaws.com',
	database: 'lukpenguin',
	password: 'pp025285780',
	dialect: 'postgres',
	port: 5432
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/* To handle the HTTP Methods Body Parser
is used, Generally used to extract the
entire body portion of an incoming
request stream and exposes it on req.body
*/
const bodyParser = require('body-parser');
app.use(body())
const { response } = require('express');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


pool.connect((err, client, release) => {
	if (err) {
		return console.error(
			'Error acquiring client', err.stack)
	}
	client.query('SELECT NOW()', (err, result) => {
		release()
		if (err) {
			return console.error(
				'Error executing query', err.stack)
		}
		console.log("Connected to Database !")
	})
})

app.get('/question', (req, res, next) => {
	console.log("TEST DATA :");
	pool.query('Select * from box')
		.then(testData => {
			console.log(testData);
			res.send(testData.rows);
		})
})

app.post('/question',function(req,res){
	data={
		question:req.query.fname
	}
})

// Require the Routes API
// Create a Server and run it on the port 3000
const server = app.listen(3000, function () {
	let hgost = server.address().address
	let port = server.address().port
	// Starting the Server at the port 3000
})

//27041400

// app.get('/healthcheck', (req, res) => {
	// res.status(200).send('Ok');
//   });

// pp

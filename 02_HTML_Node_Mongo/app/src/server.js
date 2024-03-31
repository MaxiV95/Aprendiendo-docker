let express = require("express");
let path = require("path");
let fs = require("fs");
let MongoClient = require("mongodb").MongoClient;
let bodyParser = require("body-parser");
let app = express();
require('dotenv').config();

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(bodyParser.json());

app.get("/", function (req, res) {
	console.log("buscando index.html");
	res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/profile-picture", function (req, res) {
	console.log("buscando picture");
	let img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
	res.writeHead(200, { "Content-Type": "image/jpg" });
	res.end(img, "binary");
});

// utilizar 'mongoUrlLocal' al iniciar la aplicación localmente
const mongoUrlLocal = "mongodb://admin:password@localhost:27017";

// utilizar 'mongoUrlDocker' al iniciar la aplicación como contenedor acoplable
const mongoUrlDocker = "mongodb://admin:password@mongodb";

const dbHost = process.env.DB_HOST === 'localhost' ? mongoUrlLocal : mongoUrlDocker;
console.log('DB Host:', dbHost);


/* pasa estas opciones a la solicitud de conexión del cliente mongo para evitar una advertencia
 * de desaprobación para el motor de monitoreo y descubrimiento de servidores actual */
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// "user-account" en demostración con docker. "my-db" en demostración con docker-compose
let databaseName = "my-db";

app.post("/update-profile", function (req, res) {
	let userObj = req.body;

	MongoClient.connect(
		dbHost,
		mongoClientOptions,
		function (err, client) {
			if (err) throw err;

			let db = client.db(databaseName);
			userObj["userid"] = 1;

			let myquery = { userid: 1 };
			let newvalues = { $set: userObj };

			db.collection("users").updateOne(
				myquery,
				newvalues,
				{ upsert: true },
				function (err, res) {
					if (err) throw err;
					client.close();
				}
			);
		}
	);
	// Send response
	res.send(userObj);
});

app.get("/get-profile", function (req, res) {
	let response = {};
	// Connect to the db
	// Function to wait for MongoDB to be ready
	function waitForMongoDB() {
		MongoClient.connect(
			dbHost,
			mongoClientOptions,
			function (err, client) {
				if (err) {
					console.log("waiting for mongodb");
					setTimeout(waitForMongoDB, 1000); // Retry after 1 second if MongoDB is not ready yet
				} else {
					let db = client.db(databaseName);
					let myquery = { userid: 1 };

					db.collection("users").findOne(myquery, function (err, result) {
						if (err) throw err;
						response = result;
						client.close();
						// Send response
						res.send(response ? response : {});
					});
				}
			}
		);
	}

	// Call the function to wait for MongoDB
	waitForMongoDB();
});

app.listen(3000, function () {
	console.log("app listening on port 3000!");
});

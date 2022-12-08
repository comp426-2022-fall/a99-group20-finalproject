#!usr/bin/env node

// importing needed items
import minimist from "minimist"
import express from 'express'
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url';
import Database from "better-sqlite3"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// create app
const args = minimist(process.argv.slice(2))
const port = args.port || 5000
const app = express()
app.use(express.urlencoded({extended: true}));

// create database
const db = new Database('nutrition.db');
db.pragma('journal_mode = WAL')

console.log("hi")
// create tables
const sqlInit = `CREATE TABLE users ( id INTEGER PRIMARY KEY AUTOINCREMENT, user VARCHAR, pass VARCHAR );`
try{
    db.exec(sqlInit);
} catch(error){  
}
const sqlInit2 = `CREATE TABLE data ( id INTEGER PRIMARY KEY AUTOINCREMENT, user VARCHAR, calories INTEGER, protein INTEGER, carbs INTEGER, fats INTEGER);`
try{
    db.exec(sqlInit2);
}
catch(error){  
}

const sqlInit3 = `CREATE TABLE logs ( id INTEGER PRIMARY KEY AUTOINCREMENT, user VARCHAR, message VARCHAR, time VARCHAR);`
try{
    db.exec(sqlInit3);
} catch(error){  
}



// root endpoint
app.get('/', (req, res) => {
    // this should redirect to a html homepage
    res.sendFile(__dirname + '/views/home.html');
});


// login endpoint
app.get('/app/login', (req, res) => {
    // this should redirect to a html homepage
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/app/accmade', (req,res) => {
	//this should redirect to an html homepage
	res.sendFile(_direname + '/views/new-acc-made.html');
});


app.post('/login', (req, res) => {
    const user = req.body.username;
    const pass = req.body.password;

    const stmt = db.prepare(`SELECT * FROM users WHERE user='${user}' and pass='${pass}';`);
    let row = stmt.get();

    if (row === undefined) {
        req.app.set('user', user);
        req.app.set('pass', pass);
        // redirect to bad login page. 
    } else {
        req.app.set('user', user);
        req.app.set('pass', pass);
        res.sendFile(__dirname + '/views/main.html')
    }
})


// create account
app.post('/app/createacc', (req,res) => {
    const user = req.body.username;
    const pass = req.body.password;

    const stmt = `INSERT INTO users (user, pass) VALUES ('${user}', '${pass}');`;
    db.exec(stmt)

	res.sendFile(__dirname + '/views/main.html');
});

// delete account endpoint
app.post('/app/app/delete_acc', (req, res) => {
    const user = req.body.username;
    const pass = req.body.password;
    const stmt = `DELETE FROM users WHERE user='${user}' and pass='${pass}';`
    db.exec(stmt)

    res.sendFile(__dirname + '/views/delete_acc.html');
});

// logs meal
app.post('/log_meal', (req, res) => {
    const user = req.app.get('user');

    const calories = req.body.calories
    const protein = req.body.protein
    const carbs = req.body.carbs
    const fats = req.body.fats

    const stmt = `INSERT INTO data (user, calories, protein, carbs, fats) VALUES ('${user}', '${calories}', '${protein}', '${carbs}', '${fats}');`;
    db.exec(stmt)

    res.sendFile(__dirname + '/views/success_log.html')

})




// access user database
app.get('/app/users_db', (req, res) => {
    const stmt = db.prepare(`SELECT * FROM users;`);
    let all = stmt.all();

    if(all === undefined) {
        res.send('nothing in db');
    } else {
        res.send(all);
    }
});

// page not found endpoint
app.get('*', (req, res) => {
    res.send("404 NOT FOUND")
})


app.listen(port, () => {
	console.log("Server listening on port " + port)
})

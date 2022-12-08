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

// create tables
const sqlInit = `CREATE TABLE users ( id INTEGER PRIMARY KEY AUTOINCREMENT, user VARCHAR, pass VARCHAR );`
const sqlInit2 = `CREATE TABLE data ( id INTEGER PRIMARY KEY AUTOINCREMENT, calories INTEGER, protein INTEGER, carbs INTEGER, fats INTEGER;`
const sqlInit3 = `CREATE TABLE logs ( id INTEGER PRIMARY KEY AUTOINCREMENT, user VARCHAR, message VARCHAR, time VARCHAR);`



// root endpoint
app.get('/app/', (req, res) => {
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

app.post('/app/createacc', (req,res) => {
    const user = req.body.username;
    const pass = req.body.password;
	//const stmt = `INSERT INTO users (user, pass) VALUES ('${user}', '${pass}');`;
    //userDB.exec(stmt)
	res.sendFile(__dirname + '/views/new-acc-made.html')
	const stmt = `INSERT INTO users (user, pass) VALUES ('${user}', '${pass}');`;
    db.exec(stmt);
    res.sendFile(__dirname + '/views/new-acc-made.html');
    const stmt = `INSERT INTO users (user, pass) VALUES ('${user}', '${pass}');`;
    db.exec(stmt)

    
	res.sendFile(__dirname + '/views/new-acc-made.html');
});

// delete account endpoint
app.get('/app/delete_acc', (req, res) => {
    // this should redirect to a html homepage
    res.sendFile(__dirname + '/views/delete_acc.html');
});

app.get('/app/users_db', (req, res) => {
    const stmt = userDB.prepare(`SELECT * FROM users;`);
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

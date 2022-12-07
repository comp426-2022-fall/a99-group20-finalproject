#!usr/bin/env node

// importing needed items
import minimist from "minimist"
import express from 'express'
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = minimist(process.argv.slice(2))
const port = args.port || 5000
const app = express()

import {nutritionDB} from './databases/nutritionDatabase.js';
import {userDB} from './databases/userDatabase.js';
import {interactionDB} from './databases/interactionDatabase.js';

app.use(express.urlencoded({extended: true}));

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

// create account endpoint
app.get('/app/create_acc', (req, res) => {
    // this should redirect to a html homepage
    res.sendFile(__dirname + '/views/create_acc.html');
});

// delete account endpoint
app.get('/app/delete_acc', (req, res) => {
    // this should redirect to a html homepage
    res.sendFile(__dirname + '/views/delete_acc.html');
});

app.post("/app/new/user", (req,res,next) => {

	const stat = userDB.prepare('INSERT INTO userInfo(user, password) VALUES (?,?)').run(req.body.user, md5(req.body.password));
	res.status(200).json({"message": "1 record created: ID (201)"});

});
// page not found endpoint
app.get('*', (req, res) => {
    res.send("404 NOT FOUND")
})


app.listen(port, () => {
	console.log("Server listening on port " + port)
})

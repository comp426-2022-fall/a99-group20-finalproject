#!usr/bin/env node

// importing needed items
import minimist from "minimist"
import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url';
import Database from "better-sqlite3"
import ejs from "ejs"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// create app
const args = minimist(process.argv.slice(2))
const port = args.port || 5000
const app = express()
app.use(express.urlencoded({extended: true}));
//adding in the background image
app.use(express.static(__dirname+'/views'));

app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

// create database
const db = new Database('nutrition.db');
db.pragma('journal_mode = WAL')


// create tables
const sqlInit = `CREATE TABLE users ( id INTEGER PRIMARY KEY AUTOINCREMENT, user VARCHAR, pass VARCHAR );`
try{
    db.exec(sqlInit);
} catch(error){  
}
const sqlInit2 = `CREATE TABLE data ( id INTEGER PRIMARY KEY AUTOINCREMENT, user VARCHAR, date VARCHAR, description VARCHAR, calories INTEGER, protein INTEGER, carbs INTEGER, fats INTEGER);`
try{
    db.exec(sqlInit2);
}
catch(error){  
}

const sqlInit3 = `CREATE TABLE interactions ( id INTEGER PRIMARY KEY AUTOINCREMENT, user VARCHAR, action VARCHAR, time VARCHAR);`
try{
    db.exec(sqlInit3);
} catch(error){  
}



// root endpoint
app.get('/app', (req, res) => {
    // this should redirect to a html homepage
    res.sendFile(__dirname + '/views/home.html');
});


// return home
app.post('/app/home', (req, res) => {
    // this should redirect to a html homepage
    res.sendFile(__dirname + '/views/main.html');
});
app.post('/app/app/home', (req, res) => {
    // this should redirect to a html homepage
    res.sendFile(__dirname + '/views/main.html');
});


// return home
app.post('/app', (req, res) => {
    // this should redirect to a html homepage
    res.sendFile(__dirname + '/views/home.html');
});


app.post('/login', (req, res) => {
    const user = req.body.username;
    const pass = req.body.password;
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed)

    //interactions db
    const stmt2 = `INSERT INTO interactions (user, action, time) VALUES ('${user}', 'attempted to login', '${today.toISOString()}');`;
    db.exec(stmt2)

    const stmt = db.prepare(`SELECT * FROM users WHERE user='${user}' and pass='${pass}';`);
    let row = stmt.get();

    if (row === undefined) {
        req.app.set('user', user);
        req.app.set('pass', pass);
        //interactions db
        const stmt2 = `INSERT INTO interactions (user, action, time) VALUES ('${user}', 'failed to login', '${today.toISOString()}');`;
        db.exec(stmt2)

        res.sendFile(__dirname + '/views/bad_login.html')
        // redirect to bad login page. 
    } else {
        req.app.set('user', user);
        req.app.set('pass', pass);
        //interactions db
        const stmt2 = `INSERT INTO interactions (user, action, time) VALUES ('${user}', 'successfully logged in', '${today.toISOString()}');`;
        db.exec(stmt2)

        res.sendFile(__dirname + '/views/main.html')
    }
})


// create account
app.post('/app/createacc', (req,res) => {
    const user = req.body.username;
    const pass = req.body.password;
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed)

    //interactions db
    const stmt2 = `INSERT INTO interactions (user, action, time) VALUES ('${user}', 'created an account', '${today.toISOString()}');`;
    db.exec(stmt2)

    const stmt = `INSERT INTO users (user, pass) VALUES ('${user}', '${pass}');`;
    db.exec(stmt)

    req.app.set('user', user);
    req.app.set('pass', pass);

	res.sendFile(__dirname + '/views/main.html');
});

// delete account endpoint
app.post('/app/delete_acc', (req, res) => {
    const user = req.app.get('user')
    //const user = req.body.username;
    //const pass = req.body.password;
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed)

    //interactions db
    const stmt2 = `INSERT INTO interactions (user, action, time) VALUES ('${user}', 'deleted account', '${today.toISOString()}');`;
    db.exec(stmt2)

    //const stmt = `DELETE FROM users WHERE user='${user}' and pass='${pass}';`
    const stmt = `DELETE FROM users WHERE user='${user}';`
    db.exec(stmt)

    res.sendFile(__dirname + '/views/delete_acc.html');
});
// i really have no idea why it's doing this, but this is a temporary fix. 
app.post('/app/app/app/delete_acc', (req, res) => {
    const user = req.app.get('user')
    //const user = req.body.username;
    //const pass = req.body.password;
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed)

    //interactions db
    const stmt2 = `INSERT INTO interactions (user, action, time) VALUES ('${user}', 'deleted account', '${today.toISOString()}');`;
    db.exec(stmt2)

    //const stmt = `DELETE FROM users WHERE user='${user}' and pass='${pass}';`
    const stmt = `DELETE FROM users WHERE user='${user}';`
    db.exec(stmt)

    res.sendFile(__dirname + '/views/delete_acc.html');
});
app.post('/app/app/delete_acc', (req, res) => {
    const user = req.app.get('user')
    //const user = req.body.username;
    //const pass = req.body.password;
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed)

    //interactions db
    const stmt2 = `INSERT INTO interactions (user, action, time) VALUES ('${user}', 'deleted account', '${today.toISOString()}');`;
    db.exec(stmt2)

    //const stmt = `DELETE FROM users WHERE user='${user}' and pass='${pass}';`
    const stmt = `DELETE FROM users WHERE user='${user}';`
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
    const description = req.body.description

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed)

    //interactions db
    const stmt2 = `INSERT INTO interactions (user, action, time) VALUES ('${user}', 'logged a meal', '${today.toISOString()}');`;
    db.exec(stmt2)

    const stmt = `INSERT INTO data (user, date, description, calories, protein, carbs, fats) VALUES ('${user}','${today}','${description}', '${calories}', '${protein}', '${carbs}', '${fats}');`;
    db.exec(stmt)

    res.sendFile(__dirname + '/views/success_log.html')

})

app.post('/app/history', (req, res) => {
    
    const user = req.app.get('user')
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed)

    //interactions db
    const stmt2 = `INSERT INTO interactions (user, action, time) VALUES ('${user}', 'accessed their history', '${today.toISOString()}');`;
    db.exec(stmt2)

    const stmt = db.prepare(`SELECT * FROM data WHERE user = '${req.app.get('user')}';`);
    let all_data = stmt.all();
    res.render('history.html', {data: all_data})
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

// access log database
app.get('/app/logs_db', (req, res) => {
    const stmt = db.prepare(`SELECT * FROM data;`);
    let all = stmt.all();

    if(all === undefined) {
        res.send('nothing in db');
    } else {
        res.send(all);
    }
});

// access log database
app.get('/app/interactions_db', (req, res) => {
    const stmt = db.prepare(`SELECT * FROM interactions;`);
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

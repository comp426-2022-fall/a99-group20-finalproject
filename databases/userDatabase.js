import {database} from 'better-sqlite3';

//create database connection
const userDB = new Database('user.db');
userDB.pragma('journal_mode = WAL');

const stmt = userDB.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='userInfo';`);

let row = stmt.get();
if (row === undefined) {
	console.log('User database appears to be empty. Creating User database');

	const = sqlInit = `
	CREATE Table userInfo (
		id INTEGER PRIMARY KEY, username TEXT, password TEXT);
		INSERT INTO userInfo (username, password) VALUES (?, ?)
		`;
	userDB.exec(sqlInit);
	console.log('UserInfo database has been initialized with a new table and two entries containing a username and password.');
} else {
	console.log('User Database exists.');
}

module.exports = userDB;

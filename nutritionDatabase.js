import {database} from 'better-sqlite3';

//create database connection
const db = new Database('nutrition.db');
db.pragma('journal_mode = WAL');

//check if nutrition database exists


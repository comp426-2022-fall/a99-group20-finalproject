import {database} from 'better-sqlite3';

//create database connection
const db = new Database('user.db');
db.pragma('journal_mode = WAL');
